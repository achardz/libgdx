<template>
  <v-layout>
    <v-flex class="text-center">
      <v-row align-content="stretch">
        <v-btn @click="additem">add</v-btn>
      </v-row>
      <v-row align-content="stretch">
        <vue2Dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue2Dropzone>
        <v-col v-if="showadd">
          <div id="app" name="myFile" v-cloak @drop.prevent="addFile" @dragover.prevent>
            <v-img v-if="test" :src="test" width="200px" class="icon-plus"></v-img>
            <span v-if="showicon" ref="iconupload" class="icon-plus">
              <v-icon class="upload-icon" right>mdi-file-image-outline</v-icon>
            </span>
            <h2>Files to Upload (Drag them over)</h2>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-text-field v-model="newitem.item_name" label="Name" required></v-text-field>
              <v-text-field v-model="newitem.item_pic" label="PIC URL" required></v-text-field>
              <v-text-field v-model="newitem.item_description" label="item_description" required></v-text-field>
            </v-form>
          </div>
        </v-col>
        <v-col v-else>
          <div id="app" v-cloak @drop.prevent="addFile" @dragover.prevent>
            <v-img v-if="test" :src="test" width="200px" class="icon-plus"></v-img>
          </div>
        </v-col>
        <v-col>
          <v-sheet id="scrolling-techniques-6" class="overflow-y-auto" max-height="800">
            <v-row align-content="stretch">
              <template>
                <v-col v-for="(item,i) in Items" :key="i">
                  <v-card class="d-inline-block mx-auto" @click="editdata(item)">
                    <v-container>
                      <v-row justify="space-between">
                        <v-col cols="auto">
                          <v-img height="200" width="200" :src="`${item.item_pic}`" />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import { Drag, Drop, DropList } from "vue-easy-dnd";

export default {
  name: "create-item",
  components: {
    Drag,
    DropList,
    Drop,
  },
  data() {
    return {
      Items: [],
      newitem: {
        item_name: "",
        item_pic: "",
        item_item_description: "",
      },
      files: [],
      loadingDataBoxList: false,
      showicon: true,
      showadd: true,
      test: "",
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" },
      },
    };
  },
  mounted() {
    this.loaditems();
  },
  computed: {
    uploadDisabled() {
      return this.files.length === 0;
    },
  },
  methods: {
    additem() {
      this.showadd = true
      this.test = ""
      this.newitem = {}
    },
    loaditems() {
      const vm = this;
      vm.loadingDataBoxList = true;
      vm.$axios
        .$get("/create-reward/getall")
        .then((res) => {
          console.log(res);
          this.Items = res.data.product;
        })
        .catch((e) => {
          if (e.response) {
            vm.showAlert({
              title: "ผิดพลาด!",
              text: e.response.data.data
                ? e.response.data.data.message
                : "ระบบขัดข้อง",
              type: "error",
              time: 5,
              autoClose: true,
              show: true,
            });
          }
        })
        .finally(() => {
          vm.loadingDataBoxList = false;
        });
    },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;

      //console.log(e.dataTransfer);
      //console.log(e.dataTransfer.files);
      if (!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      [...droppedFiles].forEach((f) => {
        let formData = new FormData();
        formData.append("file", f);
        const vm = this;
        vm.$axios({
          method: "post",
          url: "/create-reward/upload",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            vm.showicon = false;
            vm.test = response.data.data;
            vm.newitem.item_pic = response.data.data;
            // console.log(response.data.data);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
        //this.files.push(f);
      });
    },
    editdata(item) {
      console.log(item);
      this.showadd = false;
      this.test = item.item_pic;
    },
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-plus {
  cursor: pointer;
  display: inline-block;
  .upload-icon {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-size: 120px;
    color: #949aaf;
    transition: all ease-in 0.2s !important;
  }
}
</style>

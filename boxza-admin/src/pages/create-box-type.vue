<template>
  <v-layout>
    <v-flex class="text-center">
      <AlertBox ref="alertBox" />
      <v-text-field label="ประเภทของกล่อง" v-model="boxType"></v-text-field>
      <v-btn x-large color="info" dark @click="addBoxType()" :loading="loadingBeforeAddType">เพิ่มประเภท<v-icon right>mdi-cloud-upload</v-icon></v-btn>
      <blockquote class="blockquote">
        <v-data-table
          :loading="loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="typeList"
          :items-per-page="10"
          item-key="id"
          class="elevation-1">
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">แก้ไขประเภทของกล่อง</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="nameTypeBox" label="กรุณากรอกประเภทของกล่อง"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small @click="editItem(item)" > mdi-square-edit-outline </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete-alert-outline </v-icon>
          </template>
        </v-data-table>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>
  import AlertBox from '~/components/general/alert-box/AlertBox'
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  export default {
    name: 'create-box-type',
    components: {
      AlertBox
    },
    data () {
      return {
        loadingBeforeAddType: false,
        loading: true,
        dialog: false,
        boxType: '',
        typeBoxId: '',
        nameTypeBox: '',
        headers: [
          { text: 'ลำดับที่', align: 'left', value: 'no' },
          { text: 'ประเภทของกล่อง', align: 'left', value: 'category_name' },
          { text: 'จัดการ', align: 'left', value: 'action', sortable: false }
        ],
        typeList: []
      }
    },
    mounted () {
      this.getBoxType()
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      mapField: mapField,
      showAlert: function (value) {
        const vm = this
        const alert = {
          'mainTitle': value.title,
          'subTitle': value.text,
          'type': value.type,
          'time': value.time,
          'autoClose': value.autoClose,
          'show': value.show
        }
        vm.$refs.alertBox.showBox(alert)
      },
      addBoxType () {
        const vm = this
        const bodyBoxType = { category_name: vm.boxType }
        if (vm.boxType) {
          vm.loadingBeforeAddType = true
          vm.$axios.$post('/creat-box-type/categories', bodyBoxType)
          .then((res) => {
            vm.boxType = ''
            vm.showAlert({ title: 'สำเร็จ', text: 'เพิ่มข้อมูลสำเร็จ', type: 'success', time: 5, autoClose: true, show: true })
            vm.getBoxType()
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
                type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.loadingBeforeAddType = false
          })
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      },
      editItem (item) {
        const vm = this
        vm.typeBoxId = item.id
        vm.dialog = true
      },
      close () {
        const vm = this
        vm.dialog = false
        vm.typeBoxId = ''
        vm.nameTypeBox = ''
      },
      save () {
        const vm = this
        const editNameTypeBoxData = {
          'id': vm.typeBoxId,
          'category_name': vm.nameTypeBox
        }
        if (vm.typeBoxId && vm.nameTypeBox) {
          vm.$axios.$patch('/creat-box-type/categories', editNameTypeBoxData)
            .then((res) => {
              vm.showAlert({
                title: 'สำเร็จ',
                text: 'แก้ไขประเภทของกล่องสำเร็จ',
                type: 'success',
                time: 5,
                autoClose: true,
                show: true
              })
              vm.getBoxType()
            })
            .catch((e) => {
              if (e.response) {
                vm.showAlert({
                  title: 'ผิดพลาด!',
                  text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
                  type: 'error',
                  time: 5,
                  autoClose: true,
                  show: true
                })
              }
            })
            .finally(() => {
              vm.close()
            })
        } else {
          vm.showAlert({
            title: 'คำเตือน!',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            type: 'warning',
            time: 5,
            autoClose: true,
            show: true
          })
        }
      },
      deleteItem (item) {
        const vm = this
        const bodyBoxType = { id: item.id, is_delete: 1 }
        vm.$axios.$patch('/delete/creat-box-type/categories', bodyBoxType)
        .then((res) => {
          vm.showAlert({ title: 'สำเร็จ', text: `ลบประเภท (${item.category_name}) สำเร็จ`, type: 'success', time: 5, autoClose: true, show: true })
          vm.getBoxType()
        })
        .catch((e) => {
          if (e.response) {
            vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
              type: 'error', time: 5, autoClose: true, show: true })
          }
        })
      },
      getBoxType () {
        const vm = this
        vm.loading = true
        vm.$axios.$get('/general/categories')
        .then((res) => {
          vm.typeList = res.data.category
          vm.typeList.map((value, index) => {
            const no = { no: index+1 }
            vm.typeList[index] = {...no, ...value}
          })
        })
        .catch((e) => {
          if (e.response) {
            vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
              type: 'error', time: 5, autoClose: true, show: true })
          }
        })
        .finally(() => {
          vm.loading = false
        })
      }
    }
  }
</script>

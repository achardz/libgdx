<template>
  <v-layout id="createReward">
    <AlertBox ref="alertBox" />
    <v-flex>
      <v-row>
        <v-col cols="12">
          <p>ประเภทของกล่อง</p>
          <v-overflow-btn
            class="my-2"
            :loading="loadingDataTypeList"
            :items="selectTypeBoxList"
            v-model="selectedBoxTypeId"
            label="กรุณาเลือกประเภทของกล่อง"
          ></v-overflow-btn>
        </v-col>
        <v-col class="select-name-box" cols="12">
          <p>ชื่อกล่อง</p>
          <v-overflow-btn
            class="my-2"
            :loading="loadingDataBoxList"
            :items="selectBoxList"
            v-model="selectedBoxId"
            label="กรุณาเลือกกล่อง"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row class="item-name-box">
        <v-col id="itemName">
          <v-text-field label="ชื่อของรางวัล" v-model="rewardName"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="item-name-box">
        <v-col id="itemDescription">
          <v-text-field label="รายละเอียดของรางวัล" v-model="rewardDescription"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="reSellBox">
          <v-text-field type="number" label="ราคาปกติ" v-model="currentPrice"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="reSellBox">
          <v-text-field type="number" label="ราคา Resell" v-model="reSellPrice"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="reward-level-box">
        <v-col cols="12">
          <p>ระดับการสุ่มของรางวัล</p>
          <v-overflow-btn
            class="my-2"
            :loading="loadingDataRewardLevelList"
            :items="selectRewardLevel"
            v-model="selectedRewardLevelId"
            label="กรุณาระดับการสุ่มของรางวัล"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" id="imageSlotBox">
          <p>อัพโหลดรูปของรางวัล (สำหรับสุ่ม)</p>
          <UploadSingleImage ref="imageSlot" class="image-slot" v-on:imageFile="imageSlotFile = $event"></UploadSingleImage>
        </v-col>
        <v-col cols="12" md="6" id="imageItemBox">
          <p>อัพโหลดรูปของรางวัล (สำหรับขาย)</p>
          <UploadSingleImage ref="imageItem" class="image-item" v-on:imageFile="imageItemFile = $event"></UploadSingleImage>
        </v-col>
        <v-col cols="12" md="6" id="imageSlotBox">
          <p>อัพโหลดรูป Popup ของรางวัล (เมื่อสุ่มได้)</p>
          <UploadSingleImage ref="imageRandomPopup" class="image-slot" v-on:imageFile="imageRandomPopupFile = $event"></UploadSingleImage>
        </v-col>
        <v-col cols="12" md="6" id="imageSlotBox">
          <p>อัพโหลดรูป Popup (เมื่อซื้อของรางวัล)</p>
          <UploadSingleImage ref="imageBuyItemPopup" class="image-slot"
          v-on:imageFile="imageBuyItemPopupFile = $event"></UploadSingleImage>
        </v-col>
      </v-row>
      <v-row class="text-center btn-create-item">
        <v-col>
          <v-btn x-large color="info" :loading="loadingBeforeSendItem" @click="createItem()">สร้างของรางวัล<v-icon right>mdi-cloud-upload</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
  import UploadSingleImage from "../components/general/upload-image/UploadSingleImage"
  import AlertBox from '~/components/general/alert-box/AlertBox'
  export default {
    name: 'create-reward',
    components: {
      UploadSingleImage,
      AlertBox
    },
    data () {
      return {
        loadingBeforeSendItem: false,
        loadingDataTypeList: true,
        loadingDataBoxList: false,
        loadingDataRewardLevelList: false,
        selectTypeBoxList: [],
        selectBoxList: [],
        selectRewardLevel: [],
        selectedBoxTypeId: null,
        selectedBoxId: null,
        selectedRewardLevelId: null,
        imageSlotFile: '',
        imageItemFile: '',
        imageRandomPopupFile: '',
        imageBuyItemPopupFile: '',
        rewardName: '',
        rewardDescription: '',
        currentPrice: '',
        reSellPrice: '',
      }
    },
    computed: {},
    watch: {
      selectedBoxTypeId (id) {
        const vm = this
        if (vm.selectedBoxTypeId) {
          vm.getBoxById(id)
        }
      },
    },
    mounted () {
      this.getBoxType()
      this.getRates()
    },
    methods: {
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
      getBoxType () {
        const vm = this
        vm.loadingDataTypeList = true
        vm.$axios.$get('/general/categories')
          .then((res) => {
            const typeBoxList = res.data.category
            for (let i = 0; i < typeBoxList.length; i++) {
              vm.selectTypeBoxList.push({ text: typeBoxList[i].category_name, value: typeBoxList[i].id })
            }
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data ? e.response.data.data.message : 'ระบบขัดข้อง',
                type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.loadingDataTypeList = false
          })
      },
      getBoxById (id) {
        const vm = this
        vm.loadingDataBoxList = true
        vm.selectBoxList = []
        vm.$axios.$get('/create-reward/box', { params: { 'category_id': id } } )
          .then((res) => {
            const boxList = res.data.box
            for (let i = 0; i < boxList.length; i++) {
              vm.selectBoxList.push({ text: boxList[i].box_name, value: boxList[i].id })
            }
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data ? e.response.data.data.message : 'ระบบขัดข้อง',
                type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.loadingDataBoxList = false
          })
      },
      getRates () {
        const vm = this
        vm.loadingDataRewardLevelList = true
        vm.$axios.$get('/general/rates')
          .then((res) => {
            const rateList = res.data.rate
            for (let i = 0; i < rateList.length; i++) {
              vm.selectRewardLevel.push({ text: rateList[i].rating_name, value: rateList[i].id })
            }
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data ? e.response.data.data.message : 'ระบบขัดข้อง',
                type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.loadingDataRewardLevelList = false
          })
      },
      createItem () {
        const vm = this
        const validation = (vm.selectedBoxTypeId && vm.selectedBoxId && vm.selectedRewardLevelId && vm.imageItemFile &&
          vm.imageSlotFile && vm.imageRandomPopupFile && vm.imageBuyItemPopupFile && vm.reSellPrice && vm.rewardName && vm.rewardDescription)
        if (validation) {
          const bodyBoxType = {
            box_id: vm.selectedBoxId,
            rate_id: vm.selectedRewardLevelId,
            item_name: vm.rewardName,
            item_description: vm.rewardDescription,
            item_price: +vm.currentPrice,
            item_resell_price: +vm.reSellPrice,
            item_pic: vm.imageItemFile,
            item_pic_2: vm.imageSlotFile,
            item_pic_3: vm.imageRandomPopupFile,
            item_pic_4: vm.imageBuyItemPopupFile
          }
          vm.loadingBeforeSendItem = true
          vm.$axios.$post('/create-reward/item', bodyBoxType)
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
            vm.loadingBeforeSendItem = false
            vm.selectedBoxId = null
            vm.selectedBoxTypeId = null
            vm.selectedRewardLevelId = null
            vm.imageItemFile = ''
            vm.$refs.imageItem.image = ''
            vm.imageSlotFile = ''
            vm.$refs.imageSlot.image = ''
            vm.imageRandomPopupFile = ''
            vm.$refs.imageRandomPopup.image = ''
            vm.imageBuyItemPopupFile = ''
            vm.$refs.imageBuyItemPopup.image = ''
            vm.currentPrice = ''
            vm.reSellPrice = ''
            vm.rewardName = ''
            vm.rewardDescription = ''
          })
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #createReward {
    .select-name-box {
      margin-top: -30px;
    }
    #reSellBox {
      margin-top: -35px;
    }
    .item-name-box {
      margin-top: -45px;
    }
    .reward-level-box {
      margin-top: -20px;
    }
    #imageSlotBox {
      text-align: center;
      .image-slot {
        text-align: center;
      }
    }
    #imageItemBox {
      text-align: center;
      .image-item {
        text-align: center;
      }
    }
    .btn-create-item {
      margin-top: 30px;
    }
  }
</style>

<template>
  <v-layout id="createRewardBox">
    <AlertBox ref="alertBox" />
    <v-flex>
      <v-row>
        <v-col cols="12">
          <p>ประเภทของกล่อง</p>
          <v-overflow-btn
            class="my-2"
            :loading="loadingDataTypeList"
            :items="selectTypeList"
            v-model="selectedType"
            label="กรุณาเลือกประเภทของกล่อง"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="boxName">
          <v-text-field label="ชื่อกล่อง" v-model="boxName"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="boxPrice">
          <v-text-field type="number" label="ราคากล่อง" v-model="boxPrice"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col id="imageBox">
          <p>อัพโหลดรูปของกล่อง</p>
          <UploadSingleImage ref="uploadImage" v-on:imageFile="imageFile = $event"></UploadSingleImage>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="12" lg="6">
          <v-menu
            ref="dataMenu"
            v-model="dataMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateFormatted"
                label="วันที่สิ้นสุดการแสดงผล"
                persistent-hint
                prepend-icon="mdi-calendar-alert"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker locale="th" :min="minDate" v-model="date" no-title @input="dataMenu = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="lg-offset8" md="12" lg="6">
          <v-menu
            ref="menu"
            v-model="time"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="expiredTime"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="expiredTime"
                label="เวลาสิ้นสุดการแสดงผล"
                prepend-icon="mdi-clock-alert-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="expiredTime" v-if="time" @click:minute="$refs.menu.save(expiredTime)" format="24hr"></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <v-btn x-large color="info" @click="createBox()" :loading="loadingBeforeCreateBox">สร้างกล่อง<v-icon right>mdi-cloud-upload</v-icon></v-btn>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<script>
  import AlertBox from '~/components/general/alert-box/AlertBox'
  import UploadSingleImage from "../components/general/upload-image/UploadSingleImage"
  export default {
    name: 'create-reward-box',
    components: {
      UploadSingleImage,
      AlertBox
    },
    data () {
      return {
        loadingBeforeCreateBox: false,
        loadingDataTypeList: true,
        boxType: '',
        imageFile: '',
        boxName: '',
        boxPrice: '',
        dataMenu: false,
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        date: new Date().toISOString().substr(0, 10),
        minDate: new Date().toISOString().substr(0, 10),
        time: false,
        expiredTime: null,
        headers: [
          { text: 'ลำดับที่', align: 'left', value: 'id' },
          { text: 'ประเภทของกล่อง', align: 'left', value: 'category_name' },
          { text: 'จัดการ', align: 'left', value: 'action', sortable: false }
        ],
        typeList: [],
        selectTypeList: [],
        selectedType: null
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    mounted () {
      this.getBoxType()
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
            vm.typeList = res.data.category
            for (let i = 0; i < vm.typeList.length; i++) {
              vm.selectTypeList.push({ text: vm.typeList[i].category_name, value: vm.typeList[i].id })
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
      createBox () {
        const vm = this
        const validation = (vm.selectedType && vm.boxName && +vm.boxPrice && vm.imageFile && vm.date && vm.expiredTime)
        if (validation) {
          const bodyBox = {
            category_id: vm.selectedType,
            box_name: vm.boxName,
            box_price: +vm.boxPrice,
            box_pic: vm.imageFile,
            expired_date: `${vm.date} ${vm.expiredTime}`
          }
          vm.loadingBeforeCreateBox = true
          vm.$axios.$post('/create-reward-box/box', bodyBox)
            .then((res) => {
              vm.showAlert({ title: 'สำเร็จ', text: 'เพิ่มข้อมูลสำเร็จ', type: 'success', time: 5, autoClose: true, show: true })
            })
            .catch((e) => {
              if (e.response) {
                vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : e.response.data.data,
                  type: 'error', time: 5, autoClose: true, show: true })
              }
            })
          .finally(() => {
            vm.loadingBeforeCreateBox = false
            vm.selectedType = null
            vm.boxName = ''
            vm.boxPrice = ''
            vm.imageFile = ''
            vm.$refs.uploadImage.image = ''
            vm.date = ''
            vm.expiredTime = ''
          })
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      },
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }
</script>

<style lang="scss" scoped>
  #createRewardBox {
    #boxName, #boxPrice {
      margin-top: -35px !important;
    }
  }
</style>
<style>
  .v-application .secondary {
    background-color: #ffffff00 !important;
    border-color: #ffffff00 !important;
  }
</style>

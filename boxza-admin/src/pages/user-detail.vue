<template>
  <v-layout id="userDatail">
    <v-flex class="text-center">
      <AlertBox ref="alertBox" />
      <v-text-field type="text" label="กรุณากรอกชื่อผู้ใช้เพื่อค้นหาข้อมูล" @keyup.enter="findUser()" v-model="userName"></v-text-field>
      <div class="btn-find">
       <v-btn x-large color="info" dark @click="findUser()" :loading="loadingBeforeFindUserData">ค้นหาข้อมูล<v-icon right>mdi-cloud-upload</v-icon></v-btn>
      </div>
      <template v-if="(userDetailList.length > 0)">
       <div class="card-box" v-for="(userDetail, index) in userDetailList">
          <v-card class="mx-auto" max-width="1000">
            <v-avatar class="ma-3" size="200" tile>
              <v-img v-if="userDetail.user_pic" :src="userDetail.user_pic" />
              <v-img v-else :src="require('~/assets/images/no-img.png')" />
            </v-avatar>
            <v-card-title>
              ชื่อจริง: {{ mapField(userDetail.firstname, '', '-') }} {{ mapField(userDetail.lastname, '', '') }}
            </v-card-title>
            <v-card-title class="id-card">
              รหัสบัตรประชาชน: {{userDetail.id_card}}
            </v-card-title>
            <v-card-title class="email-box">
              Email: {{userDetail.email}}
            </v-card-title>
            <v-card-title class="tel-box">
              เบอร์โทรศัพท์: {{userDetail.tel}}
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div>ดูที่อยู่เพิ่มเติม</div>
              <v-btn icon @click="showExpand[index].show = !showExpand[index].show">
                <v-icon>{{ showExpand[index].show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="showExpand[index].show">
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.address" label="บ้านเลขที่" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.building" label="ตึก / อาคาร" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.road" label="ถนน" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.sub_district" label="ตำบล / เขต" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.district" label="อำเภอ / แขวง" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.province" label="จังหวัด" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.post" label="รหัสไปรษณีย์" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.shirt_size" label="ไซส์เสื้อ" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.pant_size" label="ไซส์กางเกง" filled readonly />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field :value="userDetail.shoes_size" label="ไซส์รองเท้า" filled readonly />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-title>ประวัติการเติมเงิน</v-card-title>
                <blockquote class="table-box">
                  <v-data-table
                    :loading="loadingTable"
                    loading-text="Loading... Please wait"
                    :headers="headers"
                    :items="userTopUpList"
                    :items-per-page="5"
                    item-key="id"
                    class="elevation-1">
                  </v-data-table>
                </blockquote>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </template>
      <template v-else>
        <v-card-title class="no-data">
          {{noData}}
        </v-card-title>
      </template>
    </v-flex>
  </v-layout>
</template>
<script>
  import AlertBox from '~/components/general/alert-box/AlertBox'
  import mapField from '~/components/general/format-not-null/FormatNotNull'

  export default {
    name: 'user-datail',
    components: {
      AlertBox
    },
    data () {
      return {
        loadingBeforeFindUserData: false,
        userName: '',
        showExpand: [],
        userDetailList: [],
        userTopUpList: [],
        loadingTable: true,
        headers: [
          { text: 'ประเภท', align: 'left', value: 'method' },
          { text: 'เงินที่เติม', align: 'left', value: 'amount' },
          { text: 'วันที่เติม', align: 'left', value: 'date_show' }
        ],
        noData: ''
      }
    },
    mounted () {
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
      findUser () {
        const vm = this
        vm.loadingBeforeFindUserData = true
        if (vm.userName.length >= 3) {
          vm.$axios.$get('/user-detail/search-users',  { params: { 'firstname':  vm.userName} })
          .then((res) => {
            vm.userDetailList = res.data.user
            if (vm.userDetailList.length > 0) {
              vm.showExpand.splice(0)
              vm.userDetailList.map((value, index) => {
              const show = { show: false, index: index }
                vm.showExpand.push(show)
              })
              vm.getTopUp(res.data.user)
              vm.noData = ''
            } else {
              vm.noData = 'ไม่พบผู้ใช้ที่ค้นหา'
            }
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
            vm.loadingBeforeFindUserData = false
          })
        } else {
          vm.showAlert({
            title: 'คำเตือน!',
            text: 'กรุณากรอกชื่อผู้ใช้อย่างน้อย 3 ตัวอักษร',
            type: 'warning',
            time: 5,
            autoClose: true,
            show: true
          })
          vm.loadingBeforeFindUserData = false
        }
      },
      getTopUp: function (userData) {
        const vm = this
        userData.map((data, i) => {
          vm.loadingTable = true
          vm.$axios.$get('/user-detail/top-up',  { params: { 'user_id':  data.id} })
          .then((res) => {
            vm.userTopUpList = res.data.payment_history
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
            vm.loadingTable = false
          })
        })
      },
      expandCard: function (value, index) {
        const vm = this
        vm.userDetailList[index].show = !value
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table-box {
    padding: 0 20px 20px 20px;
  }
  #userDatail {
    .btn-find {
      margin-bottom: 50px;
    }
    .card-box {
      margin-bottom: 20px;
    }
    .id-card, .email-box, .tel-box {
      padding-top: 0px;
    }
    .no-data {
      justify-content: center;
    }
  }
</style>
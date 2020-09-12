<template>
  <div id="profileModal">
    <AlertBox ref="alertBox" />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="1500px">
        <v-card id="profileCard">
          <div class="close-icon">
            <v-icon class="icon" @click="dialog = false">mdi-close-circle</v-icon>
          </div>
          <div class="profile">
            <div class="row">
              <div class="fix col-xs-12 col-sm-3 col-md-3">
                <div class="user-short-detail">
                  <div class="user-img">
                    <uploadImage :showImage="userImage" v-on:imageFile="imageFile = $event" />
                  </div>
                  <div class="profile-name">
                    <span>{{ username }}</span>
                  </div>
                  <div class="email-name">
                    <span>{{ email }}</span>
                  </div>
                </div>
                <div class="menu">
                  <div class="sub-menu" :class="{'activeTab': activeCheck === submenu.openDetail }"
                       v-for="submenu in subMenuProfile" :key="submenu.openDetail" @click="activeTab(submenu.openDetail)">
                    <img class="icon" :src="submenu.icon">
                    <span class="name">{{ submenu.name }}</span>
                    <span class="noTi">{{ submenu.noTi }}</span>
                  </div>
                </div>
                <div class="profile-log row">
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <div class="sum-open">
                      <span>{{ openBox }} เปิด</span>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-4">
                    <div class="sum-send">
                      <span>{{ delivered }} จัดส่ง</span>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-12 col-lg-4" @click="activeTab('rewardLogProfile')">
                    <div class="sum-reward">
                      <span>รางวัล</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fix content-profile col-xs-12 col-sm-9 col-md-9">
                <EditProfile v-on:editProfileUpdate="editProfileUpdate = $event" ref="editProfile" v-if="activeCheck === 'editProfile'" />
                <topUpProfile v-if="activeCheck === 'topUpProfile'" v-on:closeDialog="dialog = $event" />
                <stockProfile v-on:editStockProfileUpdate="editStockProfileUpdate = $event" ref="stockProfile" v-if="activeCheck === 'stockProfile'" />
                <sendItemProfile ref="sendItemProfile" v-if="activeCheck === 'sendItemProfile'" />
                <rewardLogProfile v-if="activeCheck === 'rewardLogProfile'" />
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import EditProfile from '~/components/standard-layout/components/sub-components/editProfile'
  import topUpProfile from '~/components/standard-layout/components/sub-components/topUpProfile'
  import stockProfile from '~/components/standard-layout/components/sub-components/stockProfile'
  import sendItemProfile from '~/components/standard-layout/components/sub-components/sendItemProfile'
  import rewardLogProfile from '~/components/standard-layout/components/sub-components/rewardLogProfile'
  import uploadImage from '~/components/general/upload-image/UploadImage'
  import AlertBox from '~/components/general/alert-box/AlertBox'

  export default {
    name: 'ProfileModal',
    components: {
      EditProfile,
      topUpProfile,
      stockProfile,
      sendItemProfile,
      rewardLogProfile,
      uploadImage,
      AlertBox
    },
    data () {
      return {
        dialog: true,
        editProfileUpdate: false,
        editStockProfileUpdate: false,
        activeCheck: '',
        imageFile: '',
        userImage: '',
        username: '',
        email: '',
        delivered: 0,
        openBox: 0,
        subMenuProfile: [
          { name: 'แก้ไขข้อมูล', icon: require('~/assets/images/icon/profile-user.png'), openDetail: 'editProfile', noTi: null },
          { name: 'กระเป๋าเงิน', icon: require('~/assets/images/icon/deposits.png'), openDetail: 'topUpProfile', noTi: null },
          { name: 'ช่องเก็บของ', icon: require('~/assets/images/icon/inventory.png'), openDetail: 'stockProfile', noTi: 0 },
          { name: 'กำลังจัดส่ง', icon: require('~/assets/images/icon/shipping.png'), openDetail: 'sendItemProfile', noTi: 0 }
        ]
      }
    },
    watch: {
      dialog () {
        const vm = this
        const dialogData = {
          dialog: vm.dialog,
          stockNoTi: vm.subMenuProfile[2].noTi,
          sendItemNoTi: vm.subMenuProfile[3].noTi
        }
        vm.$emit('dialog', dialogData)
      },
      imageFile() {
        const vm = this
        vm.updateImageProfile()
      },
      editProfileUpdate() {
        const vm = this
        vm.getProfile()
      },
      editStockProfileUpdate() {
        const vm = this
        vm.getItem()
        vm.getDelivery()
      }
    },
    mounted() {
      this.activeTab('editProfile')
      this.getProfile()
      this.getItem()
      this.getDelivery()
      this.getCountOpen()
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
      activeTab: function (activeValue) {
        const vm = this
        vm.activeCheck = activeValue
        switch (activeValue) {
          case 'editProfile': vm.getProfile()
            break
          case 'stockProfile': vm.getItem()
            break
          case 'sendItemProfile': vm.getDelivery()
            break
        }
      },
      getProfile () {
        const vm = this
        const userId = vm.$store.getters['auth/getProfile'].id
        vm.$axios.$get('/user-profile/profile', { params: { 'user_id': userId } })
          .then((res) => {
            vm.userImage = res.data.user.user_pic
            vm.username = res.data.user.username
            vm.email = `(${res.data.user.email})`
            vm.$store.state.authStore.auth.email = res.data.user.email
            vm.$store.state.authStore.auth.userPic = res.data.user.user_pic
            vm.$refs.editProfile.editProfileForm = res.data.user
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.editProfileUpdate = false
          })
      },
      updateImageProfile () {
        const vm = this
        const imageProfile = {
          'id': vm.$store.getters['auth/getProfile'].id,
          'user_pic': vm.imageFile
        }
        vm.$axios.$patch('/user-profile/upload-image', imageProfile)
          .then((res) => {
            vm.getProfile()
            vm.showAlert({ title: 'สำเร็จ', text: 'อัพโหลดรูปภาพสำเร็จ', type: 'success', time: 5, autoClose: true, show: true })
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
          })
      },
      // ช่องเก็บของ
      getItem() {
        const vm = this
        vm.$axios.$get('/user-profile/storage', { params: { 'user_id': vm.$store.getters['auth/getProfile'].id } })
          .then((res) => {
            vm.subMenuProfile[2].noTi = res.data.history_item.length
            vm.$refs.stockProfile.stockList = res.data.history_item ? res.data.history_item : []
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.editStockProfileUpdate = false
          })
      },
      // กำลังจัดส่ง
      getDelivery() {
        const vm = this
        vm.$axios.$get('/user-profile/delivery', { params: { 'user_id': vm.$store.getters['auth/getProfile'].id } })
          .then((res) => {
            vm.subMenuProfile[3].noTi = res.data.history_item.filter(e => e.tax === null).length
            vm.delivered = res.data.history_item.filter(e => e.tax !== null).length
            vm.$refs.sendItemProfile.deliveryList = res.data.history_item ? res.data.history_item : []
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
      },
      // กำลังจัดส่ง
      getCountOpen() {
        const vm = this
        vm.$axios.$get('/user-profile/count-open-box', { params: { 'user_id': vm.$store.getters['auth/getProfile'].id } })
          .then((res) => {
            vm.openBox = res.data.results
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @media (max-width: 768px) {
    .sub-menu {
      border: 1px solid #e4e4e4;
      border-radius: 8px;
      width: auto;
      cursor: pointer;
      height: 50px;
      font-weight: bold;
      font-size: 12px;
      align-items: center;
      margin-bottom: 5px;
      display: flex;
      padding: 5px 15px 5px 10px;
      .icon {
        height: 1rem;
        width: 1rem;
      }
      .name {
        margin-left: 10px !important;
      }
      .noTi {
        font-size: 12px !important;
        width: 25px !important;
      }
      &:hover {
        background: #8af9f97a;
      }
      &:nth-last-child {
        margin-bottom: 0px !important;
      }
    }
    .profile-log {
      .sum-open,.sum-send,.sum-reward {
        margin-top: 5px !important;
      }
      .col-lg-4, col-xl-4 {
        padding: 0px !important;
      }
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 1263px) {
    .profile-log {
      .sum-open,.sum-send,.sum-reward {
        margin-top: 5px !important;
      }
      .col-lg-4, col-xl-4 {
        padding: 0px !important;
      }
    }
  }
  @media (min-width: 1264px) {
    .col-lg-4, col-xl-4 {
      padding: 0px !important;
      &:nth-child(1) {
        padding-right: 3px !important;
      }
      &:nth-child(2) {
        padding: 0 1.5px !important;
      }
      &:nth-child(3) {
        padding-left: 3px !important;
      }
    }
  }
  @media (min-width: 1200px) {
    .fix {
      padding: 20px;
    }
  }
  #profileCard {
    padding: 10px;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    .close-icon {
      text-align: right;
      margin-right: 5px;
    }
    .profile {
      margin: 20px !important;
      .user-short-detail {
        margin-bottom: 30px;
        .user-img {
          /*width: calc(100% - 15vw);*/
          margin: auto;
          max-width: 100px;
          #imageUser {
            border-radius: 50%;
            width: 100%;
            height: 100%;
          }
        }
        .profile-name {
          margin-top: 20px;
          text-align: center;
          color: #b0b0b0;
          font-size: 1.5vh;
        }
        .email-name {
          text-align: center;
          color: #d6d6d6;
          font-size: 1.2vh;
        }
      }
      .content-profile {
        height: 70vh;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .menu {
        margin-bottom: 20px;
        .activeTab {
          background: #8af9f97a !important;
        }
        .sub-menu {
          border: 1px solid #e4e4e4;
          border-radius: 8px;
          width: auto;
          cursor: pointer;
          height: 50px;
          font-weight: bold;
          align-items: center;
          margin-bottom: 5px;
          display: flex;
          padding: 5px 15px 5px 10px;
          .name {
            margin-left: 15px;
          }
          .noTi {
            width: 35px;
            background: #1a597eb3;
            margin-left: auto;
            color: white;
            text-align: center;
            border-radius: 15px;
          }
          &:hover {
            background: #8af9f97a;
          }
          &:nth-last-child {
            margin-bottom: 0px !important;
          }
        }
      }
      .profile-log {
        margin: 0;
        .sum-open,.sum-send {
          font-size: calc(100% - 0vw);
          color: white;
          text-align: center;
          border-radius: 2px;
          height: 40px !important;
          padding: 9px;
          background: linear-gradient(to top right, #70d8d8, #00daf0);
        }
        .sum-reward {
          cursor: pointer;
          font-size: calc(100% - 0vw);
          color: white;
          text-align: center;
          border-radius: 2px;
          height: 40px !important;
          padding: 9px;
          background: linear-gradient(to top right, #57adea, #0345ff);
        }
      }
    }
  }
</style>

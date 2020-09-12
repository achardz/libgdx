<template>
  <div class="slot-random-item">
    <AlertBox ref="alertBox" />
    <registerModal ref="loginShow" v-if="openRegisterModal" v-on:dialog="openRegisterModal = $event" />
    <v-dialog v-model="confirmPopUpOpenBox" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">ยืนยันการเปิดกล่อง</v-card-title>
        <v-card-text class="pb-2"><b>ราคาในการเปิด:</b> {{ mapField(+boxPrice, '', '0', 0) }} ฿</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="confirmPopUpOpenBox = false">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" text @click="buyNow">ยืนยัน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog id="popupDialog" v-model="confirmPopUpSellItem" persistent max-width="620">
      <v-card id="popupBox">
        <div id="imagePopupBackground">
          <img class="image" v-if="itemSellData.item_pic" :src="itemSellData.item_pic">
          <img class="no-image" v-else src="~@/assets/images/no-image.png">
        </div>
        <div id="randomDialog">
          <div class="close-icon">
            <v-icon class="icon" @click="sendToStore">mdi-close-circle</v-icon>
          </div>
          <v-card-actions>
            <v-spacer />
            <v-btn class="get-btn" @click="sendToStore">เก็บเข้าคลัง</v-btn>
            <v-btn class="sell-btn" @click="sellItem">ขายคืน</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <div id="slotRandom">
      <div class="slot-box">
        <div class="disable" />
        <div class="locked-random-box">
          <div class="triangle-top" />
          <div class="line" />
          <div class="triangle-bottom" />
        </div>
        <client-only>
          <carousel-3d ref="mycarousel" v-if="slides.length > 0" :border="0" :display="9" :disable3d="true" :width="150" :height="150"
                       animationSpeed="300" :controlsVisible="false" :space="163" :clickable="false" :controls-visible="true" :count="slides.length">
            <slide v-for="(slide, i) in slides" :key="i" :index="i">
              <!--<p class="item-name">
                <span class="name">{{ slide.item_name }}</span>
              </p>-->
              <img v-if="slide.item_pic_5" id="imageMenuBox" class="item-image" :src="slide.item_pic_5">
              <img class="item-image" v-else src="~@/assets/images/no-image.png">
              <!--<div class="item-price">
                <span class="price">฿{{ mapField(slide.item_price, '', '0', 0) }}</span>
              </div>-->
            </slide>
          </carousel-3d>
        </client-only>
      </div>
    </div>
    <!--<div class="button-random-item" :class="{'disable-button': buttonDisable }" @click="!buttonDisable ? randomReward() : ''">-->
    <div class="button-random-item" :class="{'disable-button': buttonDisable }" @click="!buttonDisable ? checkLogin() : ''">
      <span>เปิด</span>
    </div>
  </div>
</template>

<script>
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  import registerModal from '~/components/standard-layout/components/RegisterAndLoginModal'
  import AlertBox from '~/components/general/alert-box/AlertBox'

  export default {
    name: 'slotRandomItem',
    components: {
      registerModal,
      AlertBox
    },
    props: {
      slotItem: { type: Array, default: null }
    },
    data () {
      return {
        id: +this.$nuxt.$router.app._route.params.id,
        buttonDisable: false,
        confirmPopUpSellItem: false,
        confirmPopUpOpenBox: false,
        openRegisterModal: false,
        itemSellData: '',
        boxPrice: localStorage.getItem('boxPrice'),
        selectedReward: Number,
        slides: []
      }
    },
    watch: {
    },
    mounted () {
      this.getSlotItem()
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
      checkLogin() {
        const vm = this
        if (!vm.$store.getters['auth/getProfile']) {
          vm.openRegisterModal = true
          vm.$nextTick(() => {
            vm.$refs.loginShow.loginFlag = true
          })
        } else {
          vm.confirmPopUpOpenBox = true
        }
      },
      getSlotItem() {
        const vm = this
        vm.slides = vm.slotItem
        // vm.$store.getters['auth/getProfile'] ? vm.checkBeforeRandomReward() : ''
      },
      buyNow() {
        const vm = this
        const buyBoxData = {
          user_id: vm.$store.getters['auth/getProfile'].id,
          box_id: vm.id,
          gold: vm.$store.getters['auth/getProfile'].gold
        }
        vm.buttonDisable = true
        vm.$axios.$post('/dashboard/buy/box', buyBoxData)
          .then((res) => {
            vm.$store.getters['auth/getProfile'].gold = res.gold
            // หลังบ้านส่ง Id 12 มา (item_id)
            vm.itemSellData = res.data.product
            const findIndexReward = vm.slides.findIndex(e => e.id === res.data.product.id)
            // + 1 เพิ่มหาตำแหน่ง
            const reward = findIndexReward + 1
            vm.clickRandomItem(reward)
          })
          .catch((e) => {
            vm.buttonDisable = false
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.confirmPopUpOpenBox = false
          })
      },
      // randomReward() {
      //   const vm = this
      //   const randomItem = {
      //     user_id: vm.$store.getters['auth/getProfile'].id,
      //     box_id: vm.id
      //   }
      //   vm.$axios.$get('/dashboard/random/item', { params: randomItem })
      //     .then((res) => {
      //       // หลังบ้านส่ง Id 12 มา (item_id)
      //       vm.itemSellData = res.data.product
      //       const findIndexReward = vm.slides.findIndex(e => e.id === res.data.product.id)
      //       // + 1 เพิ่มหาตำแหน่ง
      //       const reward = findIndexReward + 1
      //       vm.clickRandomItem(reward)
      //     })
      //     .catch((e) => {
      //       if (e.response) {
      //         vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
      //       }
      //     })
      // },
      clickRandomItem(reward) {
        const vm = this
        vm.selectedReward = reward
        let defaultSlot = vm.slides.length
        let i = 0
        const randomItem = setInterval(() => {
          i += 1
          if (i <= defaultSlot) {
            if (i === defaultSlot && defaultSlot !== 1) {
              defaultSlot = vm.selectedReward
              vm.selectedReward = 0
              i = 0
            } else if (defaultSlot === 1) {
              vm.$refs.mycarousel ? vm.$refs.mycarousel.goSlide(0) : ''
              vm.selectedReward = 0
              vm.buttonDisable = false
              vm.confirmPopUpSellItem = true
              clearInterval(randomItem)
            } else {
              vm.$refs.mycarousel ? vm.$refs.mycarousel.goSlide(i) : ''
            }
          } else {
            vm.confirmPopUpSellItem = true
            vm.buttonDisable = false
            vm.selectedReward = reward
            clearInterval(randomItem)
          }
        }, 350)
      },
      sellItem () {
        const vm = this
        const sellItemData = {
          user_id: vm.$store.getters['auth/getProfile'].id,
          item_id: vm.itemSellData.id,
          date: vm.itemSellData.date,
          is_delivery: 4
        }
        vm.$axios.$patch('/general/sell-item', sellItemData)
          .then((res) => {
            vm.$store.state.authStore.auth.gold = res.data.gold
            vm.showAlert({ title: 'สำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
            vm.confirmPopUpSellItem = false
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
          })
      },
      sendToStore() {
        const vm = this
        const itemStoragCount = vm.$store.getters['auth/getProfile'].itemStoragCount + 1
        vm.$store.state.authStore.auth.itemStoragCount = itemStoragCount
        vm.showAlert({ title: 'สำเร็จ', text: 'ของรางวัลถูกเก็บเข้าคลังแล้ว', type: 'success', time: 5, autoClose: true, show: true })
        vm.confirmPopUpSellItem = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin button($colorOne, $colorTwo) {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to top right, $colorOne, $colorTwo);
    border-radius: 2px;
  }
  @media (max-width: 767px) {
    .get-btn {
      width: 65px !important;
      height: 30px !important;
      padding: 5px 10px;
      font-size: 2.2vw;
    }
    .sell-btn {
      width: 65px !important;
      height: 30px !important;
      padding: 5px 10px;
      font-size: 2.2vw;
    }
  }
  #popupBox {
    position: relative;
    border-radius: 15px;
    #imagePopupBackground {
      max-height: 430px;
      border-radius: 15px;
      width: 100%;
      .image {
        max-height: 430px;
        border-radius: 15px;
        width: 100%;
      }
      .no-image {
        max-height: 430px;
        width: 100%;
        height: 100%;
      }
    }
    #randomDialog {
      position: absolute;
      padding: 15px;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1;
      display: flex;
      flex-direction: column;
      .close-icon {
        text-align: right;
        margin-bottom: auto;
        margin-right: 5px;
        .icon {
          color: #aaaaaa;
        }
      }
      .get-btn {
        text-align: center;
        cursor: pointer;
        width: fit-content;
        width: 110px;
        margin: auto 20px 0 auto;
        background: #ddddddc7;
        border-radius: 4px;
        color: black;
        font-weight: bold;
        padding: 5px 10px;
      }
      .sell-btn {
        text-align: center;
        cursor: pointer;
        width: fit-content;
        width: 110px;
        margin: auto auto 0 auto;
        background: linear-gradient(to top right, #3a9b9b, #00daf0);
        border-radius: 4px;
        font-weight: bold;
        color: white;
        padding: 5px 10px;
      }
    }
  }
  .slot-random-item {
    .button-random-item {
      margin: 40px auto;
      height: 40px;
      width: 180px;
      text-decoration: none;
      @include button(#3a9b9b, #00daf0);
      &:hover {
        @include button(#338787, #04c0d3);
      }
    }
    .disable-button {
      background: #c4c4c4 !important;
      &:hover {
        cursor: no-drop !important;
      }
    }
    #slotRandom {
      position: relative;
      background-color: white;
      max-width: 1500px;
      border-radius: 8px;
      margin: auto;
      z-index: 0;
     /* box-shadow:
          20px 5px 40px #CF77F3,
          0px 5px 40px #009BFF,
          -20px 5px 40px #2AC9DB;*/
      //background-image: linear-gradient(-90deg, #CF77F3 0%, #009BFF 47%, #2AC9DB 100%);
      .slot-box {
        width: 100%;
        height: 100%;
        background-color: white;
        padding: 1px 20px;
        position: relative;
        .item-name {
          position: absolute;
          top: 5px;
          right: 0;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: white;
          overflow: hidden;
          padding-left: 10px;
          background-color: rgba(57,56,56,0.63922);
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          width: 127px;
          height: 25px;
          .name {
            text-overflow: ellipsis;
            overflow: hidden;
            color: white;
          }
        }
        .item-image {
          background: white !important;
          height: 100%;
        }
        .item-price {
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          background-color: rgba(57,56,56,0.63922);
          border-radius: 15px;
          color: white;
          margin: auto;
          text-align: center;
          max-width: 130px;
          width: fit-content;
          padding: 5px 10px;
          .price {
            word-break: break-word;
          }
        }
      }
      .disable {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 3;
      }
      .locked-random-box {
        position: absolute;
        height: 209px;
        width: 200px;
        z-index: 1;
        border: 8px solid #04c0d3;
        border-radius: 15px;
        top: -6px;
        bottom: -6px;
        left: 0;
        right: 0;
        margin: auto;
        .triangle-top {
          position: absolute;
          z-index: 2;
          width: 0px;
          height: 0px;
          border-top: 25px solid #04c0d3;
          border-right: 15px solid transparent;
          border-bottom: 0px solid transparent;
          border-left: 15px solid transparent;
          top: -13px;
          right: 0;
          left: 0;
          margin: auto;
        }
        .triangle-bottom {
          position: absolute;
          z-index: 2;
          width: 0px;
          height: 0px;
          border-top: 0px solid transparent;
          border-right: 15px solid transparent;
          border-left: 15px solid transparent;
          border-bottom: 25px solid #04c0d3;
          bottom: -13px;
          right: 0;
          left: 0;
          margin: auto;
        }
        .line {
          width: 4px;
          margin: auto;
          height: 100%;
          background-color: rgba(4, 192, 211, 0.39);
        }
      }
      .carousel-3d-slide {
        border-radius: 8px;
      }
    }
    #slotRandom::before, #slotRandom::after {
      content: '';
      position: absolute;
      top: -2px;
      left: 55px;
      background: linear-gradient(45deg, #04C0D3, #00ff00,  #ffff73, #04C0D3, #00ff00, #ffff73);
      background-size: 400%;
      width: calc(100% + -110px);
      border-radius: 100px/30px;
      height: calc(100% + 4px);
      z-index: -1;
      animation: animate-data-v-40133a88 20s linear infinite;
    }
    #slotRandom::after {
      filter: blur(10px);
    }
    @keyframes animate {
      0%
      {
        background-position: 0 0;
      }
      50%
      {
        background-position: 300% 0;
      }
      100%
      {
        background-position: 0 0;
      }
    }
  }
</style>

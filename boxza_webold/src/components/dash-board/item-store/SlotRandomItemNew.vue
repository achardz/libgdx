<template>
  <div>
    <div class="slot-random-item">
      <AlertBox ref="alertBox" />
      <registerModal
        ref="loginShow"
        v-if="openRegisterModal"
        v-on:dialog="openRegisterModal = $event"
      />
      <v-dialog v-model="confirmPopUpOpenBox" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">ยืนยันการเปิดกล่อง</v-card-title>
          <v-card-text class="pb-2"
            ><b>ราคาในการเปิด:</b>
            {{ mapField(+boxPrice, "", "0", 0) }} ฿</v-card-text
          >
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="red darken-1"
              text
              @click="confirmPopUpOpenBox = false"
              >ยกเลิก</v-btn
            >
            <v-btn color="blue darken-1" text @click="buyNow">ยืนยัน</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        id="popupDialog"
        v-model="confirmPopUpSellItem"
        persistent
        max-width="620"
      >
        <v-card id="popupBox">
          <div id="imagePopupBackground">
            <img
              class="image2"
              v-if="itemSellData.rate_id > 1"
              src="~@/assets/images/reward/reward_bg_1.png"
            />
            <img
              class="image2"
              v-else
              src="~@/assets/images/reward/reward_bg_2.png"
            />
            <img
              class="image"
              v-if="itemSellData.item_pic"
              :src="itemSellData.item_pic"
            />
            <p class="name" v-if="itemSellData">{{ itemSellData.item_name }}</p>
            <p class="catagory" v-if="itemSellData">
              ({{ itemSellData.item_description }})
            </p>
            <p class="price" v-if="itemSellData">
              ฿ {{ formatPrice(itemSellData.item_price) }}
            </p>
            <!-- <img class="no-image" v-else src="~@/assets/images/no-image.png" /> -->
          </div>
          <div id="randomDialog">
            <div class="close-icon">
              <v-icon class="icon" @click="sendToStore"
                >mdi-close-circle</v-icon
              >
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
        <div ref="randomMain" class="slot-box" :style="heightStyles">
          <client-only>
            <div :style="containerStyles" class="spin-roulette-line">
              <Cards v-for="post in slides" :key="post.indexid" :post="post" />
            </div>
          </client-only>
        </div>
      </div>
    </div>
    <div
      class="open-btn"
      :class="{ 'disable-button': buttonDisable }"
      @click="!buttonDisable ? checkLogin() : ''"
    >
      <span>เปิด</span>
    </div>
    <!-- <v-btn class="open-btn" :class="{'disable-button': buttonDisable }" @click="!buttonDisable ? checkLogin() : ''">เปิด</v-btn> -->
  </div>
</template>

<script>
import mapField from "~/components/general/format-not-null/FormatNotNull";
import registerModal from "~/components/standard-layout/components/RegisterAndLoginModal";
import AlertBox from "~/components/general/alert-box/AlertBox";
import Cards from "~/components/dash-board/item-store/Card";

export default {
  name: "slotRandomItem",
  components: {
    registerModal,
    AlertBox,
    Cards
  },
  props: {
    slotItem: { type: Array, default: null },
    isSpinning: {
      type: Boolean
    }
  },
  data() {
    return {
      id: +this.$nuxt.$router.app._route.params.id,
      buttonDisable: false,
      confirmPopUpSellItem: false,
      confirmPopUpOpenBox: false,
      openRegisterModal: false,
      itemSellData: "",
      index: 10,
      boxPrice: localStorage.getItem("boxPrice"),
      selectedReward: Number,
      slides: [],
      slides2: [],
      posts: [],
      rouletteItems: [],
      isModalShown: false,
      wonItem: null,
      caseItems: null,
      caseRare: null,
      crate: null,
      spaceBetweenItems: 2,
      rouletteSettings: {
        item: {
          width: 198,
          height: 190
        },
        roulette: {
          widthInItems: 30,
          spin: {
            time: 7500,
            delay: 500
          }
        }
      },
      containerStyles: {
        marginLeft: "0",
        transition: "none"
      },
      StylesPointer: {
        marginLeft: "0",
        transition: "none"
      },
      windowWidthA: window.innerWidth
    };
  },
  watch: {
    isSpinning(value) {}
  },
  mounted() {
    this.getSlotItem();
    /* window.onresize = () => {
                this.windowWidthA = window.innerWidth
      } */
    window.addEventListener("resize", this.onResize);
    this.handleResize();
  },
  computed: {
    windowWidth() {
      return (
        this.rouletteSettings.roulette.widthInItems *
        this.rouletteSettings.item.width
      );
    },
    rouletteStyles() {
      return {
        width: `${this.windowWidth}px`,
        height: `${this.rouletteSettings.item.height}px`
      };
    },
    pointerStyles() {
      return {
        marginLeft: `${this.windowWidthA / 2}px`
      };
    },
    heightStyles() {
      return {
        height: `${this.rouletteSettings.item.height}px`
      };
    },
    marginToSpin() {
      return (
        19 * this.rouletteSettings.item.width -
        (209 + this.randomInteger(100 * 0.01, 180))
      ); // this.index * (this.rouletteSettings.item.width) + (this.index + 1) * this.spaceBetweenItems - (this.windowWidth) / 2 + this.randomInteger(this.rouletteSettings.item.width * 0.1, this.rouletteSettings.item.width)
    }
  },
  methods: {
    mapField: mapField,
    showAlert: function(value) {
      const vm = this;
      const alert = {
        mainTitle: value.title,
        subTitle: value.text,
        type: value.type,
        time: value.time,
        autoClose: value.autoClose,
        show: value.show
      };
      vm.$refs.alertBox.showBox(alert);
    },
    onResize(event) {
      this.handleResize();
    },
    randomInteger(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    handleResize() {
      var data = 0;
      if (this.windowWidthA >= 1500) {
        data = 1500 / 2 - 209 / 2;
      } else {
        data = this.windowWidthA / 2 - 209 / 2;
      }
      // data = data - (209 / 2) - 30

      // this.StylesPointer.left = `50%`
    },
    checkLogin() {
      const vm = this;
      if (!vm.$store.getters["auth/getProfile"]) {
        vm.openRegisterModal = true;
        vm.$nextTick(() => {
          vm.$refs.loginShow.loginFlag = true;
        });
      } else {
        vm.confirmPopUpOpenBox = true;
      }
    },
    getSlotItem() {
      const vm = this;
      vm.slides = vm.slotItem;
      // locked-random-box
      this.containerStyles.width = `${this.windowWidth}px`;
      this.containerStyles.marginLeft = "0";
      this.containerStyles.transition = "none";
    },
    formatPrice(value) {
      var val = value;
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    buyNow() {
      const vm = this;
      const buyBoxData = {
        user_id: vm.$store.getters["auth/getProfile"].id,
        box_id: vm.id,
        gold: vm.$store.getters["auth/getProfile"].gold
      };
      vm.buttonDisable = true;
      vm.$axios
        .$post("/dashboard/buy/box", buyBoxData)
        .then(res => {
          vm.slides = [];
          var asd = 0;
          for (var i = 0; i < 30; i++) {
            var test = this.randomInteger(1 * 0.1, this.slotItem.length - 1);
            // console.log('DATA index' + test)
            vm.slotItem[test].index = "" + i;
            if (vm.slotItem[test]) {
              if (i === 19) {
                test = vm.slotItem.findIndex(e => e.id === res.data.product.id);
                // console.log('item name get' + vm.slotItem[test].item_name)
                vm.slides.push(vm.slotItem[test]);
              } else {
                vm.slides.push(vm.slotItem[test]);
              }
              asd++;
            } else {
              if (i === 19) {
                test = vm.slotItem.findIndex(e => e.id === res.data.product.id);
                // console.log('item name get' + vm.slotItem[test].item_name)
                vm.slides.push(vm.slotItem[test]);
              } else {
                vm.slides.push(vm.slotItem[2]);
              }
              asd++;
            }
          }
          this.index = 19; // vm.slides.findIndex(e => e.id === res.data.product.id)
          // console.log(vm.slides[15])
          if (vm.slides.length > 29) {
            this.containerStyles.marginLeft = `0px`;
            this.containerStyles.width = `${this.windowWidth}px`;
            this.containerStyles.transition = "none";
            console.log(vm.slides);
            var aas = 0;
            var aaas = 0;
            aaas = this.windowWidthA - this.$refs.randomMain.clientWidth;
            // this.containerStyles.marginLeft = `-${aaas}px`
            aaas =
              19 * this.rouletteSettings.item.width -
              this.$refs.randomMain.clientWidth / 2 +
              this.randomInteger(100 * 0.01, 180);
            /* if (aaas < 3260 && this.$refs.randomMain.clientWidth < 1500) {
                      aaas = 3263
                   } */
            // console.log("data : " + aaas);
            setTimeout(() => {
              this.containerStyles.marginLeft = `-${aaas}px`;
              this.containerStyles.transition = `margin-left ${this
                .rouletteSettings.roulette.spin.time /
                1000}s cubic-bezier(0.001, 0.01, 0.05, 1.0)`;
            }, 50);
            setTimeout(() => {
              vm.confirmPopUpSellItem = true;
              vm.buttonDisable = false;
              vm.$store.getters["auth/getProfile"].gold = res.gold;
              // หลังบ้านส่ง Id 12 มา (item_id)
              vm.itemSellData = res.data.product;
            }, this.rouletteSettings.roulette.spin.time + this.rouletteSettings.roulette.spin.delay);
          }
          // const findIndexReward = vm.slides.findIndex(e => e.id === res.data.product.id)
          // + 1 เพิ่มหาตำแหน่ง
          // const reward = findIndexReward + 1
          // vm.clickRandomItem(reward)
        })
        .catch(e => {
          vm.buttonDisable = false;
          if (e.response) {
            vm.showAlert({
              title: "ผิดพลาด!",
              text: e.response.data.data.message
                ? e.response.data.data.message
                : "ระบบขัดข้อง",
              type: "error",
              time: 5,
              autoClose: true,
              show: true
            });
          }
        })
        .finally(() => {
          vm.confirmPopUpOpenBox = false;
        });
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
      this.isSpinning = true;
      // const vm = this
      // vm.selectedReward = reward
      // let defaultSlot = vm.slides.length
      // let i = 0
      // const randomItem = setInterval(() => {
      //   i += 1
      //   if (i <= defaultSlot) {
      //     if (i === defaultSlot && defaultSlot !== 1) {
      //       defaultSlot = vm.selectedReward
      //       vm.selectedReward = 0
      //       i = 0
      //     } else if (defaultSlot === 1) {
      //       vm.$refs.mycarousel ? vm.$refs.mycarousel.goSlide(0) : ''
      //       vm.selectedReward = 0
      //       vm.buttonDisable = false
      //       vm.confirmPopUpSellItem = true
      //       clearInterval(randomItem)
      //     } else {
      //       vm.$refs.mycarousel ? vm.$refs.mycarousel.goSlide(i) : ''
      //     }
      //   } else {
      //     vm.confirmPopUpSellItem = true
      //     vm.buttonDisable = false
      //     vm.selectedReward = reward
      //     clearInterval(randomItem)
      //   }
      // }, 100)
    },
    sellItem() {
      const vm = this;
      const sellItemData = {
        user_id: vm.$store.getters["auth/getProfile"].id,
        item_id: vm.itemSellData.id,
        date: vm.itemSellData.date,
        is_delivery: 4
      };
      vm.$axios
        .$patch("/general/sell-item", sellItemData)
        .then(res => {
          vm.$store.state.authStore.auth.gold = res.data.gold;
          vm.showAlert({
            title: "สำเร็จ",
            text: res.data.message,
            type: "success",
            time: 5,
            autoClose: true,
            show: true
          });
          vm.confirmPopUpSellItem = false;
        })
        .catch(e => {
          if (e.response) {
            vm.showAlert({
              title: "ผิดพลาด!",
              text: e.response.data.data.message
                ? e.response.data.data.message
                : "ระบบขัดข้อง",
              type: "error",
              time: 5,
              autoClose: true,
              show: true
            });
          }
        })
        .finally(() => {});
    },
    sendToStore() {
      const vm = this;
      const itemStoragCount =
        vm.$store.getters["auth/getProfile"].itemStoragCount + 1;
      vm.$store.state.authStore.auth.itemStoragCount = itemStoragCount;
      vm.showAlert({
        title: "สำเร็จ",
        text: "ของรางวัลถูกเก็บเข้าคลังแล้ว",
        type: "success",
        time: 5,
        autoClose: true,
        show: true
      });
      vm.confirmPopUpSellItem = false;
    }
  }
};
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
    object-fit: cover;
    .image {
      position: absolute;
      max-height: 350px;
      max-width: 350px;
      border-radius: 15px;
      width: calc(100% - 20vh);
      top: calc(20% - 5vh);
    }
    .price {
      position: absolute;
      font-family: "DB Helvethaica X Bd Cond";
      font-size: calc(100% + 4vh);
      color: rgba(255, 255, 255, 0.9);
      max-height: 430px;
      border-radius: 15px;
      bottom: calc(50% - 5vh);
      left: calc(50% + 2vw);
    }
    .name {
      position: absolute;
      font-family: "DB Helvethaica X Bd Cond";
      font-size: calc(100% + 1vh);
      color: rgba(255, 255, 255, 0.9);
      max-height: 430px;
      border-radius: 15px;
      width: 100%;
      top: calc(10% - 2vh);
      text-align: center;
      //margin-left: 30px;
    }
    .catagory {
      position: absolute;
      font-family: "DB Helvethaica X Bd Cond";
      font-size: calc(100% + 1vh);
      color: rgba(255, 255, 255, 0.9);
      max-height: 430px;
      border-radius: 15px;
      width: 100%;
      top: calc(20% - 2vh);
      text-align: center;
      //margin-left: 30px;
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
.open-btn {
  text-align: center;
  cursor: pointer;
  width: fit-content;
  width: 110px;
  margin-left: calc(50% - 55px);
  margin-top: 20px;
  background: linear-gradient(to top right, #3a9b9b, #00daf0);
  border-radius: 4px;
  font-weight: bold;
  color: white;
  padding: 5px 10px;
}
.button-random-itemZ {
  position: relative;
  text-decoration: none;
  @include button(#3a9b9b, #00daf0);
  &:hover {
    @include button(#338787, #04c0d3);
  }
}
.locked-random-box {
  position: absolute !important;
  height: 209px;
  width: 200px;
  z-index: 1;
  border: 8px solid #04c0d3;
  border-radius: 15px;
  top: -6px;
  bottom: -6px;
  left: 1px;
  right: 0;
  .triangle-top {
    position: absolute !important;
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
    position: absolute !important;
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
    position: absolute !important;
    width: 4px;
    height: 100%;
    background-color: rgba(4, 192, 211, 0.39);
  }
}
.slot-random-item {
  .button-random-item {
    position: relative;
    text-decoration: none;
    @include button(#3a9b9b, #00daf0);
    &:hover {
      @include button(#338787, #04c0d3);
    }
  }
  .disable-button {
    position: relative;
    background: #c4c4c4 !important;
    &:hover {
      cursor: no-drop !important;
    }
  }
  .spin-roulette {
    margin: 0 auto;
    overflow: hidden;
    border-radius: 3px;
  }
  #slotRandom {
    position: relative;
    max-width: 1500px;
    border-radius: 8px;
    margin: auto;
    background-color: white;
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
      position: relative;
      overflow: hidden;
      .item-name {
        position: absolute;
        top: 5px;
        right: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: white;
        padding-left: 10px;
        background-color: rgba(57, 56, 56, 0.63922);
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
        background-color: rgba(57, 56, 56, 0.63922);
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
    }
    .carousel-3d-slide {
      border-radius: 8px;
    }
  }
  #slotRandom::before,
  #slotRandom::after {
    content: "";
    position: absolute;
    top: -2px;
    left: 55px;
    background: linear-gradient(
      45deg,
      #04c0d3,
      #00ff00,
      #ffff73,
      #04c0d3,
      #00ff00,
      #ffff73
    );
    background-size: 400%;
    width: calc(100% + -110px);
    border-radius: 100px/30px;
    height: calc(100% + 4px);
    z-index: -1;
    animation: animate-data-v-40133a88 20s linear infinite;
  }
  #slotRandom::after {
    filter: blur(10px);
    overflow: hidden;
  }
  .spin-roulette-pointer {
    position: absolute;
    height: 209px;
    width: 200px;
    z-index: 1;
    border: 8px solid #04c0d3;
    border-radius: 15px;
    left: 50%;
    right: 0;
    margin: 0 auto;
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
      margin: 0 auto;
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
      margin: 0 auto;
    }
    .line {
      width: 4px;
      margin: 0 auto;
      height: 100%;
      background-color: rgba(4, 192, 211, 0.39);
    }
    /*transition: all .5s ease-in-out;*/
  }
  @keyframes animate {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 300% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
}
</style>

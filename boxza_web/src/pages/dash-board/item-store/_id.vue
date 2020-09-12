<template>
  <div>
    <playgame />
    <section id="itemStoreId" class="item-store-section">
      <AlertBox ref="alertBox" />
      <v-row>
        <div class="locked-random-box" :style="StylesPointer">
          <div class="triangle-top" />
          <div class="line" />
          <div class="triangle-bottom" />
        </div>
        <v-col>
          <SlotRandomItem v-if="itemList.length > 0" :slotItem="itemList" />
        </v-col>
        <v-col cols="3" v-if="is_chat" />
      </v-row>
      <registerModal
        ref="loginShow"
        v-if="openRegisterModal"
        v-on:dialog="openRegisterModal = $event"
      />
      <v-dialog
        id="popupDialog"
        v-model="confirmPopUpBuyItem"
        persistent
        max-width="620"
      >
        <v-card id="popupBox">
          <div id="imagePopupBackground">
            <!-- <v-img max-height="300" v-if="itemBuyData.item_pic" :src="itemBuyData.item_pic" :lazy-src="itemBuyData.item_pic" /> -->
            <v-img
              class="image"
              v-if="itemBuyData.item_pic_4"
              :src="itemBuyData.item_pic_4"
            />
            <v-img
              class="no-image"
              v-else
              src="~@/assets/images/no-image.png"
            />
          </div>
          <div id="buyDialog">
            <div class="close-icon">
              <v-icon class="icon" @click="confirmPopUpBuyItem = false">
                mdi-close-circle
              </v-icon>
            </div>
            <v-card-actions>
              <v-spacer />
              <v-btn class="buy-btn" @click="buyItem()">ซื้อ</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col>
          <v-lazy
            v-model="isActive"
            :options="{ threshold: 0.5 }"
            min-height="200"
            transition="fade-transition"
          >
            <div id="itemStore">
              <div class="row seven-cols">
                <div
                  class="col-sm-6 col-md-3 col-lg-3 col-xl-1"
                  v-for="(item,index) in itemList"
                  :key="index"
                >
                  <div class="item-box  menu-box">
                    <div class="name-item">
                      {{ mapField(item.item_name, "", "") }}
                    </div>
                    <div class="description-item">
                      {{ mapField(item.item_description, "", "") }}
                    </div>
                    <v-container class="image-box" fluid>
                      <v-img
                        fluid
                        v-if="item.item_pic"
                        :src="item.item_pic"
                        class="image-item"
                      />
                      <v-img
                        fluid
                        v-else
                        src="~@/assets/images/no-image.png"
                        class="image-item"
                      />
                    </v-container>
                    <div class="price-item" @click="showPopup(item)">
                      ฿{{ mapField(item.item_price, "", "0", 0) }}
                    </div>
                    <div class="rate-item">
                      {{ mapField(item.rate, "", "0") }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-lazy>
        </v-col>
        <v-col cols="3" v-if="is_chat" />
      </v-row>
    </section>
  </div>
</template>

<script>
import mapField from "~/components/general/format-not-null/FormatNotNull";
import SlotRandomItem from "~/components/dash-board/item-store/SlotRandomItemNew";
import playgame from "~/components/playgame";
// import ChatBox from '~/components/dash-board/ChatBox'
import registerModal from "~/components/standard-layout/components/RegisterAndLoginModal";
import AlertBox from "~/components/general/alert-box/AlertBox";

export default {
  components: {
    SlotRandomItem,
    // ChatBox,
    registerModal,
    AlertBox,
    playgame
  },
  data() {
    return {
      id: +this.$nuxt.$router.app._route.params.id,
      confirmPopUpBuyItem: false,
      isActive: false,
      itemList: [],
      openRegisterModal: false,
      itemBuyData: {},
      is_chat: false,
      StylesPointer: {
        left: "0"
      }
    };
  },
  mounted() {
    // this.checkAuth()
    this.getBox();
    window.addEventListener("resize", this.onResize);
    this.handleResize();
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
    handleResize() {
      var data = 0;
      data = window.innerWidth / 2 - 209 / 2;
      console.log(window.innerWidth);
      this.StylesPointer.left = "" + data + "px";
    },
    getBox() {
      const vm = this;
      vm.itemList = [];
      vm.$axios
        .$get("/dashboard/item-store/item", {
          params: {
            box_id: vm.id
          }
        })
        .then(res => {
          vm.itemList = res.data.product;
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
        });
    },
    // checkAuth () {
    //   const vm = this
    //   if (!vm.$store.getters['auth/getProfile']) {
    //     vm.$nuxt.$router.push('/dash-board')
    //   }
    // },
    showPopup(item) {
      const vm = this;
      if (!vm.$store.getters["auth/getProfile"]) {
        vm.openRegisterModal = true;
        vm.$nextTick(() => {
          vm.$refs.loginShow.loginFlag = true;
        });
      } else {
        vm.itemBuyData = item;
        vm.confirmPopUpBuyItem = true;
      }
    },
    buyItem() {
      const vm = this;
      const buyItemData = {
        user_id: vm.$store.getters["auth/getProfile"].id,
        item_id: vm.itemBuyData.id,
        box_id: vm.itemBuyData.box_id,
        gold: vm.$store.getters["auth/getProfile"].gold
      };
      vm.$axios
        .$post("/dashboard/buy-item", buyItemData)
        .then(res => {
          const itemStoragCount =
            vm.$store.getters["auth/getProfile"].itemStoragCount + 1;
          vm.$store.state.authStore.auth.itemStoragCount = itemStoragCount;
          vm.$store.state.authStore.auth.gold = res.data.gold;
          vm.showAlert({
            title: "สำเร็จ",
            text: res.data.message,
            type: "success",
            time: 5,
            autoClose: true,
            show: true
          });
          vm.confirmPopUpBuyItem = false;
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
    clickChat() {
      this.is_chat = !this.is_chat;
    }
  }
};
</script>

<style lang="scss" scoped>
/*@media (min-width: 768px) {*/
/*  width: 100%;*/
/*  *width: 100%;*/
/*}*/
@media (min-width: 1200px) {
  .seven-cols .col-md-1,
  .seven-cols .col-sm-1,
  .seven-cols .col-lg-1,
  .seven-cols .col-xl-1 {
    min-width: 14.285714285714285714285714285714%;
    *min-width: 14.285714285714285714285714285714%;
  }
}

@media (max-width: 767px) {
  .detail-popup {
    text-align: right;
    margin: auto 0 auto auto;
    color: white;
    width: 60%;

    .text-popup-box {
      text-align: center;

      .topic {
        font-size: 4vw !important;
      }

      .description {
        font-size: 3vw !important;
      }

      .price {
        font-size: 7vw !important;
      }
    }

    .price {
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }

  .buy-btn {
    width: 70px !important;
    height: 30px !important;
  }
}

@media (max-width: 768px) {
  #popupBox {
    position: relative;
    border-radius: 15px;

    #imagePopupBackground {
      max-height: 360px !important;
      border-radius: 15px;
      width: 100%;

      .image {
        max-height: 360px !important;
        border-radius: 15px;
        width: 100%;
        height: 100%;
      }

      .no-image {
        max-height: 360px !important;
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
  }
}

@media only screen and (min-width: 1024px) {
  .menu-box:hover {
    position: absolute;
    top: -2.5vh;
  }
}

#popupDialog {
  width: fit-content;
  display: table;

  .v-dialog {
    border-radius: 15px !important;
  }
}

#popupBox {
  position: relative;
  border-radius: 15px;

  #imagePopupBackground {
    max-height: 340px;
    border-radius: 15px;
    width: 100%;

    .image {
      max-height: 340px;
      border-radius: 15px;
      width: 100%;
      height: 100%;
    }

    .no-image {
      max-height: 340px;
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }

  #buyDialog {
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

    .detail-popup {
      text-align: right;
      margin: auto 0 auto auto;
      color: white;
      width: 60%;

      .text-popup-box {
        text-align: center;

        .topic {
          font-size: 24px;
        }

        .description {
          font-size: 20px;
        }

        .price {
          font-size: 34px;
        }
      }
    }

    .buy-btn {
      text-align: center;
      cursor: pointer;
      width: fit-content;
      width: 110px;
      margin: auto auto 0 auto;
      background: linear-gradient(to top right, #3a9b9b, #00daf0);
      border-radius: 4px;
      color: white;
      padding: 5px 10px;
    }
  }
}

.item-store-section {
  margin-top: 10px !important;

  .locked-random-box {
    position: absolute !important;
    height: 209px;
    width: 200px;
    border: 8px solid #04c0d3;
    border-radius: 15px;
    right: 0;
    z-index: 1;

    .triangle-top {
      position: absolute !important;
      width: 0px;
      height: 0px;
      border-top: 25px solid #04c0d3;
      border-right: 15px solid transparent;
      border-bottom: 0px solid transparent;
      border-left: 15px solid transparent;
      top: -13px;
      left: 0;
      right: 0;
      margin: auto;
    }

    .triangle-bottom {
      position: absolute !important;
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
      left: calc(50% - 2px);
      background-color: rgba(4, 192, 211, 0.39);
    }
  }

  #itemStore {
    .seven-cols .col-md-1,
    .seven-cols .col-sm-1,
    .seven-cols .col-lg-1,
    .seven-cols .col-xl-1 {
      padding: 3px;
    }

    .item-box {
      position: relative;
      /*max-width: 250px;*/
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 10px;
      margin: 5px auto auto auto;
      background-color: white;
      border-radius: 8px;

      .image-item {
        /*width: 130px;
          height: 130px;*/
        width: 100%;
        height: 100%;
        /*width: calc(100% - 50px);*/
        margin: auto;
      }

      .image-box {
        margin: auto;
      }

      .name-item {
        text-align: center;
        margin-bottom: 5px;
        color: black;
        font-weight: bold;
      }

      .description-item {
        text-align: center;
        margin-bottom: 5px;
        color: #c4c4c4;
        font-weight: bold;
      }

      .rate-item {
        margin-left: auto;
        color: #c4c4c4;
        display: table;
        margin-top: -15px;
      }

      .price-item {
        text-align: center;
        cursor: pointer;
        width: fit-content;
        max-width: 170px;
        margin: 0 auto;
        background: linear-gradient(to top right, #3a9b9b, #00daf0);
        border-radius: 4px;
        color: white;
        padding: 5px 10px;
      }
    }
  }
}
</style>

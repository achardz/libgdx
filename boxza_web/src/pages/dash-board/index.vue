<template>
  <section id="dashboard">
    <registerModal
      ref="loginShow"
      v-if="openRegisterModal"
      v-on:dialog="openRegisterModal = $event"
    />
    <AlertBox ref="alertBox" />
    <v-row>
      <v-col>
        <div class="row row-tab">
          <div class="col-md-2" v-if="tabList.length > 0">
            <div
              class="button-tab-box"
              :class="{ tabActive: tabActive === 0 }"
              @click="getBox(0)"
            >
              <span>กล่องทั้งหมด</span>
            </div>
          </div>
          <div class="col-md-2" v-for="(tab,index) in tabList" :key="index">
            <div
              class="button-tab-box"
              :class="{ tabActive: tabActive === tab.id }"
              :key="tab.id"
              @click="getBox(tab.id)"
            >
              <span>
                <v-img class="button-tab-image" :src="tab.pic_url" />
              </span>
              <span>{{ tab.category_name }}</span>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="3" v-if="is_chat" />
    </v-row>
    <v-row>
      <v-col>
        <v-lazy
          v-model="isActive"
          :options="{ threshold: 0.5 }"
          min-height="200"
          transition="fade-transition"
        >
          <div class="row is-multiline">
            <div
              class="col-sm-3 col-md-2 menu-big-box"
              v-for="(menu,index) in menuList"
              :key="index"
            >
              <div class="menu-box" @click="checkBoxItem(menu)">
                <v-img
                  v-if="menu.box_picbg"
                  id="imageMenuBox"
                  :src="menu.box_picbg"
                  class="menu-image-box"
                  :lazy-src="menu.box_picbg"
                />
                <v-img
                  v-if="menu.box_pic"
                  id="imageMenuBox"
                  :src="menu.box_pic"
                  class="menu-image-bg"
                  :lazy-src="menu.box_pic"
                />
                <v-img v-else src="~@/assets/images/no-image.png" />
                <div class="price-menu">
                  ฿{{ mapField(menu.box_price, "", "0", 0) }}
                </div>
                <div class="name-menu">
                  {{ mapField(menu.box_name, "", "") }}
                </div>
              </div>
            </div>
          </div>
        </v-lazy>
      </v-col>
      <v-col cols="3" v-if="is_chat" />
      <!-- <ChatBox v-if="this.$store.getters['auth/getProfile']" /> -->
    </v-row>
    <div @click="clickChat()" />
  </section>
</template>

<script>
import mapField from "~/components/general/format-not-null/FormatNotNull";
import AlertBox from "~/components/general/alert-box/AlertBox";
// import ChatBox from '~/components/dash-board/ChatBox';
import registerModal from "~/components/standard-layout/components/RegisterAndLoginModal";

export default {
  name: "Dashboard",
  components: {
    AlertBox,
    // ChatBox,
    registerModal
  },
  data() {
    return {
      tabList: [],
      menuList: [],
      boxId: "",
      isActive: false,
      showPopupLink: false,
      showPopupBuy: false,
      boxConfirm: false,
      openRegisterModal: false,
      tabActive: "",
      boxName: "",
      checkBuyBox: {},
      is_chat: false
    };
  },
  mounted() {
    this.getMenu();
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
    async getMenu() {
      const vm = this;
      vm.$axios
        .$get("/dashboard/categories")
        .then(res => {
          vm.tabList = res.data.category;
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
      await vm.getBox(0);
    },
    getBox(menuId) {
      const vm = this;
      vm.tabActive = menuId;
      vm.menuList = [];
      vm.$axios
        .$get("/dashboard/box", { params: { category_id: menuId } })
        .then(res => {
          vm.menuList = res.data.box;
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
    checkBoxItem(value) {
      const vm = this;
      localStorage.setItem("boxPrice", value.box_price);
      vm.$nuxt.$router.push(`/dash-board/item-store/${value.id}`);
      // vm.boxName = boxData.box_name
      // vm.boxId = boxData.id
      // if (!vm.$store.getters['auth/getProfile']) {
      //   const vm = this
      //   vm.openRegisterModal = true
      //   vm.$nextTick(() => {
      //     vm.$refs.loginShow.loginFlag = true
      //   })
      // } else {
      //   const checkBoxData = {
      //     user_id: vm.$store.getters['auth/getProfile'].id,
      //     box_id: vm.boxId
      //   }
      //   vm.$axios.$get('/dashboard/check-buy/box', { params: checkBoxData })
      //     .then((res) => {
      //       vm.checkBuyBox = res.data
      //       if (vm.checkBuyBox.status) {
      //         vm.showPopupLink = vm.checkBuyBox.status
      //       } else {
      //         vm.showPopupBuy = true
      //       }
      //     })
      //     .catch((e) => {
      //       if (e.response) {
      //         vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
      //       }
      //     })
      // }
    },
    clickChat() {
      this.is_chat = !this.is_chat;
    }
    // bought() {
    //   const vm = this
    //   vm.$nuxt.$router.push(`/dash-board/item-store/${vm.boxId}`)
    // },
    // buyNow() {
    //   const vm = this
    //   const buyBoxData = {
    //     user_id: vm.$store.getters['auth/getProfile'].id,
    //     box_id: vm.boxId,
    //     gold: vm.$store.getters['auth/getProfile'].gold
    //   }
    //   vm.$axios.$post('/dashboard/buy/box', buyBoxData)
    //     .then((res) => {
    //       vm.$nuxt.$router.push(`/dash-board/item-store/${vm.boxId}`)
    //     })
    //     .catch((e) => {
    //       if (e.response) {
    //         vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
    //       }
    //     })
    //   .finally(() => {
    //     vm.showPopupBuy = false
    //   })
    // }
    // linkToItemStore () {
    //   const vm = this
    //   if (!vm.$store.getters['auth/getProfile']) {
    //     const vm = this
    //     vm.openRegisterModal = true
    //     vm.$nextTick(() => {
    //       vm.$refs.loginShow.loginFlag = true
    //     })
    //   } else {
    //
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
@mixin font($size, $weight, $color, $style) {
  font-family: "Prompt-Regular";
  font-size: $size;
  font-weight: $weight;
  font-style: $style;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: $color;
}
@media only screen and (max-width: 767px) {
  #dashboard {
    margin: 0px !important;
    padding: 30px !important;
    .row-tab {
      padding: 0 200px;
    }
    .menu-box {
      max-width: 500px !important;
      max-height: 500px !important;
    }
  }
}
@media (width: 768px) {
  .button-tab-box {
    font-size: 12px !important;
  }
}
@media only screen and (max-width: 1474px) {
  #dashboard {
    margin: 0px !important;
    padding: 50px !important;
    .row-tab {
      padding: 0 !important;
      .button-tab-box {
        padding: 0 !important;
      }
    }
  }
}
@media only screen and (min-width: 1024px) {
  #dashboard {
    margin: 0px !important;
    padding: 50px !important;
  }
  .menu-big-box {
    .menu-box:hover {
      position: absolute;
      top: -2.5vh;
    }
  }
}
#dashboard {
  .row-tab {
    padding: 0 200px;
    .button-tab-box {
      display: flex;
      height: 45px;
      justify-content: center;
      background: linear-gradient(to right, #4cc9c9, #00daf0);
      border-radius: 8px;
      padding: 5px 10px;
      align-items: center;
      color: white;
      cursor: pointer;
      margin: auto;
      .icon-font {
        margin-top: -2px;
        margin-right: 5px;
      }
    }
    .button-tab-box:hover {
      filter: brightness(110%);
    }
    .button-tab-image {
      height: 24px;
      padding-right: 8px;
    }
    .tabActive {
      background: #1f3240 !important;
    }
  }
  .menu-big-box {
    position: relative;
    .menu-box {
      position: relative;
      /*max-width: 250px;
        max-height: 250px;*/
      width: 100%;
      height: 100%;
      margin: auto;
      cursor: pointer;
      .menu-image-box {
        position: absolute;
        border-radius: 8px;
        height: 100%;
      }
      .menu-image-box-bg {
        border-radius: 8px;
        height: 100%;
      }
      .price-menu {
        position: absolute;
        top: 5px;
        right: 5px;
        background-color: red;
        color: white;
        padding: 0 10px;
      }
      .name-menu {
        position: absolute;
        bottom: 5px;
        right: 0;
        text-align: center;
        left: 0;
        color: white;
        font-weight: bold;
      }
    }
  }
  /*.dash-board-title {
      @include fontNav(24px, bold, black, normal);
    }*/
}
</style>

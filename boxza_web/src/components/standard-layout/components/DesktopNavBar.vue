<template>
  <div id="desktopNavBar">
    <AlertBox ref="alertBox" />
    <registerModal
      ref="loginmain"
      v-if="openRegisterModal"
      v-on:dialog="openRegisterModal = $event"
    />
    <profileModal
      ref="activeProfile"
      v-if="openProfileModal"
      v-on:dialog="profileEmit"
    />
    <div class="nav-new">
      <v-row>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="2.0in"
          height="1.139in"
        >
          <defs>
            <filter
              filterUnits="userSpaceOnUse"
              id="Filter_0"
              x="0px"
              y="0px"
              width="182px"
              height="82px"
            >
              <feOffset in="SourceAlpha" dx="1.69" dy="3.625" />
              <feGaussianBlur result="blurOut" stdDeviation="2.449" />
              <feFlood flood-color="rgb(21, 19, 21)" result="floodOut" />
              <feComposite operator="atop" in="floodOut" in2="blurOut" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.26" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="PSgrad_0">
              <stop offset="0%" stop-color="rgb(3,195,199)" stop-opacity="1" />
              <stop
                offset="100%"
                stop-color="rgb(27,247,224)"
                stop-opacity="1"
              />
            </linearGradient>
          </defs>
          <g filter="url(#Filter_0)">
            <path
              fill-rule="evenodd"
              fill="url(#PSgrad_0)"
              d="M0.000,0.000 L174.000,0.000 L153.000,72.000 L0.000,72.000 L0.000,0.000 Z"
            />
          </g>
          <image
            x="30"
            y="20"
            max-width="100px"
            :href="require('~/assets/images/icon/logo.png')"
            :lazy-href="require('~/assets/images/icon/logo.png')"
          />
        </svg>
        <div
          class="sub-menu-box is-hidden-mobile"
          v-for="(menu, index) in menuList"
          :key="index"
        >
          <div class="sub-menu">
            <span
              class="menu-text"
              @click="redirect(menu.path)"
              :class="{ 'active-menu': activeMenu(menu.pathName, $route) }"
            >{{ menu.menuName }}
            </span>
          </div>
        </div>
        <v-btn class="button-top-up" v-if="isLogin" to="/top-up">
          <span class="button-text">เติมเงิน</span>
        </v-btn>
        <v-btn class="button-register" v-if="!isLogin" @click="dologin($event)">
          <span class="button-text">เข้าสู่ระบบ</span>
        </v-btn>
        <v-menu offset-y open-on-hover v-if="isLogin">
          <template v-slot:activator="{ on }">
            <v-avatar
              class="profile-img"
              size="36"
              v-on="on"
              @click.stop="checkRouterProfileModal"
            >
              <img :src="userProfile.userPic" :alt="userProfile.username">
            </v-avatar>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in profileMenu"
              :key="index"
              @click="showProfileModal(item.menuRouterPath)"
            >
              <v-list-item-icon>
                <img :src="item.icon">
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.menuName" />
              </v-list-item-content>
              <v-list-item-icon>
                <span class="counter-text">{{ item.noTi }}</span>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item v-if="isLogin" @click="logout">
              <v-list-item-icon>
                <img
                  width="25px"
                  height="16px"
                  :src="require('~/assets/images/icon/exit.png')"
                >
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ออกจากระบบ</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <span class="coin-text" v-if="isLogin">฿ {{ userProfile.gold }}</span
        ><br>
        <span class="coin-text-2" v-if="isLogin">
          <img :src="require('~/assets/images/icon/icon-bonus.png')">
          {{ userProfile.gold }}</span
        >
      </v-row>
    </div>
  </div>
</template>

<script>
import profileModal from "./sub-components/ProfileModal";
import registerModal from "~/components/standard-layout/components/RegisterAndLoginModal";
import mapField from "~/components/general/format-not-null/FormatNotNull";
import AlertBox from "~/components/general/alert-box/AlertBox";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "DesktopNavBar",
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }
        }
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },
      unbind: function(el, binding) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    registerModal,
    profileModal,
    AlertBox
  },
  data() {
    return {
      isLogin: false,
      openRegisterModal: false,
      openProfileModal: false,
      openProfileRouter: false,
      userProfile: {},
      menuList: [
        {
          menuName: "กล่องทั้งหมด",
          pathName: "dash-board",
          path: "/dash-board"
        },
        {
          menuName: "วิธีเล่น",
          pathName: "how-to-play",
          path: "/how-to-play"
        },
        {
          menuName: "เกี่ยวกับ",
          pathName: "about",
          path: "/about"
        }
      ],
      slideShowList: [
        {
          id: 1,
          imgPath: require("~/assets/images/banner/1.jpg")
        },
        {
          id: 2,
          imgPath: require("~/assets/images/banner/2.jpg")
        },
        {
          id: 3,
          imgPath: require("~/assets/images/banner/3.jpg")
        },
        {
          id: 4,
          imgPath: require("~/assets/images/banner/4.jpg")
        }
      ],
      profileMenu: [
        {
          menuName: "แก้ไขข้อมูลส่วนตัว",
          icon: require("~/assets/images/icon/account.png"),
          menuRouterPath: "editProfile",
          noTi: null
        },
        {
          menuName: "กระเป๋าเงิน",
          icon: require("~/assets/images/icon/deposits.png"),
          menuRouterPath: "topUpProfile",
          noTi: null
        },
        {
          menuName: "รางวัล",
          icon: require("~/assets/images/icon/box.png"),
          menuRouterPath: "rewardLogProfile",
          noTi: null
        },
        {
          menuName: "ช่องเก็บของ",
          icon: require("~/assets/images/icon/inventory.png"),
          menuRouterPath: "stockProfile",
          noTi: 0
        },
        {
          menuName: "กำลังจัดส่ง",
          icon: require("~/assets/images/icon/shipping.png"),
          menuRouterPath: "sendItemProfile",
          noTi: 0
        }
      ]
    };
  },
  watch: {
    openRegisterModal: function() {
      const vm = this;
      vm.checkAuth();
    }
  },
  mounted() {
    this.checkAuth();
    if (this.$route.path.includes("/shop")) {
      this.menuList = [
        {
          menuName: "หน้าแรก",
          pathName: "shop",
          path: "/shop"
        },
        {
          menuName: "หน้าแรก",
          pathName: "asdasds",
          path: "/about"
        }
      ];
      console.log("shop open");
    }
  },
  methods: {
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
    mapField: mapField,
    dologin: function(value) {
      // this.showlogin()
      this.openRegisterModal = true;
      this.$nextTick(() => {
        this.$refs.loginmain.loginFlag = true;
        // console.log(this.$refs)
      });
    },
    profileEmit(value) {
      const vm = this;
      vm.openProfileModal = value.dialog;
      vm.$store.state.authStore.auth.itemStoragCount = value.stockNoTi;
      vm.profileMenu[3].noTi = value.sendItemNoTi;
    },
    getUserId() {
      return this.$store.getters["auth/getProfile"].id;
    },
    checkAuth() {
      const vm = this;
      if (vm.$store.getters["auth/getProfile"]) {
        vm.isLogin = true;
        vm.userProfile = vm.$store.getters["auth/getProfile"];
        vm.openProfileRouter = false;
        vm.getItem();
        vm.getDelivery();
      } else {
        vm.isLogin = false;
      }
    },
    // ยิงเพื่อเอา noti ช่องเก็บของ
    getItem() {
      const vm = this;
      vm.$axios
        .$get("/user-profile/storage", {
          params: {
            user_id: vm.$store.getters["auth/getProfile"].id
          }
        })
        .then(res => {
          vm.$store.state.authStore.auth.itemStoragCount =
            res.data.history_item.length;
        })
        .catch(e => {
          if (e.response) {
            console.error(e.response.data.data.message);
          }
        });
    },
    // ยิงเพื่อเอา noti การจัดส่ง
    getDelivery() {
      const vm = this;
      vm.$axios
        .$get("/user-profile/delivery", {
          params: {
            user_id: vm.$store.getters["auth/getProfile"].id
          }
        })
        .then(res => {
          vm.profileMenu[4].noTi = res.data.history_item.filter(
            e => e.tax === null
          ).length;
        })
        .catch(e => {
          console.error(e.response.data.data.message);
        });
    },
    logout: function() {
      const vm = this;
      if (this.$route.path.includes("/dash-board/item-store/")) {
        vm.$nuxt.$router.push("/dash-board");
      }
      Cookie.remove("boxzaAuth");
      localStorage.clear();
      vm.$store.commit("setAuth", null);
      vm.checkAuth();
      vm.showAlert({
        title: "ออกจากระบบ!",
        text: "ออกจากระบบเรียบร้อยแล้ว",
        type: "warning",
        time: 5,
        autoClose: true,
        show: true
      });
    },
    redirect(path) {
      const vm = this;
      if (vm.$router.currentRoute.path !== path) {
        vm.$nuxt.$router.push(path);
      }
    },
    activeMenu(name, route) {
      const vm = this;
      let checkRoute = "";
      if (name === route.name) {
        checkRoute = route.path.includes(route.path);
      }
      if (name === "dash-board") {
        if (route.name === "dash-board-item-store-id") {
          checkRoute = route.path.includes("/dash-board");
        }
      }
      return checkRoute;
    },
    closeEvent: function() {
      const vm = this;
      vm.openProfileRouter = false;
    },
    checkRouterProfileModal() {
      const vm = this;
      vm.openProfileRouter = true;
      vm.profileMenu[3].noTi = this.$store.getters["auth/getProfile"].itemStoragCount;
      // vm.openProfileModal = true
    },
    showProfileModal(menu) {
      const vm = this;
      vm.openProfileModal = true;
      vm.$nextTick(() => {
        vm.$refs.activeProfile.activeCheck = menu;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin fontNav($size, $weight, $color, $style) {
  font-family: "DB Helvethaica X Bd Cond";
  font-size: $size;
  font-weight: $weight;
  font-style: $style;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: $color;
}

@mixin button($colorOne, $colorTwo) {
  color: white;
  display: flex;
  cursor: pointer;
  background: linear-gradient(to top, $colorOne, $colorTwo);
  border-radius: 0px;
}

#desktopNavBar {
  display: list-item;

  .nav-new {
    left: 0px;
    background-image: -webkit-linear-gradient(
      -90deg,
      rgb(31, 8, 94) 0%,
      rgb(76, 22, 224) 100%
    );
    height: 50px;
    z-index: 2;

    .text-name {
      font-size: 13.5px;
      font-family: "BarlowSemiCondensed";
      color: rgb(255, 255, 255);
      line-height: 0.5;
      text-align: center;
      z-index: 26;
    }

    .text-bonus {
      font-size: 13.5px;
      font-family: "BarlowSemiCondensed";
      color: rgb(0, 254, 209);
      line-height: 0.5;
      text-align: center;
      z-index: 26;
    }

    .boxza-bg {
      position: absolute;
    }

    .button-top-up {
      height: 40px !important;
      width: 90px !important;
      margin-right: 10px;
      margin-top: 5px;
      text-decoration: none;
      @include button(#3a9b9b, #00daf0);

      &:hover {
        @include button(#338787, #04c0d3);
      }
    }

    .button-register {
      margin-right: 50px;
      margin-top: 5px;
      height: 40px;
      width: 150px;
      @include button(#5e3a74, #ff00ba);

      &:hover {
        @include button(#5c3872, #da009f);
      }
    }

    .profile-img {
      margin-right: 10px;
      margin-top: 8px;
      cursor: pointer;
    }
  }

  .counter-text {
    @include fontNav(17px, bold, white, normal);

    &:hover {
      background-color: rgba(6, 184, 242, 0.5);
      border-radius: 17px;
      padding: 5px;
      cursor: pointer;
    }
  }

  .coin-text {
    height: 20px;
    margin-right: 10px;
    margin-top: 15px;
    @include fontNav(17px, bold, white, normal);

    &:hover {
      background-color: rgba(6, 184, 242, 1);
      border-radius: 17px;
      padding: 2px;
      cursor: pointer;
    }
  }

  .coin-text-2 {
    height: 20px;
    margin-right: 33px;
    margin-top: 15px;
    @include fontNav(17px, bold, white, normal);

    &:hover {
      background-color: rgba(6, 184, 242, 1);
      border-radius: 17px;
      padding: 2px;
      cursor: pointer;
    }
  }

  .sub-menu-box {
    height: 40px;
    align-items: right;
    display: flex;

    .sub-menu {
      margin: 5px auto;
      width: fit-content;
      font-size: 34px;
      font-family: "DB Helvethaica X Bd Cond";
      color: rgb(255, 255, 255);
      text-transform: uppercase;
      line-height: 1.2;
      text-align: center;
      transform: matrix(0.75765864332604, 0, 0, 0.75903614457831, 0, 0);

      &:hover {
        cursor: pointer;
      }

      .menu-text {
        border-radius: 16.32px;
        padding-left: 10px;
        padding-right: 10px;

        &:hover {
          background-color: rgba(6, 184, 242, 0.5);
          cursor: pointer;
        }
      }

      .active-menu {
        background-color: rgba(6, 184, 242, 0.5);
        border-radius: 16.32px;
        padding-left: 10px;
        padding-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

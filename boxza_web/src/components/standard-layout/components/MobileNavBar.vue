<template>
  <div>
    <div>
      <AlertBox ref="alertBox" />
      <registerModal ref="loginmain" v-if="openRegisterModal" v-on:dialog="openRegisterModal = $event" />
      <profileModal v-if="openProfileModal" v-on:dialog="openProfileModal = $event.dialog" />
    </div>
    <div id="mobileNavBar">
      <v-row justify="start">
        <v-col>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="150px" height="55px">
            <defs>
              <filter filterUnits="userSpaceOnUse" id="Filter_99" x="0px" y="0px" width="150px" height="82px">
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
              <linearGradient id="PSgrad_99" x1="0%" x2="0%" y1="100%" y2="0%">
                <stop offset="0%" stop-color="rgb(3,195,199)" stop-opacity="1" />
                <stop offset="100%" stop-color="rgb(27,247,224)" stop-opacity="1" />
              </linearGradient>
            </defs>
            <g filter="url(#Filter_99)">
              <path fill-rule="evenodd" fill="url(#PSgrad_99)" d="M0.000,0.000 L135.000,0.000 L110.000,50.000 L0.000,50.000 L0.000,0.000 Z" />
            </g>
            <image x="15" y="10" max-width="100px" max-height="3px" :href="require('~/assets/images/icon/logo.png')" :lazy-href="require('~/assets/images/icon/logo.png')" />
          </svg>
        </v-col>
        <v-col lg="2" md="4" sm="6">
          <v-spacer />
        </v-col>
        <v-col>
          <v-spacer />
        </v-col>
        <v-col>
          <v-spacer />
        </v-col>
        <v-col>
          <v-spacer />
        </v-col>
        <v-col>
          <v-btn icon v-if="!isLogin" style="margin: 10px; padding: 5px;" @click.stop="openRegisterModalFunc">
            <v-icon>mdi-key-variant</v-icon>
          </v-btn>
        </v-col>
        <v-col />
        <v-col>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="150px" height="55px" style="right: -5px; position: absolute; z-index: -1;">
            <defs>
              <filter filterUnits="userSpaceOnUse" id="Filter_33" x="0px" y="0px" width="150px" height="82px">
                <feOffset in="SourceAlpha" dx="-1.69" dy="2.625" />
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
              <linearGradient id="PSgrad_33" x1="0%" x2="0%" y1="100%" y2="0%">
                <stop offset="0%" stop-color="rgb(3,195,199)" stop-opacity="1" />
                <stop offset="100%" stop-color="rgb(27,247,224)" stop-opacity="1" />
              </linearGradient>
            </defs>
            <g filter="url(#Filter_33)">
              <path fill-rule="evenodd" fill="url(#PSgrad_33)" d="M0.000,0.000 L160.000,0.000 L160.000,50.000 L20.000,50.000 L0.000,0.000 Z" />
            </g>
          </svg>
          <v-menu offset-y open-on-click>
            <template v-slot:activator="{ on }">
              <v-avatar class="profile-img" size="36" v-on="on" v-if="isLogin" @click.stop="openmenu()" style="margin-right: 25px; margin-top: 10px;">
                <img :src="userProfile.userPic" :alt="userProfile.username">
              </v-avatar>
              <v-row v-else>
                <v-btn icon v-on="on" style="margin-right: 25px; margin-top: 10px;" @click.stop="openmenu()">
                  <v-icon v-if="!openMobileMenu">mdi-menu</v-icon>
                  <v-icon v-else>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </template>
            <v-list>
              <v-list-item v-if="isLogin" @click="openProfileModal = true">
                <v-list-item-icon>
                  <img width="25px" height="16px" :src="require('~/assets/images/icon/account.png')">
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>แก้ไขข้อมูลส่วนตัว</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-for="(item, index) in menuList" :key="index" @click="redirect(item.path)">
                <v-list-item-icon>
                  <img :src="item.icon">
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.menuName" />
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="isLogin" @click="logout">
                <v-list-item-icon>
                  <img width="25px" height="16px" :src="require('~/assets/images/icon/exit.png')">
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>ออกจากระบบ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
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
    name: "MobileNavBar",
    directives: {
        "click-outside": {
            bind: function (el, binding, vNode) {
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
            unbind: function (el, binding) {
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
            openMobileMenu: false,
            collapseOnScroll: true,
            userProfile: {},
            menuList: [{
                    menuName: "กล่องทั้งหมด",
                    pathName: "dash-board",
                    path: "/dash-board",
                    icon: require('~/assets/images/icon/semantic-web.png'),
                    show: 1
                },
                {
                    menuName: "วิธีเล่น",
                    pathName: "about",
                    path: "/how-to-play",
                    icon: require('~/assets/images/icon/play.png'),
                    show: 1
                },
                {
                    menuName: "เกี่ยวกับ",
                    pathName: "about",
                    path: "/about",
                    icon: require('~/assets/images/icon/domain.png'),
                    show: 1
                }
            ]
        };
    },
    watch: {
        openRegisterModal: function () {
            const vm = this;
            vm.checkAuth();
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        showAlert: function (value) {
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
        checkAuth() {
            const vm = this;
            if (vm.$store.getters["auth/getProfile"]) {
                vm.isLogin = true;
                vm.userProfile = vm.$store.getters["auth/getProfile"];
            } else {
                vm.isLogin = false;
            }
        },
        openmenu() {
            this.openMobileMenu = !this.openMobileMenu;
        },
        dologin: function (value) {
            // this.showlogin()
            this.openRegisterModal = true;
            this.$nextTick(() => {
                this.$refs.loginmain.loginFlag = true;
                // console.log(this.$refs)
            });
        },
        logout: function () {
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
        getUserId() {
            return this.$store.getters["auth/getProfile"].id;
        },
        closeEvent: function () {
            const vm = this;
            vm.openMobileMenu = false;
        },
        openRegisterModalFunc: function () {
            const vm = this;
            vm.openMobileMenu = false;
            vm.openRegisterModal = true;
            vm.$nextTick(() => {
                vm.$refs.loginmain.loginFlag = true;
                // console.log(this.$refs)
            });
            // vm.openMobileMenu = false
            // vm.openRegisterModal = true
        },
        redirect(path) {
            const vm = this;
            vm.openMobileMenu = false;
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
        }
    }
};
</script>

<style lang="scss" scoped>
@mixin fontNav($size, $weight, $color, $style) {
    font-family: "Prompt-Regular";
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
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to top right, $colorOne, $colorTwo);
    border-radius: 2px;
}

#mobileNavBar {
    left: 0px;
    width: 100%;
    height: 50px;
    z-index: 2;

    .icon-boxza {
        position: absolute;
    }

    .col {
        padding: 0px;
    }
}
</style>

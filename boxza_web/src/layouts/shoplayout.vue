<template>
  <v-app dark id="inspire">
    <registerModal
      ref="loginmain"
      v-if="openRegisterModal"
      v-on:dialog="openRegisterModal = $event"
    />
    <v-container fluid ref="navbar_main" :class="[ 'navbar__main', isscroll ? 'navbar__mainfix' : '' ]">
      <v-container mobile class="content">
        <ul class="menu">
          <li class="logo">
            <v-img
              width="80%"
              :src="require('~/assets/images/icon/logo.png')"
            />
          </li>
          <template>
            <li
              v-for="(item, index) in menuList"
              :key="index"
              class="button__menu hidden-sm-and-down"
            >
              <div v-if="index > 0" class="vl" />
              <a :href="item.path">{{ item.menuName }}</a>
            </li>
          </template>
          <li class="_mobile hidden-md-and-up">
            <v-app-bar-nav-icon />
          </li>
          <li class="_mobile hidden-sm-and-down">
            <v-btn class="button-register" v-if="!isLogin" @click="dologin($event)">
              <span class="button-text">เข้าสู่ระบบ</span>
            </v-btn>
          </li>
        </ul>
      </v-container>
    </v-container>
    <v-container class="content">
      <nuxt />
    </v-container>
    <v-footer absolute class="font-weight-medium">
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import registerModal from "~/components/standard-layout/components/RegisterAndLoginModal";
export default {
  components: { registerModal },
  props: {
    source: String
  },
  data: () => ({
    drawer: true,
    isLogin: false,
    isscroll: false,
      openRegisterModal: false,
      openProfileModal: false,
      openProfileRouter: false,
      userProfile: {},
    menuList: [
      {
        menuName: "หน้าแรก",
        pathName: "dash-board",
        path: "./shop"
      },
      {
        menuName: "สินค้า",
        pathName: "dash-board",
        path: "#main"
      },
      {
        menuName: "HOT",
        pathName: "how-to-play",
        path: "#hot"
      },
      {
        menuName: "วิธีการชำระเงิน",
        pathName: "about",
        path: "/about"
      },
      {
        menuName: "เกี่ยวกับเรา",
        pathName: "about",
        path: "/about"
      }
    ]
  }),
  mounted () {
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
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
    dologin: function(value) {
      // this.showlogin()
      this.openRegisterModal = true;
      this.$nextTick(() => {
        this.$refs.loginmain.loginFlag = true;
        // console.log(this.$refs)
      });
    },
    handleScroll (e) {
      if (window.scrollY > 1) {
        this.isscroll = true;
      } else {
        this.isscroll = false;
      }
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

@mixin bg($colorOne, $colorTwo) {
  display: flex;
  background: linear-gradient(to top, $colorOne, $colorTwo);
  border-radius: 0px;
}
@mixin button($colorOne, $colorTwo) {
  color: white;
  display: flex;
  cursor: pointer;
  background: linear-gradient(to top, $colorOne, $colorTwo);
  border-radius: 0px;
}
#inspire {
    background: url("~@/assets/images/bg.png") repeat center center;
    height: auto;
}

.content {
  max-width: 1300px;
}
.navbar__mainfix {
  position: sticky;
  top: 0;
  z-index: 99;
  box-shadow: 46px 31px 28px -16px rgba(0,0,0,0.53);
}
.navbar__main {
  max-height: 5rem;
  justify-content: center;
  @include bg(rgb(31, 8, 94), rgb(76, 22, 224));
  .button-register {
      margin-top: -2px;
      margin-right: 10px;
      height: 40px;
      width: 150px;
      @include button(#5e3a74, #ff00ba);

      &:hover {
        @include button(#5c3872, #da009f);
      }
  }
  .menu {
    margin-top: -1px;
    padding: 0px;
    list-style-type: none;
    a {
      color: #fff;
    }
    li {
      float: left;
    }
    .logo {
      margin-top: 0.5rem;
      margin-right: 30px;
      color: #fff;
    }
    ._mobile {
      position: absolute;
      margin-top: 0.2rem;
      right: 30px;
      color: #fff;
      i{
        color: #fff !important;
      }
    }
    .button__menu {
      margin-top: 0.5rem;
      margin-left: 0rem;
      margin-right: 1.5rem;
      color: #fff;
      .vl {
        position: absolute;
        margin-top: 5px;
        margin-left: -10px;
        border-left: 0.5px solid rgb(255, 255, 255);
        height: 15px;
      }
    }
  }
}
</style>

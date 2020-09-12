<template>
  <nav id="navBar">
    <div ref="heightbar" class="row-test">
      <DesktopNavBar class="is-hidden-mobile" />
      <MobileNavBar class="is-hidden-tablet" />
    </div>
  </nav>
</template>

<script>
import DesktopNavBar from "~/components/standard-layout/components/DesktopNavBar";
import MobileNavBar from "~/components/standard-layout/components/MobileNavBar";
export default {
  name: "NavBar",
  components: {
    DesktopNavBar,
    MobileNavBar
  },
  data() {
    return {
      openRegisterModal: false,
      isLogin: false,
      openMobileMenu: false,
      slide: 0,
      sliding: null,
      checkFirst: true,
      boxcount: "0",
      usercount: "0",
      total: "",
      heightbar: 0,
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
      rewardList: []
    };
  },
  watch: {},
  created() {
  },
  mounted() {
    this.getheight()
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getheight() {
      this.heightbar = this.$refs.heightbar.clientHeight;
    },
    getLuckyUser() {
      const vm = this;
      vm.$axios
        .$get("/general/lucky-user")
        .then(res => {
          vm.checkFirst ? "" : (vm.$nuxt.$loading.show = false);
          vm.checkFirst = false;
          vm.rewardList = res.data.lucky_user;
          vm.boxcount = res.data.boxcount[0].boxcount;
          vm.total = res.data.boxcount[0].total;
          vm.usercount = res.data.usercount[0].users_total;
        })
        .catch(e => {
          console.log(e.message);
        });
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
@mixin bgcolorall($colorOne, $colorTwo) {
  background: linear-gradient(to top right, $colorOne, $colorTwo);
}
.bg-reward {
  background: -webkit-linear-gradient(
    180deg,
    rgb(31, 8, 94) 0%,
    rgb(31, 8, 94) 50%,
    rgb(76, 22, 224) 100%
  );
}
.main-reward {
  .icon-reward-st {
    position: absolute;
    left: 400px;
    bottom: 260px;
  }
  .bg-reward-st {
    position: absolute;
    height: 300px;
    width: 440px;
  }
}
.test-reward {
  position: fixed;
  top: 0px;
  left: calc(50% - 200px);
  z-index: 99;
}
#reward {
  overflow: hidden;
  .nav-mobile {
    position: absolute;
    z-index: 30;
  }
  .main-box {
    float: left;
    border-radius: 12px;
    position: relative;
    #item-sd {
      margin-top: 15px;
      margin-left: 15px;
      margin-right: 8px;
      margin-bottom: 10px;
      .icon-reward {
        position: absolute;
        top: 20px;
        left: 30px;
        width: 35px;
        transition: -webkit-transform 0.2s linear 0.1s;
      }
      .icon-avatar {
        position: absolute;
        border-radius: 50%;
        top: 180px;
        right: 2px;
        width: 33px;
        height: 32px;
      }
      .icon-item {
        position: absolute;
        top: 10px;
        transform: matrix(0.8, 0, 0, 0.8, 0, 0);
        left: calc(50% - 88px);
      }
      .Price {
        top: 200px;
        left: calc(50% - 15px);
        border-radius: 10px;
        background-color: rgb(255, 73, 49);
        width: 60px;
        height: 18px;
      }
      #box-pic {
        opacity: 0;
        transition: opacity 0.5s linear 1s;
        transition: transform 0.2s linear 0.1s;
        top: 20px;
        transform: matrix(0.8, 0, 0, 0.8, 0, 0);
        left: calc(50% - 82px);
      }
      &:hover {
        cursor: pointer;
        #box-pic {
          display: inline-block;
          opacity: 1;
          transform: matrix(1, 0, 0, 1, 0, 0);
        }
        #item-pic {
          opacity: 0;
          transform: matrix(0.3, 0, 0, 0.3, 0, 0);
        }
        .icon-reward {
          transform: matrix(1, -0.2, 0.2, 1, 0, 0);
        }
      }
    }
    #item-st {
      transform: matrix(1.1, -0, 0, 1.1, 0, 0);
      width: 380px;
      margin-top: 15px;
      margin-left: 50px;
      margin-right: 35px;
      margin-bottom: 10px;
    }
    #box-pic {
      opacity: 0;
      transition: opacity 0.5s linear 1s;
      transition: transform 0.5s linear 0.2s;
      top: 10px;
      left: calc(50% - 110px);
    }
    #item-pic {
      opacity: 1;
      transition: opacity 0.1s linear 0.2s;
    }
    &:hover {
      cursor: pointer;
      #box-pic {
        display: inline-block;
        opacity: 1;
        transform: matrix(1.2, 0, 0, 1.2, 0, 0);
      }
      #item-pic {
        opacity: 0;
        transform: matrix(0.8, 0, 0, 0.8, 0, 0);
      }
      .icon-reward {
        transform: matrix(1, -0.2, 0.2, 1, 0, 0);
      }
    }
    .overlay {
      max-width: 351px;
    }
    .reward-bg {
      width: 100%;
      height: 100%;
    }
    .icon-reward {
      position: absolute;
      top: 10px;
      left: 15px;
      transition: -webkit-transform 0.2s linear 0.1s;
    }
    .icon-avatar {
      position: absolute;
      border-radius: 50%;
      top: 140px;
      right: 15px;
      width: 55px;
      height: 52px;
    }
    .icon-item {
      position: absolute;
      left: calc(50% - 120px);
    }
  }
  .Price {
    font-size: 17px;
    font-family: "DB Helvethaica X Bd Cond";
    color: rgb(255, 255, 255);
    text-transform: uppercase;
    line-height: 1.2;
    text-align: center;
    position: absolute;
    top: 170px;
    left: calc(50% - 41px);
    border-radius: 10px;
    background-color: rgb(255, 73, 49);
    width: 60px;
    height: 17px;
  }
}
.row-test {
}
.carousel-img {
  height: 50vh;
  width: 100vw;
  margin-left: 0vw;
}
.carousel-up {
}
#navBar {
  position: relative;
  width: 100%;
  height: "0.08in";
  .row-img-box {
    width: 100%;
    height: 190px;
    overflow: hidden;
  }
  // background-size: 100% 100%;
}
@media (max-width: 767px) {
  .card-img {
    height: 100px;
  }
  .user-reward:nth-child(1) {
    margin-right: 0px !important;
  }
  .user-reward:nth-child(4) {
    margin-right: 10px;
  }
  .icon-hover {
    width: 18px;
    margin-left: -10px;
    margin-top: 0 !important;
  }
  .col-3 {
    padding-right: 0;
  }
  .hide-box-mobile {
    display: none;
  }
  .big-avatar {
    width: 7vw !important;
    height: 7vw !important;
    min-width: 7vw !important;
  }
  .small-avatar {
    width: 5vw !important;
    height: 5vw !important;
    min-width: 5vw !important;
  }
  .show-user-reward-box {
    .small-img {
      max-width: 24.2%;
      .icon-hover {
        margin-top: 5px !important;
        margin-right: -5px !important;
      }
      .icon-hover,
      .username-hover {
        top: 24px;
        font-size: 1.2vw !important;
      }
      .hover-profile {
        display: flex;
        margin-top: -10px;
      }
      .user-pic-hover {
        margin-top: -10px !important;
      }
    }
    .big-img {
      .hover-profile {
        margin-top: -12px;
      }
    }
    .icon-hover {
      margin-top: 6px;
      margin-right: -5px;
    }
    .icon-hover,
    .username-hover {
      top: 24px;
      font-size: 1.2vw !important;
    }
    .user-pic-hover {
      width: 40%;
      max-height: 30px;
    }
    .first-child-user-pic-hover {
      max-height: 50% !important;
      width: 60% !important;
      margin-top: -10px !important;
    }
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .user-reward-col:nth-child(6) {
    margin-right: 12px;
  }
  .hide-box-tablet {
    display: none;
  }
  .show-user-reward-box {
    .small-img {
      max-width: 15%;
    }
    .icon-hover,
    .username-hover {
      top: 24px;
      font-size: 1vw !important;
    }
    .user-pic-hover {
      width: 50% !important;
      height: 40% !important;
    }
    .first-child-user-pic-hover {
      max-height: 45% !important;
      max-width: 60% !important;
    }
  }
}
@media (min-width: 1025px) {
  .show-user-reward-box {
    .small-img {
      max-width: 13%;
    }
  }
}
@media only screen and (min-width: 1264px) {
  .show-user-reward-box {
  }
}
@media only screen and (min-width: 1440px) {
  .show-user-reward-box {
  }
}
@media (min-width: 2561px) {
  .show-user-reward-box {
    .small-img {
      max-width: 15%;
    }
  }
}
</style>
<style lang="scss">
#navBar {
  .v-list-item__title {
    display: flex;
    padding: 0 5px;
    justify-content: center;
  }
  .v-toolbar__content {
  }
  #imageSlide {
    position: fixed;
    top: 25px;
    right: 0;
    left: 0;
    height: 600px;
    max-width: 550px !important;
  }
}
</style>
<style lang="scss">
img.img-fluid.w-100.d-block {
  width: auto !important;
}
</style>

<template>
  <nav id="navBar">
    <div class="row-test">
    <DesktopNavBar class="is-hidden-mobile" />
    <MobileNavBar class="is-hidden-tablet" />
    </div>
    <div>
    <b-carousel
      id="carouselBox"
      v-model="slide"
      :interval="4000"
      controls
      background="#ababab"
      img-height="100%"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      class="carousel-up"
    >
        <template v-for="slideShow in slideShowList">
          <b-carousel-slide>
            <template v-slot:img>
                <img
                class="carousel-img"
                :src="slideShow.imgPath"
                alt="image slot">
            </template>
          </b-carousel-slide>
        </template>
    </b-carousel>
    </div>
    <div class="show-user-reward-box container">
      <div class="row row-img-box">
        <template v-for="(item, index) in rewardList">
          <div class="col-4 col-sm-3 col-md-3 col-img-box user-reward" v-if="index === 0">
            <div class="image-16-9">
              <span class="image-wrap">
                <img v-if="item.item_pic_2" :src="item.item_pic_2">
                <img v-else src="~@/assets/images/no-image.png">
                <v-avatar v-if="index === 0" class="big-avatar user-avatar" size="2.3vw">
                  <img v-if="item.user_pic" :src="item.user_pic">
                  <img v-else src="~@/assets/images/icon/account.png">
                </v-avatar>
                <div class="when-hover-user-reward">
                  <v-list-item class="hover-user-reward m-3">
                    <v-list-item-content class="hover-user-reward-content">
                      <v-list-item-title class="hover-profile">
                        <v-icon class="icon-hover">mdi-account</v-icon>
                        <span class="username-hover">{{ item.username }}</span>
                      </v-list-item-title>
                      <div class="user-pic-hover" :class="{'first-child-user-pic-hover': index === 0}">
                        <img v-if="item.user_pic" :src="item.user_pic">
                        <img v-else src="~@/assets/images/icon/account.png">
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </span>
            </div>
          </div>
          <div class="col col-img-box-4-3 user-reward" :class="{'hide-box-mobile': index >= 4, 'hide-box-tablet': index >= 6, 'one-box': rewardList.length === 1}" v-if="index > 0">
            <div class="image-4-3">
              <span class="image-wrap">
                <img v-if="item.item_pic_2" :src="item.item_pic_2">
                <img v-else src="~@/assets/images/no-image.png">
                <v-avatar class="small-avatar user-avatar" size="1.6vw">
                  <img v-if="item.user_pic" :src="item.user_pic">
                  <img v-else src="~@/assets/images/icon/account.png">
                </v-avatar>
              </span>
              <div class="when-hover-user-reward">
                <v-list-item class="hover-user-reward mt-3">
                  <v-list-item-content class="hover-user-reward-content">
                    <v-list-item-title class="hover-profile">
                      <v-icon class="icon-hover">mdi-account</v-icon>
                      <span class="username-hover">{{ item.username }}</span>
                    </v-list-item-title>
                    <div class="user-pic-hover" :class="{'first-child-user-pic-hover': index === 0}">
                      <img v-if="item.user_pic" :src="item.user_pic">
                      <img v-else src="~@/assets/images/icon/account.png">
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
  import DesktopNavBar from '~/components/standard-layout/components/DesktopNavBar'
  import MobileNavBar from '~/components/standard-layout/components/MobileNavBar'

  export default {
    name: 'NavBar',
    components: {
      DesktopNavBar,
      MobileNavBar
    },
    data () {
      return {
        openRegisterModal: false,
        isLogin: false,
        openMobileMenu: false,
        slide: 0,
        sliding: null,
        checkFirst: true,
        slideShowList: [
          { id: 1, imgPath: 'http://157.230.45.37:3000/image/slides/slide-1.png' },
          { id: 2, imgPath: 'http://157.230.45.37:3000/image/slides/slide-2.png' },
          { id: 3, imgPath: 'http://157.230.45.37:3000/image/slides/slide-3.png' },
          { id: 4, imgPath: 'http://157.230.45.37:3000/image/slides/slide-4.png' },
          { id: 5, imgPath: 'http://157.230.45.37:3000/image/slides/slide-5.png' }
        ],
        rewardList: []
      }
    },
    watch: {
    },
    created() {
      this.getLuckyUser()
    },
    mounted () {
      setInterval(() => {
        this.getLuckyUser()
      }, 5000)
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true;
      },
      onSlideEnd(slide) {
        this.sliding = false;
      },
      getLuckyUser () {
        const vm = this
        vm.$axios.$get('/general/lucky-user')
          .then((res) => {
            vm.checkFirst ? '' : vm.$nuxt.$loading.show = false
            vm.checkFirst = false
            vm.rewardList = res.data.lucky_user
          })
          .catch((e) => {
            console.log(e.message)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row-test{
  }
  .carousel-img{
  height: 55vh;
  width: 100vw;
  object-fit: cover;
  }
  .carousel-up{
  }
  @mixin fontNav($size, $weight, $color, $style) {
    font-family: 'Prompt-Regular';
    font-size: $size;
    font-weight: $weight;
    font-style: $style;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: $color;
  }
   @mixin bgcolor($colorOne, $colorTwo) {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to top right, $colorOne, $colorTwo);
    border-radius: 2px;
  }
  #navBar {
    position: relative;
    min-height: 50vh;
    height: 50vh;
    width: 100%;
    // background-size: 100% 100%;
    .show-user-reward-box {
      position: absolute;
      max-width: 100% !important;
      width: 100%;
      /*height: 45%;*/
      @include bgcolor(#4d0099, #000080);
      height: calc(100% - 28vh);
      bottom: 0;
      left: 0;
      right: 0;
      .row-img-box {
        height: 100%;
        width: 100%;
        .col-img-box-4-3 {
          height: 70%;
          margin-left: 10px;
          margin-top: auto;
          .image-4-3 {
            height: 100%;
            .image-wrap {
              padding-top: 75%;
              height: 100%;
              display: block;
            }
            img {
              position: absolute;
              height: 100%;
              width: 100%;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              object-fit: cover;
            }
          }
        }
        .col-img-box {
          height: 100%;
          margin-left: 10px;
          margin-right: 20px;
          .image-16-9 {
            height: 100%;
            .image-wrap {
              padding-top: 56.25%;
              height: 50%;
              display: block;
            }
            img {
              position: absolute;
              height: 50%;
              width: 50%;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              object-fit: cover;
            }
          }
        }
      }
      .seven-cols {
        height: 100%;
      }
      /*.seven-cols .col-md-1,
      .seven-cols .col-sm-1,
      .seven-cols .col-lg-1,
      .seven-cols .col-xl-1 {
        min-width: 10.285714%;
        *min-width: 14.285714285714285714285714285714%;
      }*/
      .space-box {
        width: 100%;
        height: 30%;
      }
      .user-reward {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        border-radius: 15px;
        &:hover {
          .when-hover-user-reward {
            cursor: pointer;
            transform: translate(0, 0);
            transition: all 0.2s ease-in;
          }
        }
        .user-avatar {
          position: absolute;
          bottom: 6px;
          right: 8px;
        }
        .when-hover-user-reward {
          margin-left: -12px;
          word-break: break-word;
          border-radius: 15px;
          width: 100%;
          height: 102%;
          position: absolute;
          box-sizing: border-box;
          bottom: -1px;
          transform: translate(0, 100%);
          /*padding: 0 15px;*/
          background-color: rgba(255, 255, 255, 0.9);
          text-align:center;
          transition: all 0.2s ease-in;
          .hover-user-reward {
            padding: 0;
            height: 100%;
            .hover-user-reward-content {
              padding: 0;
              height: 100%;
              align-items: stretch !important;
              .icon-hover {
                font-size: 0.8vw;
                color: #37505c;
                //margin-top: -3px;
              }
              .username-hover {
                top: 24px;
                font-size: 0.6vw;
                color: #37505c;
                font-weight: bold;
                font-style: italic;
                max-width: 100%;
                line-height: 1.3;
                display: block;
                white-space: pre-wrap;
              }
              .user-pic-hover {
                width: 10px;
                padding-top: 100%;
                margin: 10px auto;
                cursor: pointer;
                position: relative;
                img {
                  margin: 10px auto;
                  border-radius: 50%;
                  width: 40%;
                  height: 40%
                }
              }
              .first-child-user-pic-hover {
                height: 60% !important;
                max-width: auto !important;
                overflow: hidden;
              }
            }
          }
        }
      }
      .user-reward-col {
        /*margin: auto;*/
      }
      .one-box {
        margin: 0 !important;
      }
      .user-reward-col:last-child {
        margin-right: 12px;
      }
      .small-img {
        height: 100%;
        position: relative;
        .img-reward {
          bottom: 0;
          position: absolute;
          border-radius: 15px;
        }
      }
      .col-3 {
        height: 100%;
        /*margin-left: auto;*/
      }
      .sub-box {
        height: 70% !important;
      }
      .item-box {
        position: relative;
        .img-reward {
        }
      }
    }
  }
  @media (max-width: 767px) {
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
        .icon-hover, .username-hover {
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
      .icon-hover, .username-hover {
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
      .icon-hover, .username-hover {
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
  @media only screen and (min-width: 1264px){
    .show-user-reward-box {
    }
  }
  @media only screen and (min-width: 1440px){
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
      #carouselBox {
        height: 100%;
        background: transparent !important;
        .carousel-inner {
          display: flex;
          justify-content: center;
          height: 100%;
          .carousel-item {
            margin: 0;
            height: 100%;
            background: transparent !important;
            img {
              height: 100%;
            }
          }
        }
      }
      ol#carouselBox___BV_indicators_ {
      }
      .carousel-indicators .active {
        background-color: #686868;
      }
      .carousel-indicators li {
        width: 10px;
        height: 10px;
        opacity: 1;
        background-color: white;
        border-radius: 100%;
      }
    }
    @media (max-width: 1530px) {
      #imageSlide {
        top: 60px !important;
      }
    }
    @media (max-width: 499px) {
      #imageSlide {
        top: 50px !important;
        ol#carouselBox___BV_indicators_ {
          padding-left: 0px !important;
          bottom: -20px !important;
        }
        .carousel-indicators li {
          width: 2vw;
          height: 2vw;
          border-radius: 100%;
        }
      }
      .show-user-reward-box {
        height: calc(100% - 35vh) !important;
      }
    }
    @media only screen and (min-width: 500px) and (max-width: 767px) {
      #imageSlide {
        top: 50px !important;
        ol#carouselBox___BV_indicators_ {
          padding-left: 0px !important;
          bottom: -20px !important;
        }
        .carousel-indicators li {
          width: 1.5vw;
          height: 1.5vw;
          border-radius: 100%;
        }
      }
      .show-user-reward-box {
        height: calc(100% - 35vh) !important;
      }
    }
    @media (width: 768px) {
      #imageSlide {
        top: 43px !important;
        .carousel-indicators li {
          width: 1.2vw;
          height: 1.2vw;
          border-radius: 100%;
        }
      }
      .show-user-reward-box {
        height: calc(100% - 34vh) !important;
      }
    }
    @media only screen and (min-width: 768px) and (max-width: 1303px) {
      #imageSlide {
        top: 60px !important;
        .carousel-indicators li {
          width: 1.2vw;
          height: 1.2vw;
          border-radius: 100%;
        }
      }
      .show-user-reward-box {
        height: calc(100% - 35vh) !important;
      }
    }
    @media only screen and (min-width: 1050px) and (max-width: 1530px) {
      #imageSlide {
        top: 60px !important;
        .carousel-indicators li {
          width: 0.8vw;
          height: 0.8vw;
          border-radius: 100%;
        }
      }
      .show-user-reward-box {
        height: calc(100% - 35vh) !important;
      }
    }
  }
</style>
<style lang="scss">
  img.img-fluid.w-100.d-block {
    width: auto !important;
  }
</style>

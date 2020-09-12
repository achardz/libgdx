<template>
  <v-app id="boxzaSystem">
    <registerModal
      v-if="openRegisterModal"
      v-on:dialog="openRegisterModal = $event"
    />
    <client-only id="webSiteNavBar">
      <navBar ref="navbar" />
    </client-only>
    <v-container fluid>
      <v-container fluid id="scrolling-techniques">
        <client-only>
          <v-container fluid>
            <v-carousel
              cycle
              ref="banneranz"
              hide-delimiter-background
              class="banneraa"
              height="auto"
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(slide, i) in slideShowList"
                class="banneraa"
                :src="slide.imgPath"
                :key="i"
              >
              </v-carousel-item>
            </v-carousel>
          </v-container>
          <v-container fluid id="howToPlay" class="is-hidden-touch is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only">
            <v-row style="background: yellow; width: 100%; margin: 0px;">
              <nuxt-link class="title-method-box" to="/how-to-play"
                >วิธีเล่น</nuxt-link
              >
              <ul style="display:flex; list-style:none; padding: 10px;">
                <li></li>
                <li>
                  <img
                    id="imageRegister"
                    class="footer-icon"
                    src="~@/assets/images/icon/account.png"
                    alt="imageRegister"
                  /><span
                    class="detail-regis-text"
                    @click="openRegisterModal = true"
                    >สมัครสมาชิก</span
                  >
                </li>
                <li>
                  <span>ผ่านอีเมลหรือเครือข่ายสังคม</span>
                  <img
                    id="imageDotOne"
                    src="~@/assets/images/icon/dot.png"
                    alt="imageDotOne"
                  />
                </li>
                <li>
                  <img
                    id="imagToUp"
                    class="footer-icon"
                    src="~@/assets/images/icon/topup.png"
                    alt="imagToUp"
                  />
                </li>
                <li><span>เติมเงินจำนวนเพียงพอที่จะเปิดกล่อง</span></li>
                <li>
                  <img
                    id="imageDotTwo"
                    src="~@/assets/images/icon/dot.png"
                    alt="imageDotTwo"
                  />

                  <img
                    id="imageBox"
                    class="footer-icon"
                    src="~@/assets/images/icon/box.png"
                    alt="imageBox"
                  />
                </li>
                <li>
                  <span>เลือกกล่องที่ต้องการและกดปุ่ม "เปิด"</span>
                </li>
              </ul>
            </v-row>
          </v-container>
        </client-only>
        <client-only>
          <article id="bodyContent">
            <nuxt />
          </article>
        </client-only>
        <ChatBox v-if="this.$store.getters['auth/getProfile']" />
        <client-only
          v-if="!this.$store.getters['auth/getProfile']"
          id="register-bar"
        >
          <registerBar />
        </client-only>
      </v-container>
    </v-container>
    <client-only id="footer">
        <Footer />
      </client-only>
  </v-app>
</template>

<script>
import navBar from "~/components/standard-layout/NavBar";
import registerBar from "~/components/standard-layout/RegisterBar";
import Footer from "~/components/standard-layout/Footer";
import ChatBox from "~/components/dash-board/ChatBox";
import registerModal from "~/components/standard-layout/components/RegisterAndLoginModal";
import "./css/defaultcss.scss";

export default {
  name: "BodyPage",
  scrollToTop: true,
  loading: true,
  components: {
    ChatBox,
    navBar,
    registerBar,
    Footer,
    registerModal
  },
  data() {
    return {
      openRegisterModal: false,
      Login: false,
      isLogin: false,
      openMobileMenu: false,
      slide: 0,
      sliding: null,
      checkFirst: true,
      boxcount: "0",
      usercount: "0",
      total: "",
      windowTop: 0,
      slideShowList: [
        {
          id: 1,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/1.jpg"
        },
        {
          id: 2,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/2.jpg"
        },
        {
          id: 3,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/3.jpg"
        },
        {
          id: 4,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/4.jpg"
        },
        {
          id: 5,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/4.jpg"
        }
      ],
      rewardList: []
    };
  },
  watch: {},
  created() {},
  destroyed() {},
  mounted() {},
  beforemounted() {},
  methods: {
    onScroll(e) {
      console.log(e);
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    }
  }
};
</script>

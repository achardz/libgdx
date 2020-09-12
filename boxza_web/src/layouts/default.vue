<template>
  <v-app id="boxzaSystem">
    <client-only id="webSiteNavBar">
      <navBar ref="navbar" />
    </client-only>
    <registerModal
      v-if="openRegisterModal"
      v-on:dialog="openRegisterModal = $event"
    />
    <v-container fluid id="scrolling-techniques">
      <client-only>
        <article id="bodyContent">
          <nuxt />
        </article>
      </client-only>
      <ChatBox v-if="this.$store.getters['auth/getProfile']" />
    </v-container>
    <client-only id="footer">
      <Footer />
    </client-only>
  </v-app>
</template>

<script>
import navBar from "~/components/standard-layout/NavBar";
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
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/dash-board", icon: "mdi-home" },
        { title: "Sign Up", path: "/signup", icon: "mdi-face" },
        { title: "Sign In", path: "/signin", icon: "mdi-lock_open" }
      ],
      rewardList: []
    };
  },
  watch: {},
  created() {},
  destroyed() {},
  mounted() {},
  beforemounted() {
    this.$refs.banneranz.style.height = "500vw";
  },
  methods: {
    onScroll() {
      console.log("asdasdasds");
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

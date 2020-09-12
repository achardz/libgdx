<template>
  <v-container fluid id="navBar">
    <div class="row-test">
      <DesktopNavBar class="is-hidden-mobile" />
      <MobileNavBar class="is-hidden-tablet" />
    </div>
  </v-container>
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
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  beforeMount() {},
  methods: {}
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

#navBar {
  position: sticky;
  height: 50px;
  .row-test {
    height: 50px;
  }
  // background-size: 100% 100%;
}
</style>

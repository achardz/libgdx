<template>
  <section id="welcome">
  </section>
</template>

<script>
export default {
  name: "Welcome",
  components: {},
  data() {
    return {};
  },
  mounted() {},
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
  line-height: 1.5;
  letter-spacing: normal;
  color: $color;
}
@media (min-width: 767px) {
  #about {
    width: 50%;
    margin-left: 30% !important;
    padding: 10% !important;
    background-color: white;
    border-radius: 4px;
    .about-title {
      @include fontNav(24px, bold, black, normal);
    }
    .about-detail {
      margin-bottom: 10px;
      @include fontNav(16px, normal, black, normal);
    }
  }
}
@media (max-width: 770px) {
  #about {
    padding: 100px;
    background-color: white;
    border-radius: 4px;
    .about-title {
      @include fontNav(24px, bold, black, normal);
    }
    .about-detail {
      margin-bottom: 10px;
      @include fontNav(16px, normal, black, normal);
    }
  }
}
</style>

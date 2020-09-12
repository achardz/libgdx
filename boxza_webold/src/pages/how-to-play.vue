<template>
  <section id="howToPlayContent">
    <div class="columns">
      <div class="column">
        <label class="how-to-play-title">วิธีเล่น</label>
      </div>
    </div>
    <div class="columns">
      <div class="column justify-content-center">
        <img
          src="~/assets/images/how to play boxza.jpg"
          alt="how to play"
          style="width:100%;"
        ></img>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'howToPlayContent',
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
  #howToPlayContent {
    width: 50%;
    margin-left: 30% !important;
    padding: 10% !important;
    background-color: white;
    border-radius: 4px;
    .how-to-play-title {
      @include fontNav(24px, bold, black, normal);
    }
    .about-detail {
      margin-bottom: 10px;
      @include fontNav(16px, normal, black, normal);
    }
  }
}
@media (max-width: 770px) {
  #howToPlayContent {
    padding: 50px;
    background-color: white;
    border-radius: 4px;
    .how-to-play-title {
      @include fontNav(24px, bold, black, normal);
    }
    .about-detail {
      margin-bottom: 10px;
      @include fontNav(16px, normal, black, normal);
    }
  }
}
</style>

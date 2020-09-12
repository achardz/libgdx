<template>
  <section id="TitleBar">
    <div id="mainBoxTitleBar">
      <div id="icon">
        <img :src="imagePath" alt="New Booking" />
      </div>
      <span id="title"> {{ title }} </span>
    </div>
    <div id="line"></div>
  </section>
</template>
<script>
export default {
  name: 'TitleBar',
  components: {},
  data() {
    return {
      image: ''
    };
  },
  props: {
    title: '',
    imagePath: ''
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
#TitleBar {
  margin-top: 8px;
  margin-bottom: 20px;
  #mainBoxTitleBar {
    display: inline-flex;
    margin-bottom: 9px;
    #icon {
      margin-right: 10px;
      img {
        width: 32px;
        height: 32px;
      }
    }
    #title {
      font-family: 'Prompt-Regular', sans-serif;
      font-size: 24px;
      font-weight: 100;
      color: #333333;
      line-height: 30px;
    }
  }
  #line {
    width: 100%;
    height: 2px;
    background-color: #0077cc;
  }
}
</style>

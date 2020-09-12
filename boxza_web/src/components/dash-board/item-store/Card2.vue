<template>
  <div class="main-card">
    <img class="pic-item" :src="post.item_pic">
    <p class="price-item">{{ post.item_price }}</p>
  </div>
</template>
<script>
export default {
    props: {
        post: Object
    },
    data () {
         return {
         }
    },
    computed: {
      itemStyles () {
        return {
        }
      }
    },
    mounted () {
    },
    methods: {
        getSlotItem() {
        }
    }
}
</script>
<style lang="scss" scoped>
  .main-card{
    float: left;
    display: flex;
    background-image: url('~@/assets/images/boxza_reward1.png');
    max-width: 351px;
    padding: 5px;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 10px;
    .price-item {
        font-size: 43px;
        font-family: "Browallia New";
        color: rgb(255, 255, 255);
        text-transform: uppercase;
        line-height: 1.2;
        text-align: center;
        -moz-transform: matrix( 0.4429513881508,0,0,0.44801547615092,0,0);
        -webkit-transform: matrix( 0.4429513881508,0,0,0.44801547615092,0,0);
        -ms-transform: matrix( 0.4429513881508,0,0,0.44801547615092,0,0);
        position: absolute;
        margin-left: 10px;
        margin-bottom: -50px;
    }
    .pic-item {
      width: 190px;
      height: 100%;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>

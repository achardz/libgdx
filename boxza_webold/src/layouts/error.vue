<template>
  <div class="page_404">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 ">
          <div class="col-sm-12 col-sm-offset-1 text-center">
            <div class="four_zero_four_bg">
              <h1 class="text-center" v-if="error.statusCode === 404 || $nuxt.$router.currentRoute.path !== ''">404</h1>
              <h1 class="text-center" v-else>{{ otherError }}</h1>
            </div>
            <div class="contant_box_404">
              <h3 class="h2"> Look like you're lost</h3>
              <p>the page you are looking for not avaible!</p>
              <NuxtLink class="link_404" to="/">Go to Home</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style scoped>
  /*======================
      404 page
  =======================*/
  .page_404 {
    padding:40px 0; background:#fff; font-family: 'Arvo', serif;
  }
  .page_404 img { width:100%;}
  .four_zero_four_bg {
    background-image: url("~@/assets/images/dribbble_1.gif");
    height: 400px;
    background-position: center;
  }
  .four_zero_four_bg h1 {
    font-size:80px;
  }
  .four_zero_four_bg h3 {
    font-size:80px;
  }
  .link_404 {
    color: #fff!important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;}
  .contant_box_404 {
    margin-top:-50px;
  }
</style>

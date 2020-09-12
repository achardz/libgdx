<template>
  <section id="topUp">
    <div class="columns">
      <TopUpForm class="column" />
      <div class="column is-1">
        <div class="line-box">
          <div class="line" />
        </div>
      </div>
      <TopUpTable class="column" />
    </div>
  </section>
</template>

<script>
  import TopUpForm from '~/components/top-up/TopUpForm'
  import TopUpTable from '~/components/top-up/TopUpTable'

  export default {
    name: 'TopUp',
    components: {
      TopUpForm,
      TopUpTable
    },
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @mixin fontNav($size, $weight, $color, $style) {
    font-family: 'Prompt-Regular';
    font-size: $size;
    font-weight: $weight;
    font-style: $style;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: $color;
  }
  @media only screen and (max-width: 768px) {
    .line {
      width: 100% !important;
      height: 2px !important;
    }
  }
  @media only screen and (min-width: 1025px) {
    #topUp {
      padding: 40px 100px 70px 100px !important;
    }
  }
  #topUp {
    background-color: white;
    border-radius: 4px;
    .line-box {
      width: 100%;
      height: 100%;
      .line {
        width: 2px;
        margin: auto;
        height: 100%;
        background-color: #c4c4c4;
      }
    }
  }
</style>

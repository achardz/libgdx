<template>
  <div class="Loading">
    <div id="LoadingBox">
      <div class="loader" />
      <!--<div class="cm-spinner"></div>-->
      <div id="textBox" v-if="!propsType">
        <span>Loading</span>
        <span class="loading">
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      type: { type: String, default: '' },
      iconSize: { type: String, default: '' },
      textSize: { type: String, default: '' }
    },
    data () {
      return {
        propsType: this.type,
        propsIconSize: this.iconSize,
        propsTextSize: this.textSize
      }
    },
    mounted () {
      this.customLayout()
    },
    methods: {
      customLayout: function (params) {
        const vm = this
        document.getElementsByClassName('loader')[0].style.height = vm.propsIconSize
        document.getElementsByClassName('loader')[0].style.width = vm.propsIconSize
        if (vm.propsType === 'image') {
          document.getElementsByClassName('loader')[0].style.marginTop = '20px'
          document.getElementsByClassName('loader')[0].style.marginLeft = '20px'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #LoadingBox {
    /*position: absolute;*/
    /*top: 36%;*/
    /*left: 50%;*/
    padding: 2px;
    border-radius: 4px;
    height: 82px;
    width: 75px;
    line-height: 1.3;
    /*margin-bottom: 10px;*/

    .loader {
      border: 7px solid #f3f3f3;
      border-radius: 50%;
      margin-left: 9px;
      border-top: 6px solid #3498db;
      width: 50px;
      height: 50px;
      -webkit-animation: spin 1s linear infinite;
      animation: spin 1s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /*.cm-spinner {*/
    /*margin-left: 10px;*/
    /*height: 50px;*/
    /*width: 50px;*/
    /*border: 3px solid transparent;*/
    /*border-radius: 50%;*/
    /*border-top: 4px solid #f15e41;*/
    /*-webkit-animation: spin 1s linear infinite;*/
    /*animation: spin 1s linear infinite;*/
    /*position: relative;*/
    /*}*/

    /*.cm-spinner::before,*/
    /*.cm-spinner::after {*/
    /*content: "";*/
    /*position: absolute;*/
    /*top: 6px;*/
    /*bottom: 6px;*/
    /*left: 6px;*/
    /*right: 6px;*/
    /*border-radius: 50%;*/
    /*border: 4px solid transparent;*/
    /*}*/

    /*.cm-spinner::before {*/
    /*border-top-color: #bad375;*/
    /*-webkit-animation: 3s spin linear infinite;*/
    /*animation: 3s spin linear infinite;*/
    /*}*/

    /*.cm-spinner::after {*/
    /*border-top-color: #26a9e0;*/
    /*-webkit-animation: spin 1.5s linear infinite;*/
    /*animation: spin 1.5s linear infinite;*/
    /*}*/

    /*@-webkit-keyframes spin {*/
    /*from {*/
    /*-webkit-transform: rotate(0deg);*/
    /*transform: rotate(0deg);*/
    /*}*/
    /*to {*/
    /*-webkit-transform: rotate(360deg);*/
    /*transform: rotate(360deg);*/
    /*}*/
    /*}*/

    /*@keyframes spin {*/
    /*from {*/
    /*-webkit-transform: rotate(0deg);*/
    /*transform: rotate(0deg);*/
    /*}*/
    /*to {*/
    /*-webkit-transform: rotate(360deg);*/
    /*transform: rotate(360deg);*/
    /*}*/
    /*}*/
    #textBox {
      font-family: 'Prompt-Medium', sans-serif;
      margin-top: -8px;
      font-weight: 100;
      font-size: 10px;
      position: absolute;
      top: 70px;
      left: 6px;
      display: flex;
      color: #0077cc;
      .loading {
        font-size: 1px;
        margin-top: 6px;
        display: inline-flex;
        .dot {
          width: 3px;
          height: 3px;
          margin: 0.2em;
          display: inline-block;
          background: #0077cc;
          border-radius:50%;
          position: relative;

          &:nth-child(1) {
            animation: ease-in-out dot1 1s infinite;
          }
          &:nth-child(2) {
            animation: ease-in-out dot2 1s infinite;
          }
          &:nth-child(3) {
            animation: ease-in-out dot3 1s infinite;
          }
          &:nth-child(4) {
            animation: ease-in-out dot4 1s infinite;
          }
          @keyframes dot1 {
            0%   {
              top:0;
            }
            20%   {
              top:10px / 1.5;
              opacity: 0.5;
            }
            40%   {
              top:0;
            }
          }
          @keyframes dot2 {
            20%   {
              top:0px
            }
            40%   {
              top:10px / 1.5;
              opacity: 0.5;
            }
            60%   {
              top:0px
            }
          }
          @keyframes dot3 {
            40%   {
              top:0px
            }
            60%   {
              top:10px / 1.5;
              opacity: 0.5;
            }
            80%   {
              top:0px
            }
          }
          @keyframes dot4 {
            60%   {
              top:0px
            }
            80%   {
              top:10px / 1.5;
              opacity: 0.5;
            }
            100%   {
              top:0px
            }
          }
        }
      }
    }
  }
  /*@-webkit-keyframes spCircRot {
      from { -webkit-transform: rotate(0deg); }
      to { -webkit-transform: rotate(359deg); }
  }
  @keyframes spCircRot {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
  }*/

</style>

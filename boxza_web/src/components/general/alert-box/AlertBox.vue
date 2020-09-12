<template>
  <div id="alertContainer">
    <transition-group name="alert" tag="div">
      <div class="alert-box" v-for="alert in alertData" :key="alert.uid">
        <div class="success-box" v-if="alert.type === 'success'">
          <div class="command-box">
            <v-icon class="close-btn" @click="closeBox(alert.uid)">mdi-close</v-icon>
          </div>
          <div class="main-box">
            <div class="content-group">
              <div class="main-title"> {{ alert.mainTitle }} </div>
              <div class="sub-title"> {{ alert.subTitle }} </div>
            </div>
          </div>
        </div>
        <div class="warning-box" v-if="alert.type === 'warning'">
          <div class="command-box">
            <v-icon class="close-btn" @click="closeBox(alert.uid)">mdi-close</v-icon>
          </div>
          <div class="main-box">
            <div class="content-group">
              <div class="main-title"> {{ alert.mainTitle }} </div>
              <div class="sub-title"> {{ alert.subTitle }} </div>
            </div>
          </div>
        </div>
        <div class="error-box" v-if="alert.type === 'error'">
          <div class="command-box">
            <v-icon class="close-btn" @click="closeBox(alert.uid)">mdi-close</v-icon>
          </div>
          <div class="main-box">
            <div class="content-group">
              <div class="main-title"> {{ alert.mainTitle }} </div>
              <div class="sub-title"> {{ alert.subTitle }} </div>
            </div>
          </div>
        </div>
        <div class="warning-box session" v-if="alert.type === 'session'">
          <div class="command-box">
            <v-icon class="close-btn" @click="closeBox(alert.uid)">mdi-close</v-icon>
          </div>
          <div class="main-box">
            <div class="content-group">
              <div class="main-title"> {{ alert.mainTitle }} </div>
              <div class="sub-title"> {{ alert.subTitle }} </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  data () {
    return {
      alertData: []
    }
  },
  methods: {
    showBox: function (data) {
      const vm = this
      if (vm.alertData.length < 7) {
        vm.pushAlertData(data)
      } else {
        vm.alertData.splice(0, 1)
        vm.pushAlertData(data)
      }
    },
    pushAlertData: function (data) {
      const vm = this
      var uid = Math.floor(Date.now() + Math.random())
      if (data.show) {
        vm.alertData.push({
          'uid': uid,
          'mainTitle': data.mainTitle,
          'subTitle': data.subTitle,
          'type': data.type
        })
        if (data.time > 0 && data.autoClose) {
          var delay = parseInt(data.time * vm.alertData.length) * 1000
          setTimeout(() => {
            var index = vm.alertData.findIndex(item => item.uid === uid)
            if (index > -1) {
              vm.alertData.splice(index, 1)
            }
          }, delay)
        }
      }
    },
    closeBox (uid) {
      const vm = this
      var index = vm.alertData.findIndex(item => item.uid === uid)
      if (index > -1) {
        vm.alertData.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @media (max-width: 768px) {
    .error-box, .success-box , .warning-box {
      width: 250px !important;
    }
  }
  @media (max-width: 320px) {
    .error-box, .success-box , .warning-box {
      width: 230px !important;
    }
  }
  #alertContainer {
    $icon-color : white;
    max-height: 850px;
    position: fixed;
    top: 40px;
    right: 40px;
    z-index: 999999;
    @mixin box-layout {
      width: 400px;
      min-height: 80px;
      /*max-height: 110px;*/
      color: #333333;
      border-radius: 3px;
      .main-box {
        padding: 0px 20px 20px 20px;
        display: flex;
        text-align: left;
        /*align-items: center;*/
        .icon {
          width: 50px;
          line-height: 0px;
          // margin-left: 20px;
          // font-size: 40px;
          // color: $icon-color;
          -webkit-animation: icon-blink 1s infinite linear; /* Safari 4+ */
          -moz-animation: icon-blink 1s infinite linear; /* Fx 5+ */
          -o-animation: icon-blink 1s infinite linear; /* Opera 12+ */
          animation: icon-blink 1s infinite linear; /* IE 10+, Fx 29+ */
          transition: 0.3s;
          .material-icons {
            font-size: 50px;
            color: #ffffff;
            transition: 0.3s;
          }
        }
        .icon-material{
          width: 50px;
          height: 50px;
          margin-left: 3px;
          background-color: $icon-color;
          -webkit-animation: icon-blink 1s infinite linear; /* Safari 4+ */
          -moz-animation: icon-blink 1s infinite linear; /* Fx 5+ */
          -o-animation: icon-blink 1s infinite linear; /* Opera 12+ */
          animation: icon-blink 1s infinite linear; /* IE 10+, Fx 29+ */
          transition: 0.3s;
          border-radius: 50%;
          .material-icons {
            font-size: 27px;
            color: white;
            margin: 10.5px 0 0 10.5px;
          }
        }
        .content-group {
          width: 100%;
          padding-left: 5px;
          cursor: default;
        }
        .main-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          font-family: "Sarabun-Medium";
          padding-left: 1px;
          color: #ffffff;
        }
        .sub-title {
          margin-top: 3px;
          font-size: 12px;
          font-weight: bold;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          font-family: "Sarabun-Regular";
          /*letter-spacing: 0.7px;*/
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-left: 1px;
          color: #ffffff;
        }
        @keyframes icon-blink {
          0%,
          49% {
            opacity: 0.8;
          }
          50%,
          100% {
            opacity: 0.88;
          }
        }
      }
      .command-box {
        text-align: right;
        padding: 20px 20px 10px 20px;
        line-height: 0;
        .close-btn {
          cursor: pointer;
          color: #ffffff;
          .material-icons {
            font-size: 14px;
          }
        }
      }
    }
    .alert-box {
      position: relative;
      margin-top: 20px;
      background-color: #fff;
    }
    .alert-box:first-child {
      margin-top: 0px;
    }
    .error-box {
      @include box-layout;
      background-color: #c86d6d;
    }
    .success-box {
      @include box-layout;
      background-color: #60b58e;
    }
    .warning-box {
      @include box-layout;
      background-color: #EBBE73;
      &.session {
        .content-group {
          width: 250px;
        }
      }
    }
    .alert-enter-active, .alert-leave-active {
      transition: all 0.3s;
    }
    .alert-enter {
      opacity: 0;
    }
    .alert-leave-to {
      opacity: 0;
      // transform: translateY(-100px);
    }
  }
</style>

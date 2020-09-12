<template>
  <div id="bodyBackground" v-if="showDialog">
    <div id="DialogBox">
      <div id="box" ref="box" v-if="boxType === 'confirm'">
        <div class="main-box">
          <div class="head-box">
            <span class="close-btn" @click="closeDialog()"><i class="icon-opr-close" aria-hidden="true" /></span>
          </div>
          <div class="warning-icon-box">
            <i class="icon icon-opr-information" />
          </div>
          <div class="content-group-box">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="action-box">
          <button class="btn btn-cancel margin-right" @click="sendStateData('cancel')"> ยกเลิก </button>
          <button class="btn btn-confirm" @click="sendStateData('confirm')"> ยืนยัน </button>
        </div>
      </div>
      <div id="deleteBox" ref="box" v-if="boxType === 'delete'">
        <div class="main-box">
          <div class="head-box">
            <span class="close-btn" @click="closeDialog()"><i class="icon-opr-close" aria-hidden="true" /></span>
          </div>
          <div class="content-group-box">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="action-box">
          <button class="btn btn-cancel margin-right" @click="sendStateData('cancel')"> ยกเลิก </button>
          <button class="btn btn-confirm" @click="sendStateData('confirm')"> ยืนยัน </button>
        </div>
      </div>
      <!--<div id="box" ref="box" v-if="boxType === 'reject'">
        <div class="main-box">
          <div class="head-box">
            <span class="title"> {{ `ยืนยัน${title}` }} </span>
            <span class="close-btn" @click="closeDialog()"><i class="icon-sum-close" aria-hidden="true" /></span>
          </div>
          <div class="content-group-box">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ item }}</div>
          </div>
        </div>
        <div class="action-box">
          <button class="btn btn-cancel margin-right" @click="sendStateData('cancel')"> ยกเลิก </button>
          <button class="btn btn-delete" @click="sendStateData('reject')"> ยืนยัน </button>
        </div>
      </div>-->
      <!-- <div id="SuccessBox" v-if="boxType === 'success'">
        <div class="main-box">
          <span class="close-btn" @click="closeDialog()"><i class="icon-sma-close" aria-hidden="true"/></span>
          <div class="icon icon-success" v-if="showIcon"><i class="icon-sma-mark" aria-hidden="true"/></div>
          <div class="title">{{ title }}</div>
          <div class="sub-title">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ index+1 + '. ' + item }}</div>
          </div>
        </div>
        <div class="action-box">
          <button class="btn btn-primary" v-if="showIcon" @click="sendStateData('ตกลง')"> ตกลง </button>
          <button class="btn btn-success" v-if="!showIcon" @click="sendStateData('ยืนยัน')"> ยืนยัน </button>
        </div>
      </div>
      <div id="LoadingBox" v-if="boxType === 'loading'">
        <div class="main-box">
          <span class="close-btn" @click="closeDialog()"><i class="icon-sma-close" aria-hidden="true"/></span>
          <Loading/>
        </div>
      </div>
      <div id="WarningBox" v-if="boxType === 'warning'">
        <div class="main-box">
          <span class="close-btn" @click="closeDialog()"><i class="icon-sma-close" aria-hidden="true"/></span>
          <div class="icon icon-warning" v-if="showIcon"><i class="icon-sma-question" aria-hidden="true"/></div>
          <div class="title">{{ title }}</div>
          <div class="sub-title">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ index+1 + '. ' + item }}</div>
          </div>
        </div>
        <div class="action-box">
          <button class="btn btn-danger btn-margin-right" @click="sendStateData('ยกเลิก')"> ยกเลิก </button>
          <button class="btn btn-success" @click="sendStateData('ยืนยัน')"> ยืนยัน </button>
        </div>
      </div>
      <div id="ErrorBox" v-if="boxType === 'error'">
        <div class="main-box">
          <span class="close-btn" @click="closeDialog()"><i class="icon-sma-close" aria-hidden="true" /></span>
          <div class="icon icon-error" v-if="showIcon"><i class="icon-sma-incorrect" aria-hidden="true" /></div>
          <div class="title">{{ title }}</div>
          <div class="sub-title">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ index+1 + '. ' + item }}</div>
          </div>
        </div>
        <div class="action-box">
          <button class="btn btn-primary" @click="sendStateData('ตกลง')"> ตกลง </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

export default {
  name: 'DialogBox',
  data () {
    return {
      boxType: '',
      title: '',
      textList: [],
      showDialog: false,
      showIcon: false
    }
  },
  updated: function () {},
  methods: {
    closeDialog: function () {
      const vm = this
      vm.showDialog = false
    },
    sendStateData: function (value) {
      const vm = this
      vm.showDialog = false
      vm.$emit('dialogState', value)
    },
    showBox: function (value) {
      const vm = this
      vm.showDialog = true
      vm.boxType = value.boxType
      vm.title = value.title
      vm.textList = value.textList
      vm.showIcon = value.showIcon
    }
  }
}
</script>

<style lang="scss" scoped>
#bodyBackground {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999 !important;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 24px !important;
  font-weight: 600 !important;
  font-style: normal;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  width: 100%;
  height: 100%;
  #DialogBox {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    min-width: 450px;
    max-width: 550px;
    min-height: 145px;
    max-height: 350px;
    width: fit-content !important;
    height: fit-content !important;
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #ffffff;
    .main-box {
      .head-box {
        height: 14px;
        margin-bottom: 10px;
        .close-btn {
          float: right;
          cursor: pointer;
          font-size: 14px;
        }
      }
      .warning-icon-box {
        text-align: center;
        margin-bottom: 20px;
        line-height: 0;
        .icon {
          font-size: 40px;
          color: #ebbe73;
        }
      }
      .content-group-box {
        display: block;
        width: 100%;
        height: fit-content;
        /*padding: 20px;*/
        text-align: center;
        .text-list {
          color: #1b1b1a;
          font-size: 20px;
        }
      }
      .icon {
        height: 50px;
        font-size: 50px;
        text-align: center;
      }
      .text-list {
        font-size: 24px;
      }
      .sub-title {
        margin-top: 10px;
      }
    }
    .action-box {
      display: inline-flex;
      width: 100%;
      text-align: center;
      margin-top: 20px;
      .btn {
        display: block;
        width: 60px;
        height: 35px;
        border-radius: 4px;
        font-size: 20px !important;
        font-weight: 500;
        line-height: 27px;
        &.btn-cancel {
          width: 53px;
          height: 30px;
          border-radius: 4px;
          padding: 3px;
          margin-left: auto;
          background-color: #c86d6d;
          color: #ffffff;
          box-shadow: none !important;
          &:hover:not(.disable){
            opacity: 0.8;
            cursor: pointer;
          }
        }
        &.btn-confirm {
          width: 53px;
          height: 30px;
          border-radius: 4px;
          padding: 3px;
          background-color: #007e33;
          color: #ffffff;
          margin-right: auto;
          box-shadow: none !important;
        }
        &.btn-confirm:hover {
          opacity: 0.8;
        }
        &.btn-delete {
          background-color: #cc0000;
          color: #ffffff;
          box-shadow: none !important;
        }
      }
      .btn:first-child {
        margin-left: auto;
      }
      .btn-margin-right {
        margin-right: 15px;
      }
    }
  }
}
</style>

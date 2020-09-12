<template>
  <div id="bodyBackground" v-if="showDialog">
    <div id="DialogBox">
      <div id="deleteBox" ref="box" v-if="boxType === 'delete'">
        <div class="main-box">
          <div class="content-group-box">
            <div class="text-list" v-for="(item, index) in textList" :key="index">{{ item }}</div>
          </div>
        </div>
        <div>
          <v-btn @click="sendStateData('cancel')"> ยกเลิก </v-btn>
          <v-btn @click="sendStateData('confirm')"> ยืนยัน </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    Component,
    Vue,
    Prop,
    Watch
} from 'vue-property-decorator'

export default {
    name: 'DialogBox',
    data() {
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
#bodyBackground {}
</style>

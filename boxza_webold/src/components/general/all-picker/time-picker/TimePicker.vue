<template>
  <div id="timePicker">
    <div class="time-picker">
      <VueTimePicker @timeData="datePushTime" :minute-interval="minuteInterval" :second-interval="secondInterval" :format="newFormatTime"
                     hide-clear-button ref="time" :time-value.sync="timeData" @change="datePushTime" :timeValue="timeValue"></VueTimePicker>
    </div>
    <div v-if="attemptSubmit" class="invalid-feedback labelTextError"><i class="fa fa-warning"></i>&nbsp;{{ textErrorTextFields }}</div>
  </div>
</template>


<script>
  import VueTimePicker from './vue-timepicker'

  export default {
    name: 'time-picker',
    data () {
      return {
        timeData: '',
        attemptSubmit: false,
        newFormatTime: 'HH:mm',
        textErrorTextFields: 'รูปแบบเวลาไม่ถูกต้อง'
      }
    },
    props: {
      minuteInterval: {type: Number},
      formatTime: {type: Number},
      secondInterval: {type: Number},
      timeValue: {type: String}
    },
    components: {
      VueTimePicker: VueTimePicker
    },
    computed: {},
    mounted: function () {
      this.checkFormatTime()
      this.defineTimepicker(this.timeValue)
    },
    methods: {
      checkFormatTime: function () {
        const vm = this
        switch (vm.formatTime) {
          case 24:
            vm.newFormatTime = 'HH:mm'
            break
          case 12:
            vm.newFormatTime = 'hh:mm A'
            break
          default: vm.newFormatTime = 'HH:mm'
        }
      },
      defineTimepicker: function (time) {
        const vm = this
        if (time) {
          switch (vm.formatTime) {
            case 24:
              vm.newFormatTime = 'HH:mm'
              break
            case 12:
              vm.newFormatTime = 'hh:mm A'
              break
            default: vm.newFormatTime = 'HH:mm'
          }
          vm.$refs.time.defineVueTimepicker(time, vm.newFormatTime)
        }
      },
      disabledMin: function (arrMin) {
        const vm = this
        vm.$refs.time.disabledMinVuePicker(arrMin)
      },
      datePushTime: function (timeData) {
        const vm = this
        vm.timeData = timeData.replace(/\s/g, '')
        if (vm.timeData) {
          vm.validateTime()
          vm.$emit('emitTimeData', vm.timeData)
        }
      },
      validateTime: function () {
        const vm = this
        if (vm.timeData) {
          vm.attemptSubmit = false
          vm.$refs.time.$vnode.elm.children[0].classList.remove('timeInvalid')
          return vm.attemptSubmit
        } else {
          vm.attemptSubmit = true
          vm.$refs.time.$vnode.elm.children[0].className += ' timeInvalid'
          return vm.attemptSubmit
        }
      }
    }
  }
</script>

<style lang="scss">
  @mixin font ($size, $color, $weight) {
    font-family: 'THSarabunNew';
    font-size: $size !important;
    font-weight: $weight;
    color: $color;
  }

  #timePicker {
    .labelTextError {
      display: -webkit-box;
      @include font(14px, '', 600);
      /*margin-top: 10px;*/
      /*text-align: right;*/
    }
    .time-picker {
      width: 100%;
      input.display-time {
        @include font(19px, '', 600);
        width: 100%;
        height: 35px !important;
        border-radius: 4px !important;
      }
      .timeInvalid {
        border: 1px solid #dc3545;
      }
      .dropdown {
        width: 100%;
        top: calc(2.2em + 0px);
        .select-list {
          width: 100%;
          li.active {
            background: #1646d4 !important;
            color: #fff;
          }
          ul.hours::-webkit-scrollbar, ul.minutes::-webkit-scrollbar {
            width: 7px !important;
            background-color: #F5F5F5 !important;
          }
          ul.hours::-webkit-scrollbar-thumb, ul.minutes::-webkit-scrollbar-thumb {
            margin: 0px 5px !important;
            border-radius: 10px !important;
            box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3) !important;
            background-color: #1646d4 !important;
          }
        }
      }
    }
  }
</style>

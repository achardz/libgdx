<template>
  <div id="monthPicker">
    <div class="month-picker-input">
      <input ref="input"
             id="montPickerInput"
             autocomplete="off"
             class="form-control month-picker-box"
             data-date-language="en-th"
             pattern="[0-9\.]+"
             v-model="monthShowInput"
             @mousedown="showCard = true"
             @keyup.enter="checkEnter"
             :placeholder="placeholder">
    </div>
    <div class="month-picker-card" v-if="showCard">
      <div class="year-box">
        <div class="select-year">
          <span class="arrow-left" :class="{'arrow-active': yearNow < activeClick}" @click="clickArrow('left')">
            <i class="icon icon-backward" />
          </span>
          <div class="year"
               :class="{
                 'slide-left-first': slide === 'leftFirst', 'slide-left-last': slide === 'leftLast',
                 'slide-right-first': slide === 'rightFirst', 'slide-right-last': slide === 'rightLast'
               }">
            <span class="year-font"> {{ yearNow }} </span>
          </div>
          <span class="arrow-right" :class="{'arrow-active': yearNow < activeClick}" @click="clickArrow('right')">
            <i class="icon icon-forward" />
          </span>
        </div>
      </div>
      <div class="months-box">
        <div class="month-box">
          <div class="select-month">
            <div class="month" v-for="month in months" :Key="month.id"
                 :class="{
                   active: month.id === activeMonth, 'slide-left-first': slide === 'leftFirst', 'slide-left-last': slide === 'leftLast',
                   'slide-right-first': slide === 'rightFirst', 'slide-right-last': slide === 'rightLast'
                 }"
                 @click="selectMonth(month, true)">
              {{ month.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'monthPicker',
    components: {},
    props: {
      placeholder: { type: String, default: '' },
      type: { type: String, default: '' }
    },
    data () {
      return {
        showCard: false,
        monthData: '',
        slide: '',
        monthShowInput: '',
        activeClick: (+moment().format('YYYY') + 543),
        yearNow: (+moment().format('YYYY') + 543),
        monthType: this.type,
        activeMonth: 0,
        months: [
          { id: 1, name: 'ม.ค.', value: '01' },
          { id: 2, name: 'ก.พ.', value: '02' },
          { id: 3, name: 'มี.ค.', value: '03' },
          { id: 4, name: 'เม.ย.', value: '04' },
          { id: 5, name: 'พ.ค.', value: '05' },
          { id: 6, name: 'มิ.ย.', value: '06' },
          { id: 7, name: 'ก.ค.', value: '07' },
          { id: 8, name: 'ส.ค.', value: '08' },
          { id: 9, name: 'ก.ย.', value: '09' },
          { id: 10, name: 'ต.ค.', value: '10' },
          { id: 11, name: 'พ.ย.', value: '11' },
          { id: 12, name: 'ธ.ค.', value: '12' }
        ]
      }
    },
    watch: {
      monthShowInput() {
        const vm = this
        const yearNow = (+moment().format('YYYY') + 543)
        const minYear = yearNow - 300
        const clearData = () => {
          vm.activeMonth = 0
          vm.monthShowInput = ''
          vm.monthData = ''
        }
        if (vm.monthShowInput.length > 7) {
          vm.monthShowInput = vm.monthShowInput.slice(0, 7)
        } else if (vm.monthShowInput.length === 7) {
          const date = vm.monthShowInput.split('/')
          if (date[0].length === 2 && +date[1] >= minYear) {
            const month = +date[0]
            if (date[1] <= yearNow) {
              if (month <= 12) {
                vm.yearNow = +date[1]
                const monthData = vm.months.filter(e => e.id === month)
                vm.selectMonth(monthData[0])
              } else {
                clearData()
              }
            } else {
              clearData()
            }
          } else {
            clearData()
          }
        }
      },
      showCard() {
        const vm = this
        if (vm.showCard) {
          setImmediate(() => {
            addEventListener('click', () => {
              const element = document.getElementById('monthPicker')
              if (element) {
                const checkOutside = element.contains(event.target)
                if (!checkOutside) {
                  if (vm.monthShowInput.length < 7) {
                    vm.activeMonth = 0
                    vm.monthShowInput = ''
                    vm.monthData = ''
                  }
                  vm.showCard = false
                }
              }
            }, {
              passive: true
            })
          })
        }
      }
    },
    created () {
      if (this.monthType === 'now') {
        this.selectMonth()
      }
    },
    mounted () {
    },
    methods: {
      clickArrow (value) {
        const vm = this
        vm.monthShowInput = ''
        vm.monthData = ''
        if (value === 'left') {
          vm.slide = 'leftFirst'
          setTimeout(() => {
            vm.slide = 'leftLast'
            vm.yearNow -= 1
            setTimeout(() => {
              vm.slide = ''
            }, 400)
          }, 400)
        } else if (value === 'right' && vm.yearNow < (+moment().format('YYYY') + 543)) {
          vm.slide = 'rightFirst'
          setTimeout(() => {
            vm.slide = 'rightLast'
            vm.yearNow < (+moment().format('YYYY') + 543) ? vm.yearNow += 1 : vm.yearNow
            setTimeout(() => {
              vm.slide = ''
            }, 400)
          }, 400)
        }
        vm.activeMonth = 0
      },
      selectMonth (selectMonthData, clickCard) {
        const vm = this
        if (selectMonthData) {
          vm.activeMonth = selectMonthData.id
          vm.monthData = `${vm.yearNow - 543}-${selectMonthData.value}`
          vm.monthShowInput = `${selectMonthData.value}/${vm.yearNow}`
          if (clickCard) {
            vm.showCard = false
          }
        } else {
          vm.months.map((e) => {
            if (e.id === +moment().format('M')) {
              vm.activeMonth = +moment().format('M')
              vm.monthData = `${vm.yearNow - 543}-${e.value}`
              vm.monthShowInput = `${e.value}/${vm.yearNow}`
            }
          })
        }
        this.$emit('selected', { month: vm.monthData })
        // vm.showCard = false
      },
      checkEnter () {
        const vm = this
        if (vm.monthShowInput.length === 7) {
          vm.showCard = false
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @mixin standardFont ($size, $weight, $color) {
    font-family: THSarabunNew;
    font-size: $size;
    font-weight: $weight;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: $color;
  }
  #monthPicker {
    max-width: 250px;
    max-height: 290px;
    position: relative;
    input {
      padding: 11px 10px 10px 10px;
      height: 35px;
    }
    input::-webkit-input-placeholder {
      @include standardFont(20px, normal, #9b9b9b);
    }
    .month-picker-input {
      width: 100%;
    }
    .month-picker-card {
      position: absolute;
      z-index: 9;
      border-radius: 4px;
      margin-top: 1px;
      min-width: 250px;
      height: auto;
      background-color: white;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
      .year-box {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 10px;
        background-color: #3a8aff;
        .select-year {
          display: flex;
          .icon {
            display: flex;
            margin-top: 8px;
            justify-content: center;
          }
          [class^="icon-"], [class*=" icon-"] {
            font-family: 'icon-font' !important;
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-feature-settings: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
          }
          .icon-backward:before {
            content: "\e90a";
          }
          .icon-forward:before {
            content: "\e908";
          }
          .arrow-left {
            font-size: 12px;
            margin-left: 10px;
            padding: 0px 5px 0px 5px;
            width: 31px;
            height: 28px;
            margin-right: auto;
            cursor: pointer;
            color: white;
          }
          .arrow-left:hover {
            border-radius: 4px;
            width: 31px;
            height: 28px;
            padding: 0px 5px 0px 5px;
            background-color: rgba(196, 196, 196, 0.6);
            color: white;
          }
          .year {
            width: 33px;
            height: 25px;
            margin-top: -1px;
            position :relative;
            .year-font {
              @include standardFont(22px, bold, #ffffff);
              cursor: default;
            }
          }
          .arrow-right {
            font-size: 12px;
            margin-left: auto;
            margin-right: 10px;
            cursor: pointer;
            padding: 0px 5px 0px 5px;
            width: 31px;
            height: 28px;
            cursor: pointer;
            color: white;
          }
          .arrow-right:hover {
            border-radius: 4px;
            width: 31px;
            height: 28px;
            padding: 0px 5px 0px 5px;
            background-color: rgba(196, 196, 196, 0.6);
          }
          .arrow-active:active {
            background-color: rgba(176, 176, 176, 0.6);
          }
        }
      }
      .months-box {
        padding: 15px;
        .month-box {
          width: 100%;
          height: 100%;
          .select-month {
            display: flex;
            flex-wrap: wrap;
            .month {
              @include standardFont(20px, normal, #333333);
              cursor: pointer;
              margin: 0px 5px 0px 5px;
              width: 45px;
              height: 45px;
              display: flex;
              justify-content: center;
              align-items: center;
              vertical-align: middle;
            }
            .month:hover {
              color: #ffffff;
              background-color: #3a8aff;
              border-radius: 4px;
            }
            .month:nth-child(4n+1) {
              margin: 0px 10px 10px 0px;
            }
            .month:nth-child(4n+0) {
              margin: 0px 0px 0px 10px;
            }
            .month:nth-child(9) {
              margin: 0px 10px 0px 0px !important;
            }
            .month:nth-child(12) {
              margin: 0px 0px 0px 10px !important;
            }
            .active {
              color: #ffffff;
              background-color: #3a8aff;
              border-radius: 4px;
            }
          }
        }
      }
      .slide-left-first {
        animation: leftFirst 0.5s infinite;
      }
      .slide-left-last {
        animation: leftLast 0.5s infinite;
      }
      .slide-right-first {
        animation: rightFirst 0.5s infinite;
      }
      .slide-right-last {
        animation: rightLast 0.5s infinite;
      }
      @keyframes leftFirst {
        from {
          left: 0px;
          opacity: 1;
        }
        to {
          left: 50px;
          opacity: 0;
        }
      }
      @keyframes leftLast {
        from {
          left: -50px;
          opacity: 0;
        }
        to {
          left: 0px;
          opacity: 1;
        }
      }
      @keyframes rightFirst {
        from {
          left: 0px;
          opacity: 1;
        }
        to {
          left: -50px;
          opacity: 0;
        }
      }
      @keyframes rightLast {
        from {
          left: 50px;
          opacity: 0;
        }
        to {
          left: 0px;
          opacity: 1;
        }
      }
    }
  }
</style>

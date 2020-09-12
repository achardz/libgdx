<template>
  <div class="date-picker" :id="`${name}`">
    <div :id="`InputBox_${name}`" class="input-box">
      <label :for="elementId" class="input-text">{{ topicInput }}</label>
      <input ref="input"
             autocomplete="off"
             :name="`${name}Input`"
             class="form-control datepicker-box"
             :class="{ 'is-invalid': attemptSubmit && missingDatepicker, 'isDisabled': checkDisabled || disabledDatePicker }"
             :id="elementId"
             data-date-language="en-th"
             :placeholder="placeholder"
             @:closed="emitDate"
             :disabled="checkDisabled || disabledDatePicker"
             @change="handdleDatepicker">
      <div class="invalid-feedback" :class="{'align-right': invalidAlignment === 'right'}"><i class="fa fa-warning" /> {{ textErrorValidate }} </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import moment from 'moment'
import 'moment-timezone'
import '@/assets/js/jquery.calendars'
import '@/assets/js/jquery.calendars.plus'
import '@/assets/js/jquery.plugin'
import '@/assets/js/jquery.calendars.picker'
import '@/assets/js/jquery.calendars.thai.min'
import '@/assets/js/jquery.calendars.thai-th'
import '@/assets/js/jquery.calendars.picker-th'

export default {
  name: 'DatePicker',
  components: {},
  props: {
    topicInput: { type: String, default: '' },
    name: { type: String, default: '' },
    dateId: { type: String, default: '' },
    disabledDatePicker: Boolean,
    language: { type: String, default: '' },
    dateValue: { type: String, default: '' },
    today: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    yearOnly: { type: Boolean, default: false },
    birthDate: { type: Boolean, default: false },
    newMaxDate: { type: [String, Number], default: '' },
    newMinDate: { type: String, default: '' },
    icon: { type: Boolean, default: false },
    invalidAlignment: { type: String, default: '' }
  },
  data () {
    return {
      dangerClass: '',
      disabledClass: '',
      elementId: '',
      checkDisabled: false,
      emitResult: '',
      textErrorValidate: 'รูปแบบวันที่ไม่ถูกต้อง',
      attemptSubmit: false,
      maxDate: 0,
      minDate: null,
      maxDateFuture: 0
    }
  },
  computed: {
    missingDatepicker: function () {
      return this.emitResult === ''
    }
  },
  mounted: function () {
    const vm = this
    vm.disabledClass = vm.disabledPicker === true ? ' disabled' : ''
    vm.getElementId(vm.defineDatePicker)
    vm.$nextTick(() => {
      $('*').scroll(function () {
        if ($('*').hasClass('calendars-popup')) {
          $(`#${vm.elementId}`).calendarsPicker('hide')
          $(`#${vm.elementId}`).blur()
        }
      })
    })
  },
  methods: {
    getElementId: function (callback) {
      const vm = this
      let tmp = new Date().getTime()
      const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const _tmp = (tmp + Math.random() * 16) % 16 | 0
        tmp = Math.floor(tmp / 16)
        return (c === 'x' ? _tmp : (_tmp & 0x3 | 0x8)).toString(16)
      })
      vm.elementId = uuid
      setTimeout(function () {
        callback()
      }, 100)
    },
    defineDatePicker: function (dateValue) {
      const vm = this
      let iconCalendar = ''
      if (vm.icon) {
        iconCalendar = '<a class="disable-icon" disabled="disabled"><i class="icon-opr-calendar" aria-hidden="true"></i></a>'
      }
      if (dateValue && dateValue != null && dateValue !== '') {
        const date = moment(dateValue).format('DD') + '/' + moment(dateValue).format('MM') + '/' + moment(dateValue).add(543, 'year').format('YYYY')
        $(`#${vm.elementId}`).val(date)
        vm.attemptSubmit = false
      } else {
        if (vm.newMaxDate !== undefined && vm.newMaxDate !== '') {
          vm.maxDate = vm.newMaxDate
          vm.minDate = vm.newMinDate
          vm.maxDateFuture = 10
        }
        const yearRangeStart = (new Date().getFullYear() - 100) + 543
        $(`#${vm.elementId}`).calendarsPicker({
          calendar: $.calendars.instance('thai', 'th'),
          renderer: $.extend({}, $.calendarsPicker.defaultRenderer,
            {
              picker: $.calendarsPicker.defaultRenderer.picker
                .replace(/\{link:clear\}/, '')
                .replace(/\{link:close\}/, '')
            }),
          showSpeed: 10,
          showAnim: 'fadeIn',
          prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
          todayText: '<span class="today"> วันนี้ </span>',
          nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
          onShow: $.calendarsPicker.showStatus,
          showTrigger: iconCalendar,
          formatDate: 'dd/mm/yyyy',
          defaultDate: vm.birthDate ? '-20y' : '',
          showOnFocus: true,
          selectDefaultDate: false,
          minDate: vm.minDate,
          maxDate: vm.maxDate,
          yearRange: yearRangeStart + ':' + (new Date().getFullYear() + 543 + vm.maxDateFuture),
          onClose: function (dates) {
            let _params = ''
            if (dates.length !== 0) {
              if (vm.$refs.input.value.length === 10) {
                _params = { year: dates[0]._year - 543, month: dates[0]._month - 1, day: dates[0]._day }
              } else if (vm.$refs.input.value.length < 10 || vm.$refs.input.value.length > 10) {
                vm.$refs.input.value = ''
              }
              vm.emitDate(_params)
            }
          }
        })
      }
    },
    clearDate: function () {
      const vm = this
      $(`#${vm.elementId}`).calendarsPicker('clear')
      vm.emitDate('')
      vm.attemptSubmit = false
    },
    defineDate: function (value) {
      const vm = this
      const tmpDate = vm.convertTimezone(value)
      const newDate = {
        'newDateMonth': tmpDate.getMonth(),
        'newDateDay': tmpDate.getDate(),
        'newDateYear': tmpDate.getFullYear()
      }
      return new Date(newDate.newDateYear, newDate.newDateMonth, newDate.newDateDay)
    },
    handdleDatepicker: function (e) {
      const vm = this
      let dates = ''
      if (e.target.value.length === 10) {
        var date = e.target.value.split('/')
        var day = parseInt(date[0])
        var month = parseInt(date[1])
        var year = parseInt(date[2] - 543)
        if (!isNaN(day) && !isNaN(month) && !isNaN(year) && (day > 0) && (day <= 31) && (month > 0) && (month <= 12)) {
          var lastDayOfMonth = new Date(year, month + 1, -1).getDate()
          if (day <= lastDayOfMonth) {
            dates = { year: year, month: month - 1, day: day }
          }
        }
      } else {
        dates = ''
      }
      vm.$nextTick(() => {
        vm.emitDate(dates)
      })
    },
    emitDate: function (value) {
      const vm = this
      let result
      if (value) {
        if (vm.yearOnly) {
          result = value.year
        } else {
          const tmpDate = new Date(value.year, value.month, value.day)
          result = moment(tmpDate).format('YYYY-MM-DD')
          if (vm.minDate === 'now') {
            if (result < moment().format('YYYY-MM-DD')) {
              result = ''
              vm.$refs.input.value = ''
            }
          } else if (typeof vm.minDate === 'number') {
            if (result < moment().subtract(Math.abs(vm.minDate), 'days').format('YYYY-MM-DD')) {
              result = ''
              vm.$refs.input.value = ''
            }
          }
          if (typeof vm.maxDate === 'number') {
            if (result > moment().add(Math.abs(vm.maxDate), 'days').format('YYYY-MM-DD')) {
              result = ''
              vm.$refs.input.value = ''
            }
          }
        }
      } else {
        result = ''
        vm.$refs.input.value = ''
      }
      vm.emitResult = result
      vm.$emit('dateSelected', { date: result, id: vm.dateId })
    },
    validate: function () {
      if (this.dateValue === '') {
        if (typeof document.activeElement.attributes.id === 'undefined') {
          this.dangerClass = 'is-danger'
          return false
        } else {
          this.dangerClass = ''
          return false
        }
      } else {
        this.dangerClass = ''
        return true
      }
    },
    convertTimezone: function (date) {
      const tempDate = new Date(date)
      const localTime = tempDate.getTime()
      const localOffset = (-1) * new Date().getTimezoneOffset() * 60000
      const utc = localTime + localOffset
      const result = new Date(utc)
      return result
    },
    validateBeforeSubmit: function (value) {
      const vm = this
      vm.emitResult = value
      if (vm.missingDatepicker) {
        vm.attemptSubmit = true
      } else {
        vm.attemptSubmit = false
      }
      return vm.attemptSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
  .fa-calendar {
    font-family: THSarabunNew !important;
  }
  @mixin fontInput($size, $weight, $color) {
    font-family: 'Sarabun-Regular';
    margin: 0 0 5px !important;
    font-size: $size;
    font-weight: $weight;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: $color;
  }
  @mixin formControlData () {
    .form-control {
      font-family: 'Sarabun-Regular' !important;
      background-color: #FFF;
      border-radius: 4px !important;
      height: 30px !important;
      font-size: 12px !important;
      font-weight: bold;
      padding: 5px 10px 4px!important;
    }
  }
  .form-control.is-invalid {
    border-color: #c86d6d;
  }
  .input-text {
    @include fontInput(12px, normal, #333333);
  }
  .isDisabled {
    background-color: #eeeeee !important;
    opacity: 0.7 !important;
  }
  .datepicker-box::-webkit-input-placeholder {
    @include fontInput(12px, normal, #9b9b9b);
  }
  .invalid-feedback {
    font-size: 12px;
    font-family: 'Sarabun-Regular';
    font-weight: normal;
    margin-top: 0px;
    color: #c86d6d;
  }
  .align-right {
    text-align: right;
  }
  .input-box {
    // margin: -3px 0px 0px 0px;
    //margin-top: -2px;
    position: relative;
    font-size: 0px;
    /*input::-webkit-input-placeholder {
      @include fontInput(12px, normal, #9b9b9b);
    }*/
    @include formControlData();
  }
</style>
<style lang="scss">
  .icon-opr-calendar {
    position: absolute;
    color: #9b9b9b;
    right: 15px;
    top: 27px;
    font-size: 16px;
  }
  .disable-icon {
    pointer-events: none !important;
  }
  .calendars-popup {
    th {
      font-family: THSarabunNew;
      color: #333333 !important;
      font-weight: 100 !important;
    }
  }
  .is-invalid {
    background-image: unset !important;
  }
  /*th {*/
    /*font-family: 'promt-regular';*/
    /*color: #333333 !important;*/
    /*font-weight: 100 !important;*/
  /*}*/
</style>

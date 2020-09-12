import moment from 'moment'
import 'moment-timezone'

moment.tz.setDefault('Asia/Bangkok')
export function formatNotNull(value, type = '-') {
  try {
    return !value ? type : value
  } catch (e) {
    return type
  }
}
export function formatAccountNumber(value) {
  if (value) {
    let data = ''
    for (let i = 0; i < value.length; i++) {
      if (i === 3 || i === 4 || i === 9) {
        data += '-' + value[i]
      } else {
        data += value[i]
      }
    }
    return data
  }
  return !value ? '-' : value
}
export function filterMoneyAmount(input, minus = false) {
  const temp = input.toString().split('.')
  let returnData = ''
  if (minus && temp[0].indexOf('-') === 0) {
    returnData = '-'
  }
  returnData += temp[0].replace(/^0+/g, '').replace(/[^\d.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (temp[1] !== undefined) { returnData += '.' + (temp[1].replace(/[^\d.]/g, '')).substring(0, 2) }
  returnData === '' ? returnData = '0' : returnData
  return returnData
}
export function accountingSeparateNumber(
  val,
  $toFixed,
  type = 0,
  negativeNum = false
) {
  try {
    if (typeof $toFixed === 'undefined') {
      if (parseFloat(val) > 0 || negativeNum) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
          val = val.toString().replace(/(\d+)(\d{3})/, '$1,$2')
        }
        return val
      }
      return type
    } else if (typeof $toFixed === 'number') {
      if (parseFloat(val) > 0 || negativeNum) {
        let num = parseFloat(val).toFixed($toFixed)
        num += ''
        const x = num.split('.')
        let x1 = x[0]
        const x2 = x.length > 1 ? '.' + x[1] : ''
        const rgx = /(\d+)(\d{3})/
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1,$2')
        }
        return x1 + x2
      }
      return type
    }
    return val
  } catch (e) {
    return type
  }
}
export function formatIdCardNumbers(value) {
  try {
    if (value && value !== '-') {
      const temp = value.split('')
      return `${temp[0]}-${temp[1]}${temp[2]}${temp[3]}${temp[4]}-${temp[5]}${temp[6]}${temp[7]}${temp[8]}${temp[9]}-${temp[10]}${temp[11]}-${temp[12]}`
    }
    return !value ? '-' : value
  } catch (e) {
    return '-'
  }
}
export function formatPhoneNumber(value, formatPhone = '-') {
  try {
    if (!value || (value && value.length === 0)) {
      return '-'
    }
    if (value.length === 9) {
      if (value.slice(1, 2) === '2') {
        return value.replace(
          /(\d{2})(\d{3})(\d{4})/,
          `$1${formatPhone}$2${formatPhone}$3`
        )
      }
      return value.replace(
        /(\d{3})(\d{3})(\d{3})/,
        `$1${formatPhone}$2${formatPhone}$3`
      )
    } else if (value.length === 10) {
      return value.replace(
        /(\d{3})(\d{3})(\d{4})/,
        `$1${formatPhone}$2${formatPhone}$3`
      )
    }
    return value
  } catch (e) {
    return '-'
  }
}
export function formatDate (value, format = 'DD/MM/YYYY', thaiYear = false, addMonth = 0, addDay = 0) {
  var result = '-'
  var addYear = thaiYear ? 543 : 0
  var removeYear = !thaiYear ? '' : 0
  var tmpValue = moment.utc(value).toDate()
  var tmpDate = addMonth !== 0 ? moment.addRealMonth(tmpValue) : tmpValue
  moment.addRealMonth = function addRealMonth (_value) {
    var _month = moment(_value).add(addMonth, 'month')
    var _monthEnd = moment(_month).endOf('month')
    return _value !== _month.toDate() && _month.isSame(_monthEnd.format('YYYY-MM-DD')) ? _month.add(1, 'd').toDate() : _month.toDate()
  }
  moment.locale('th')
  if (value && value !== '-') {
    switch (format) {
      case 'D':
        result = moment(tmpDate).add(addDay, 'day').format('D')
        break
      case 'DD':
        result = moment(tmpDate).add(addDay, 'day').format('DD')
        break
      case 'MMM':
        result = moment(tmpDate).format('MMM')
        break
      case 'MMMM':
        result = moment(tmpDate).add(addDay, 'day').format('MMMM')
        break
      case 'YYYY':
        result = moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'D/M/YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('D') + '/' + moment(tmpDate).format('M') + '/' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'D/MM/YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('D') + '/' + moment(tmpDate).format('MM') + '/' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'DD/MM/YY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + '/' + moment(tmpDate).format('MM') + '/' + moment(tmpDate).add(addYear, 'year').format('YY')
        break
      case 'DD/MM/YY HH:mm':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + '/' + moment(tmpDate).format('MM') + '/' + moment(tmpDate).add(addYear, 'year').format('YY') + ' ' + moment(tmpDate).format('HH:mm')
        break
      case 'DD MMM YY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YY')
        break
      case 'DD/MM/YYYY':
        if (thaiYear) {
          result = moment(tmpDate).add(addDay, 'day').format('DD') + '/' + moment(tmpDate).format('MM') + '/' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        } else if (!thaiYear) {
          result = moment(tmpDate).add(addDay, 'day').format('DD') + '/' + moment(tmpDate).format('MM') + '/' + moment(tmpDate).add(removeYear, 'year').format('YYYY')
        } else {
          result = moment(tmpDate).add(addDay, 'day').format('DD') + '/' + moment(tmpDate).format('MM') + '/' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        }
        break
      case 'DD/MMMM/YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + '/' + moment(tmpDate).format('MMMM') + '/' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'DD MM YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'DD-MM-YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + '-' + moment(tmpDate).format('MM') + '-' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'YYYY-MM-DD':
        result = moment(tmpDate).add(addYear, 'year').format('YYYY') + '-' + moment(tmpDate).format('MM') + '-' + moment(tmpDate).add(addDay, 'day').format('DD')
        break
      case 'D MMM YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('D') + ' ' + moment(tmpDate).format('MMM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'D MMMM YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('D') + ' ' + moment(tmpDate).format('MMMM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'D MMM YY':
        result = moment(tmpDate).add(addDay, 'day').format('D') + ' ' + moment(tmpDate).format('MMM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YY')
        break
      case 'DD MMM YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'DD MMMM YYYY':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMMM') + ' ' + moment(tmpDate).add(addYear, 'year').format('YYYY')
        break
      case 'DD MMM YYYY HH:mm':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMM') + ' ' +
          moment(tmpDate).add(addYear, 'year').format('YYYY') + ' ' + moment(tmpDate).format('HH:mm')
        break
      case 'DD MMM YY HH:mm':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMM') + ' ' +
          moment(tmpDate).add(addYear, 'year').format('YY') + ' ' + moment(tmpDate).format('HH:mm')
        break
      case 'DD MMM YY | HH:mm':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMM') + ' ' +
          moment(tmpDate).add(addYear, 'year').format('YY') + ' | ' + moment(tmpDate).format('HH:mm')
        break
      case 'DD MMMM YYYY HH:mm':
        result = moment(tmpDate).add(addDay, 'day').format('DD') + ' ' + moment(tmpDate).format('MMMM') + ' ' +
          moment(tmpDate).add(addYear, 'year').format('YYYY') + ' ' + moment(tmpDate).format('HH:mm')
        break
      case 'H:mm':
        result = moment(tmpDate).format('H:mm')
        break
      case 'HH:mm':
        result = moment(tmpDate).format('HH:mm')
        break
      default:
        result = 'DD/MM/YYYY'
    }
  }
  return result
}
export function calculateBirthDate(value) {
  let result = 0
  var birthDate = new Date(value)
  const currentDate = new Date()
  let month = ''
  moment.locale('th')
  if (value) {
    result = currentDate.getFullYear() - birthDate.getFullYear()
    month = currentDate.getMonth() - birthDate.getMonth() // เทียบเดือน
    if (
      month < 0 ||
      (month === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      // เช็ควันที่ กับเดือน เทียบกัน
      result--
    }
  }
  return result === 'Invalid date' ? 0 : result
}
export function toNumber(value, type) {
  let result = 0
  try {
    value = value.toString().trim()
    if (!isNaN(value)) {
      switch (type) {
        case 'int':
          result = parseInt(value)
          break
        case 'float':
          result = parseFloat(value)
          break
        default:
          result = parseFloat(value)
          break
      }
    }
    return result
  } catch (e) {
    return result
  }
}
export function noBackButtonInBrowser() {
  history.pushState(null, document.title, location.href)
  window.addEventListener('popstate', function (event) {
    history.pushState(null, document.title, location.href)
  })
}

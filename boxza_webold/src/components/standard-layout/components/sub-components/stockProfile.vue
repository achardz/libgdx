<template>
  <div id="stockProfile">
    <AlertBox ref="alertBox" />
    <v-dialog v-model="showPopupSell" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">ยืนยันข้อมูลการขายคืน</v-card-title>
        <v-card-text class="pb-2">สินค้า: {{ dataPopup.item_name }}</v-card-text>
        <v-card-text class="pb-2">ราคาขายคืน: {{ mapField(dataPopup.item_resell_price, '', '0', 0) }} ฿ บาท</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="showPopupSell = false">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" text @click="confirmActionItem('sell')">ขายคืน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showPopupSend" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">ยืนยันข้อมูลการจัดส่ง</v-card-title>
        <v-card-text class="pb-2">สินค้าที่จัดส่ง: {{ dataPopup.item_name }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="showPopupSend = false">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" text @click="confirmActionItem('send')">จัดส่ง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="stockList.length > 0">
      <div class="row" v-for="(stockItem, index) in stockList">
        <div class="action-box col-xs-6 col-sm-6 col-md-8">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3 box-image">
              <div class="imag-send-item-box">
                <v-img v-if="stockItem.item_pic" :src="stockItem.item_pic" :lazy-src="stockItem.item_pic" />
                <img v-else src="~@/assets/images/no-image.png">
              </div>
            </div>
            <div class="col-mx-12 col-sm-6 col-md-9 box-detail">
              <div class="col-12">
                <span class="item-name">{{ stockItem.item_name }}</span>
              </div>
              <div class="col-12 not-show-to-tablet">
                <span class="sub-detail-font tacking-name"><v-btn small color="error" @click="showPopupSellFunc(stockItem)">ขายคืน</v-btn></span>
                <span class="tracking-box"><v-btn small @click="showPopupSendFunc(stockItem)" color="primary">จัดส่ง</v-btn></span>
              </div>
            </div>
          </div>
          <div class="row for-tablet is-hidden-desktop">
            <div class="col-12">
              <span class="sub-detail-font tacking-name"><v-btn class="btn-tablet" small color="error" @click="showPopupSellFunc(stockItem)">ขายคืน</v-btn></span>
              <span class="tracking-box"><v-btn small class="btn-tablet" @click="showPopupSendFunc(stockItem)" color="primary">จัดส่ง</v-btn></span>
            </div>
          </div>
        </div>
        <div class="detail-box col-xs-6 col-sm-6 col-md-4 text-center">
          <div class="row">
            <div class="col-12">
              <div class="topic-detail row">
                <div class="col-7">วันที่</div>
                <div class="col-5">ราคา</div>
              </div>
              <div class="row">
                <div class="col-7 sub-detail-font">{{ mapField(stockItem.date_show, '', '-', '') }}</div>
                <div class="col-5 sub-detail-font">{{ mapField(stockItem.item_price, '', '0', 0) }} ฿</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="index < stockList.length - 1" class="line" />
      </div>
    </div>
    <div class="not-data-list" v-else>
      <span class="not-data"> คุณยังไม่มีข้อมูลการเก็บของตอนนี้ </span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/components/utility/utility'
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  import AlertBox from '~/components/general/alert-box/AlertBox'

  export default {
    name: 'StockProfile',
    components: {
      AlertBox
    },
    data () {
      return {
        loadingBeforeAddType: false,
        loading: true,
        showPopupSell: false,
        showPopupSend: false,
        dataPopup: {},
        boxType: '',
        stockList: []
      }
    },
    mounted () {
    },
    methods: {
      formatDate: formatDate,
      mapField: mapField,
      showAlert: function (value) {
        const vm = this
        const alert = {
          'mainTitle': value.title,
          'subTitle': value.text,
          'type': value.type,
          'time': value.time,
          'autoClose': value.autoClose,
          'show': value.show
        }
        vm.$refs.alertBox.showBox(alert)
      },
      showPopupSellFunc (value) {
        const vm = this
        vm.dataPopup = value
        vm.showPopupSell = true
      },
      showPopupSendFunc (value) {
        const vm = this
        vm.dataPopup = value
        vm.showPopupSend = true
      },
      confirmActionItem(action) {
        const vm = this
        const date = vm.dataPopup.date
        const time = vm.dataPopup.date
        const changeDate = `${date.slice(0, 10)} ${time.slice(11, 19)}`
        const sellItemData = {
          user_id: vm.$store.getters['auth/getProfile'].id,
          item_id: vm.dataPopup.item_id,
          date: changeDate,
          is_delivery: action === 'sell' ? 3 : 1
        }
        vm.$axios.$patch('/general/sell-item', sellItemData)
          .then((res) => {
            action === 'sell' ? vm.$store.state.authStore.auth.gold = res.data.gold : ''
            vm.showAlert({ title: 'สำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
            vm.$emit('editStockProfileUpdate', true)
            vm.showPopupSell = false
            vm.showPopupSend = false
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sub-detail-font {
    color: #8b8b8b;
  }
  @media (max-width: 767px) {
    .tacking-name, .tracking-box {
      font-size: 3.86vw;
    }
    .line {
      height: 1px;
      width: 100%;
      background: #c4c4c4;
    }
    .col-12 {
      padding: 0 !important;
    }
    .not-show-to-tablet {
      padding-top: 15px !important;
    }
    .detail-box {
      padding-top: 0 !important;
      .col-6 {
        padding: 0 !important;
      }
    }
    .for-tablet {
      display: none !important;
    }
  }
  @media (width: 768px) {
    .action-box {
      .not-show-to-tablet {
        display: none;
      }
      .box-image {
      }
      .box-detail {
        padding: 0;
        .col-12 {
          padding: 8px 0;
        }
      }
      .item-name {
        font-size: 11px;
      }
      .for-tablet {
        .col-12 {
          padding-top: 0px;
        }
      }
      .sub-detail-font, .tracking-box {
        .btn-tablet {
          height: 25px;
          min-width: 35px;
          font-size: 11px;
          padding: 0 7px;
        }
      }
    }
    .detail-box {
      padding: 3px;
      font-size: 12px;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 1023px) {
    .not-show-to-tablet {
      display: none;
    }
    .for-tablet {
      font-size: 1.7vw;
      .col-12 {
        padding-top: 0px;
      }
    }
  }
  #stockProfile {
    margin-top: 1px;
    height: 100%;
    .imag-send-item-box {
      /*height: 100%;*/
      padding: 2px;
      border: 1px solid #c4c4c4;
    }
    .item-name {
      font-weight: bold;
    }
    .detail-box {
      .topic-detail {
        font-weight: bold;
      }
    }
    .not-data-list {
      justify-content: center;
      align-items: center;
      display: flex;
      height: 100%;
      .not-data {
        font-size: 18px;
        font-weight: bold;
        font-style: italic;
      }
    }
  }
</style>

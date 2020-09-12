<template>
  <div id="sendItemProfile">
    <AlertBox ref="alertBox" />
    <div v-if="deliveryList.length > 0">
      <div class="row" v-for="(delivery, index) in deliveryList">
        <div class="col-xs-6 col-sm-6 col-md-8">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3">
              <div class="imag-send-item-box">
                <v-img v-if="delivery.item_pic" :src="delivery.item_pic" :lazy-src="delivery.item_pic" />
                <img v-else src="~@/assets/images/no-image.png">
              </div>
            </div>
            <div class="col-mx-12 col-sm-6 col-md-9">
              <div class="col-12 box-name">
                <span class="item-name">{{ delivery.item_name }}</span>
              </div>
              <div class="col-12 not-show-to-tablet">
                <span class="sub-detail-font tacking-name">Tacking Number</span>
                <span v-if="delivery.tax" class="tracking-box">{{ delivery.tax }}</span>
                <span v-else class="tracking-box waiting-status">รอการจัดส่ง</span>
              </div>
            </div>
          </div>
          <div class="row for-tablet is-hidden-desktop">
            <div class="col-12">
              <span class="sub-detail-font tacking-name">Tacking Number</span>
              <span v-if="delivery.tax" class="tracking-box">{{ delivery.tax }}</span>
              <span v-else class="tracking-box waiting-status">รอการจัดส่ง</span>
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
                <div class="col-7 sub-detail-font">{{ mapField(delivery.date_show, '', '-') }}</div>
                <div class="col-5 sub-detail-font">{{ mapField(delivery.item_price, '', '0', 0) }} ฿</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="index < deliveryList.length - 1" class="line" />
      </div>
    </div>
    <div class="not-data-list" v-else>
      <span class="not-data"> คุณยังไม่มีข้อมูลการจัดส่งตอนนี้ </span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/components/utility/utility'
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  import AlertBox from '~/components/general/alert-box/AlertBox'

  export default {
    name: 'sendItemProfile',
    components: {
      AlertBox
    },
    data () {
      return {
        loadingBeforeAddType: false,
        loading: true,
        boxType: '',
        deliveryList: []
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
    .box-name {
      padding: 0;
      .item-name {
        font-size: 11px;
      }
    }
    .row.for-tablet.is-hidden-desktop {
      font-size: 11px;
    }
    .detail-box {
      font-size: 11px;
      .topic-detail {
        .col-6 {
          padding-top: 8px;
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) {
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
  #sendItemProfile {
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
    .tracking-box {
      color: white;
      padding: 3px 10px;
      border-radius: 15px;
      background: rgba(65, 132, 255, 0.72);
    }
    .waiting-status {
      background: #fec72e !important;
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

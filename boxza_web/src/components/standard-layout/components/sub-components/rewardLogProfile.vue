<template>
  <div id="rewardLogProfile">
    <AlertBox ref="alertBox" />
    <div v-if="rewardLogList.length > 0">
      <div class="row" v-for="(rewardLog, index) in rewardLogList">
        <div class="col-xs-6 col-sm-6 col-md-7">
          <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-7">
              <div class="imag-send-item-box">
                <v-img v-if="rewardLog.item_pic" :src="rewardLog.item_pic" :lazy-src="rewardLog.item_pic" />
                <img v-else src="~@/assets/images/no-image.png">
              </div>
            </div>
            <div class="col-mx-12 col-sm-5 col-md-5">
              <div class="box-name col-12">
                <span class="item-name">สถานะ :</span>
                <span class="sub-detail-font tacking-name">{{ rewardLog.status }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-box col-xs-6 col-sm-6 col-md-4 text-center">
          <div class="row">
            <div class="col-12">
              <div class="topic-detail row">
                <div class="col-6">วัน | เวลา</div>
                <div class="col-6">ราคา</div>
              </div>
              <div class="row">
                <div class="col-6 sub-detail-font date-time">
                  {{ mapField(rewardLog.date_show, '', '-') }} | {{ mapField(rewardLog.time_show, '', '-') }}
                </div>
                <div class="col-6 sub-detail-font" v-if="rewardLog.status !== 'ขาย'">{{ mapField(rewardLog.item_price, '', '0', 0) }} ฿</div>
                <div class="col-6 sub-detail-font" v-else>{{ mapField(rewardLog.item_resell_price, '', '0', 0) }} ฿</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="index < rewardLogList.length - 1" class="line" />
      </div>
    </div>
    <div class="not-data-list" v-else>
      <span class="not-data"> คุณยังไม่มีข้อมูลการได้รับรางวัลตอนนี้ </span>
    </div>
  </div>
</template>

<script>
  import { formatDate } from '~/components/utility/utility'
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  import AlertBox from '~/components/general/alert-box/AlertBox'

  export default {
    name: 'rewardLogProfile',
    components: {
      AlertBox
    },
    data () {
      return {
        loadingBeforeAddType: false,
        loading: true,
        boxType: '',
        rewardLogList: []
      }
    },
    mounted () {
      this.getReward()
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
      // ช่องเก็บของ
      getReward() {
        const vm = this
        vm.$axios.$get('/user-profile/reward', { params: { 'user_id': vm.$store.getters['auth/getProfile'].id } })
          .then((res) => {
            vm.rewardLogList = res.data.user_paymen
            vm.rewardLogList.map((data, i) => {
              vm.rewardLogList[i].date_show = data.date_show.slice(0, 8)
              vm.rewardLogList[i].time_show = data.time_show.slice(0, 5)
              switch (vm.rewardLogList[i].status) {
                case 'add': vm.rewardLogList[i].status = 'เข้าคลัง'
                  break
                case 'buy': vm.rewardLogList[i].status = 'ซื้อ'
                  break
                case 'sell': vm.rewardLogList[i].status = 'ขาย'
                  break
              }
            })
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
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
    .detail-box {
      font-size: 3.86vw;
      .topic-detail {
        .col-6 {
          padding-top: 3px;
        }
      }
    }
    .date-time {
      align-items: center;
      display: flex;
      justify-content: center;
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
      .item-name, .tacking-name {
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
  @media (width: 1024px) {
    .box-name {
      padding: 0;
      .item-name, .tacking-name {
        font-size: 14px;
      }
    }
    .detail-box {
      font-size: 14px;
      .topic-detail {
        .col-6 {
          padding-top: 3px;
        }
      }
    }
    .date-time {
      align-items: center;
      display: flex;
      justify-content: center;
      font-size: 11px;
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
  #rewardLogProfile {
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

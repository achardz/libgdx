<template>
  <div id="topUpForm">
    <AlertBox ref="alertBox" />
    <registerModal ref="loginShow" v-if="openRegisterModal" v-on:dialog="openRegisterModal = $event" />
    <payPal ref="loginShow" v-if="openPayPalModal" v-on:dialog="openPayPalModal = $event" />
    <div class="columns">
      <div class="column">
        <div class="true-money-box">
          <span class="top-up-form-title true-money-title">เติมเงิน ทรูมันนี่</span>
          <img id="trueMoney" src="~@/assets/images/icon/true-money-logo.png" alt="trueMoney">
          <p>
            <span>รหัสบัตรเงินสดทรูมันนี่</span>
            <a class="click-box" href="https://www.truemoney.com/game-topup/" target="_blank" rel="noopener">
              วิธีการซื้อด้วยบัตรทรูมันนี่
            </a>
          </p>
          <div class="true-money-input-form">
            <input class="true-money-input" v-model="trueMoneyCode" placeholder="โปรดกรอกรหัส 14 หลัก"
                   oninput="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="14" @keyup.enter="sendTrueMoney">
            <button type="button" class="btn btn-primary button-box true-money-button" @click="sendTrueMoney" v-if="!loading">เติมเงิน</button>
          </div>
          <p>
            <span>*การชำระเงินผ่านทรูมันนี่ มีค่าธรรมเนียม 14.9% หักจากยอดเงินที่เติม</span>
            <a class="click-box" href="https://www.facebook.com/" target="_blank">(แจ้งปัญหา)</a>
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="pay-pal">
          <label class="top-up-form-title pay-pal-title">เติมเงิน เพย์โซลูชั่น</label>
          <img id="payPal" src="~@/assets/images/icon/paypal-logo-payment.png" alt="payPal">
          <button type="button" class="btn btn-primary button-box" @click="openPaypalModalCheck">เติมเงิน</button>
          <p>
            <span>*การชำระผ่านเพย์โซลูชั่น มีค่าธรรมเนียม 4.0% หักจากยอดเงินที่เติม</span>
            <a class="click-box" href="https://www.facebook.com/" target="_blank">(แจ้งปัญหา)</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import payPal from '~/components/top-up/PayPalModal'
  import registerModal from '~/components/standard-layout/components/RegisterAndLoginModal'
  import AlertBox from '~/components/general/alert-box/AlertBox'
  export default {
    name: 'TopUpForm',
    components: {
      registerModal,
      payPal,
      AlertBox
    },
    data () {
      return {
        openRegisterModal: false,
        openPayPalModal: false,
        trueMoneyCode: '',
        loading: false
      }
    },
    mounted () {},
    methods: {
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
      sendTrueMoney () {
        const vm = this
        // if (!this.$store.getters['auth/getProfile']) {
        //   const vm = this
        //   vm.openRegisterModal = true
        //   vm.$nextTick(() => {
        //     vm.$refs.loginShow.loginFlag = true
        //   })
        // } else {
          // console.log(this.$store.getters['auth/getProfile'])
          if (vm.trueMoneyCode.length === 14) {
            const vm = this
            vm.loading = true
            const trueMoneyData = {
              user_id: this.$store.getters['auth/getProfile'].id,
              card_point: vm.trueMoneyCode
            }
            vm.$axios.$post('/top-up/truemoney', trueMoneyData)
              .then((res) => {
                if (res.data.status === 'error') {
                  vm.showAlert({ title: 'ผิดพลาด!', text: res.data.message, type: 'error', time: 5, autoClose: true, show: true })
                } else {
                  vm.$store.state.authStore.auth.gold = res.data.gold
                  vm.showAlert({ title: 'สำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
                }
              })
              .catch((e) => {
                if (e.response) {
                  vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
                }
              })
              .finally(() => {
                vm.loading = false
              })
          } else {
            vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกรหัสบัตรให้ครบ 14 หลัก', type: 'warning', time: 5, autoClose: true, show: true })
          }
        // }
      },
      openPaypalModalCheck () {
        const vm = this
        if (!this.$store.getters['auth/getProfile']) {
          const vm = this
          vm.openRegisterModal = true
          vm.$nextTick(() => {
            vm.$refs.loginShow.loginFlag = true
          })
        } else {
          vm.openPayPalModal = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin fontNav($size, $weight, $color, $style) {
    font-family: 'Prompt-Regular';
    font-size: $size;
    font-weight: $weight;
    font-style: $style;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: $color;
  }
  #topUpForm {
    .top-up-form-title {
      @include fontNav(24px, bold, black, italic);
    }
    .click-box {
      color: blue;
      border-bottom: 1px solid currentColor;
      &:hover {
        cursor: pointer;
        text-decoration: none;
      }
    }
    .button-box {
      min-width: 80px;
      @include fontNav(16px, normal, white, normal);
    }
    .btn-primary:focus, .btn-primary.focus {
      box-shadow: none;
    }
    .true-wallet-box {
      margin-top: -11px;
      margin-bottom: 10px;
      padding: 20px;
      background-color: #e7f5ff;
      @include fontNav(16px, normal, black, normal);
      .true-wallet-img {
        margin-right: 10px;
      }
    }
    .true-money-box {
      margin-top: 20px;
      .true-money-title {
        margin-right: 10px;
      }
      .true-money-input-form {
        margin: 10px 0;
        display: flex;
        align-items: center;
        .true-money-input {
          width: 100%;
          max-width: 250px;
        }
        .true-money-button {
          margin-left: 10px;
        }
      }
    }
    .pay-pal {
      margin-top: 20px;
      .pay-pal-title {
        margin-right: 10px;
        margin-bottom: 5px;
      }
    }
  }
</style>
<style>
  .paypal-button:not(.paypal-button-card) {
    height: 36px !important;
    max-height: 36px !important;
    min-height: 36px !important;
  }
</style>

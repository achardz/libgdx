<template>
  <div id="payPalModal">
    <AlertBox ref="alertBox" />
    <v-row justify="center">
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <v-card id="payPalCard">
          <div class="close-icon">
            <v-icon class="icon" @click="dialog = false">mdi-close-circle</v-icon>
          </div>
          <v-card-title class="title-card pl-0 pr-0 ml-auto mr-auto">เลือกจำนวนเงินที่ต้องการเติม</v-card-title>
          <v-divider class="mb-0 mt-0" />
          <v-card-text class="pb-0" style="height: 250px;">
            <v-radio-group v-model="payPalAmount" column>
              <v-radio label="50 ฿" value="50" />
              <v-radio label="100 ฿" value="100" />
              <v-radio label="200 ฿" value="200" />
              <v-radio label="300 ฿" value="300" />
              <v-radio label="500 ฿" value="500" />
              <v-radio label="1000 ฿" value="1000" />
            </v-radio-group>
          </v-card-text>
          <v-divider class="mt-0" />
          <v-card-actions class="paypal-btn-box">
            <client-only>
              <paypal-checkout
                env="sandbox"
                :client="paypal"
                :amount="payPalAmount"
                currency="THB"
                locale="th_TH"
                @payment-completed="paymentCompleted($event)"
                @payment-cancelled="paymentCancelled($event)" />
            </client-only>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import AlertBox from '~/components/general/alert-box/AlertBox'

  export default {
    name: 'PayPalModal',
    components: {
      AlertBox
    },
    data () {
      return {
        dialog: true,
        payPalAmount: '50',
        paypal: {
          sandbox: 'AfhifLo5bntuUB76_Fq9GZri568Mfu4lZAzWQzNvvKfqV75FUXA4R_gjF2OORTpVu4Mb7O4-YLKz8o9j'
        }
      }
    },
    watch: {
      dialog () {
        const vm = this
        vm.$emit('dialog', vm.dialog)
      }
    },
    mounted() {},
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
      paymentCompleted (value) {
        const vm = this
        const payPalData = {
          userId: this.$store.getters['auth/getProfile'].id,
          status: value.state,
          payPalId: value.payer.payer_info.payer_id,
          createTime: value.create_time,
          paymentId: value.id,
          amount: +value.transactions[0].related_resources[0].sale.amount.total
        }
        vm.$axios.$post('/top-up/paypal', payPalData)
          .then((res) => {
            vm.$store.state.authStore.auth.gold = res.data.gold
            vm.showAlert({ title: 'สำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
            setTimeout(() => {
              vm.dialog = false
            }, 2000)
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
          })
      },
      paymentCancelled (value) {
        const vm = this
        vm.dialog = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #payPalCard {
    padding: 10px;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    .close-icon {
      text-align: right;
      margin-right: 5px;
    }
    .title-card {
      font-size: 16px;
    }
    .paypal-btn-box {
      display: flex;
      justify-content: center;
    }
  }
</style>

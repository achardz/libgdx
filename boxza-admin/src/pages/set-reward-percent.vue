<template>
  <v-layout>
    <v-flex class="text-center">
      <AlertBox ref="alertBox" />
      <v-row class="text-left">
        <v-col cols="12">
          <p>ระดับความยาก</p>
          <v-overflow-btn
            class="my-2"
            :loading="loading"
            :items="selectRateList"
            v-model="selectedRate"
            label="กรุณาเลือกระดับความยาก"
            target="#dropdown-example"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-text-field type="number" class="input-percent" label="โอกาศการได้รับของรางวัล (%)" v-model="ratingPercent"></v-text-field>
      <v-btn x-large color="info" dark @click="sendSetting()" :loading="loadingBeforeSendSetting">ส่งข้อมูลการตั้งค่า<v-icon right>mdi-cloud-upload</v-icon></v-btn>
      <blockquote class="blockquote">
        <v-data-table
          :loading="loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="rewardRates"
          :items-per-page="4"
          item-key="id"
          class="elevation-1">
        </v-data-table>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>
  import AlertBox from '~/components/general/alert-box/AlertBox'
  export default {
    name: 'set-reward-percent',
    components: {
      AlertBox
    },
    data () {
      return {
        loading: true,
        loadingBeforeSendSetting: false,
        ratingPercent: '',
        selectedRate: null,
        headers: [
          { text: 'ลำดับที่', align: 'left', value: 'id' },
          { text: 'ระดับความยาก', align: 'left', value: 'rating_name' },
          { text: 'โอกาศการได้รับของรางวัล (%)', align: 'left', value: 'rating_percent' }
        ],
        rewardRates: [],
        selectRateList: []
      }
    },
    mounted () {
      this.getRates()
    },
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
      sendSetting () {
        const vm = this
        vm.ratingPercent = parseFloat(vm.ratingPercent)
        const bodyRats = { id: vm.selectedRate, rating_percent: vm.ratingPercent}
        if (vm.ratingPercent && vm.selectedRate) {
          vm.loadingBeforeSendSetting = true
          vm.$axios.$patch('/item-rates/rates', bodyRats)
          .then((res) => {
            vm.boxType = ''
            vm.showAlert({
              title: 'สำเร็จ',
              text: 'เพิ่มข้อมูลสำเร็จ',
              type: 'success',
              time: 5,
              autoClose: true,
              show: true
            })
            vm.selectedRate = null
            vm.ratingPercent = ''
            vm.getRates()
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({
                title: 'ผิดพลาด!',
                text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
                type: 'error',
                time: 5,
                autoClose: true,
                show: true
              })
            }
          })
          .finally(() => {
            vm.loadingBeforeSendSetting = false
          })
        } else {
          vm.showAlert({
            title: 'คำเตือน!',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            type: 'warning',
            time: 5,
            autoClose: true,
            show: true
          })
        }
      },
      getRates () {
        const vm = this
        vm.loading = true
        vm.$axios.$get('/general/rates')
          .then((res) => {
            vm.rewardRates = res.data.rate
            for (let i = 0; i < vm.rewardRates.length; i++) {
              vm.selectRateList.push({ text: vm.rewardRates[i].rating_name, value: vm.rewardRates[i].id })
            }
          })
          .catch((e) => {
            if (e.response) {
              vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
                type: 'error', time: 5, autoClose: true, show: true })
            }
          })
          .finally(() => {
            vm.loading = false
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .input-percent {
    margin-top: -35px;
  }
</style>

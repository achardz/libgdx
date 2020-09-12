<template>
  <v-layout>
    <AlertBox ref="alertBox" />
    <v-flex class="text-center">
      <blockquote class="blockquote">
        <v-data-table
          :loading="loading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="stockImageList"
          :items-per-page="15"
          item-key="id"
          class="elevation-1">
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Tracking number</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="trackingNumber" label="กรุณากรอก Tracking number"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small @click="editItem(item)" > mdi-square-edit-outline </v-icon>
          </template>
        </v-data-table>
      </blockquote>
    </v-flex>
  </v-layout>
</template>
<script>
  import AlertBox from '~/components/general/alert-box/AlertBox'
  export default {
    name: 'status-item',
    components: {
      AlertBox
    },
    data () {
      return {
        loading: true,
        dialog: false,
        desserts: [],
        headers: [
          { text: 'ลำดับที่', align: 'left', value: 'no' },
          { text: 'ชื่อผู้ใช้', align: 'left', value: 'firstname' },
          { text: 'ชื่อสินค้า', align: 'left', value: 'item_name' },
          { text: 'Tracking number', align: 'left', value: 'action', sortable: false }
        ],
        trackingId: '',
        trackingNumber: '',
        stockImageList: [],
        updateTrackingData: {
          id: '',
          tracking_number: ''
        }
      }
    },
    mounted () {
      this.getStatusTracking()
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
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
      editItem (item) {
        const vm = this
        vm.trackingId = item.id
        vm.dialog = true
      },
      close () {
        const vm = this
        vm.dialog = false
        vm.trackingId = ''
      },
      save () {
        const vm = this
        const dataTracking = {
          'id': vm.trackingId,
          'tracking_number': vm.trackingNumber
        }
        if (vm.trackingId && vm.trackingNumber) {
          vm.$axios.$patch('/status-item/tracking', dataTracking)
          .then((res) => {
            vm.showAlert({
              title: 'สำเร็จ',
              text: 'บันทึกเลข Tracking สำเร็จ',
              type: 'success',
              time: 5,
              autoClose: true,
              show: true
            })
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
            vm.getStatusTracking()
            vm.close()
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
      getStatusTracking () {
        const vm = this
        vm.loading = true
        vm.$axios.$get('/status-item/stock')
          .then((res) => {
            vm.stockImageList = res.data.stock
            vm.stockImageList.map((value, index) => {
              const no = { no: index+1 }
              vm.stockImageList[index] = {...no, ...value}
            })
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
            vm.loading = false
          })
      }
    }
  }
</script>

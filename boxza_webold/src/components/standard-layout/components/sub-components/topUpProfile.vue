<template>
  <div id="topUpProfile">
    <div class="columns" v-if="detailTopUp.length > 0">
      <div class="column">
        <div id="table" class="table-box">
          <div id="customTableScroll" class="table-scroll">
            <table id="customTable">
              <thead id="customHeader" class="header-table">
                <tr class="row-header-box">
                  <template v-for="(columnHeader, columnHeaderIndex) in headerTopUp">
                    <th class="column-header-box" :key="columnHeaderIndex" scope="col">
                      <div class="topic-column">{{ columnHeader.name }}</div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="body-table">
                <tr v-for="(rowDetail, rowKey) in detailTopUp" :key="rowKey">
                  <td class="center-text"> <span>{{ mapField(rowDetail.method, '', '') }}</span> </td>
                  <td class="center-text"> <span>{{ mapField(rowDetail.amount, '', '0', 0) }}</span> </td>
                  <!-- <td class="center-text"> <span>{{ mapField(rowDetail.gAmount, '', '0', 0) }}</span> </td>-->
                  <td class="center-text"> <span>{{ mapField(rowDetail.date_show, '', '') }}</span> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="not-data-top-up" v-else>
      <span class="not-data"> คุณยังไม่มีข้อมูลการเติมเงินตอนนี้ </span>
      <v-btn class="btn-top-up-profile" to="/top-up" @click="closeDialog()">
        <span class="button-text">เติมเงิน</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  export default {
    name: 'topUpProfile',
    components: {},
    data () {
      return {
        headerTopUp: [
          { name: 'ประเภท' },
          { name: 'เงินที่เติม' },
          // { name: 'G ที่ได้' },
          { name: 'วันที่เติม' }
        ],
        detailTopUp: [
          // { type: 'ทรูมันนี่', topUpMoney: 50, gAmount: 42, date: '15/10/2560' },
          // { type: 'paypal', topUpMoney: 100, gAmount: 72, date: '15/10/2560' },
          // { type: 'ทรูมันนี่', topUpMoney: 300, gAmount: 255, date: '15/10/2560' }
        ]
      }
    },
    mounted () {
      this.getTopUp()
    },
    methods: {
      mapField: mapField,
      closeDialog: function () {
        const vm = this
        vm.$emit('closeDialog', false)
      },
      getTopUp() {
        const vm = this
        vm.itemList = []
        vm.$axios.$get('/user-profile/top-up', { params: { 'user_id': vm.$store.getters['auth/getProfile'].id } })
          .then((res) => {
            vm.detailTopUp = res.data.payment_history
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
  @mixin fontTable($size, $weight, $color) {
    font-family: 'Prompt-Regular';
    font-size: $size;
    font-weight: $weight;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: $color;
  }
  @mixin button($colorOne, $colorTwo) {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to top right, $colorOne, $colorTwo);
    border-radius: 2px;
  }
  @media (max-width: 320px) {
    .not-data {
      font-size: 14px !important;
    }
  }
  #topUpProfile {
    position: relative;
    height: 100%;
    display: grid;
    .not-data-top-up {
      text-align: center;
      margin: auto;
      .not-data {
        font-size: 18px;
        font-weight: bold;
        font-style: italic;
      }
      .btn-top-up-profile {
        height: 40px !important;
        width: 120px !important;
        text-decoration: none;
        font-size: calc(100% - 0vw);
        margin: 20px auto;
        @include button(#70d8d8, #00daf0);
        &:hover {
          @include button(#47bbbb, #04c0d3);
        }
      }
    }
    .table-box {
      position: relative;
      .table-scroll {
        position: relative;
        width: 100%;
        overflow: hidden;
        /*max-height: 804px;*/
        /*min-width: 573px;*/
        /*max-width: 1590px;*/
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-bottom: 1px solid #c4c4c4;
        margin-left: 0px;
        table {
          min-width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          .header-table {
            .row-header-box {
              .column-header-box {
                z-index: 3;
                border-top: none !important;
                height: 36px;
                border-right: 1px solid #c4c4c4;
                padding: 10px 0px;
                border-bottom: 0px;
                vertical-align: top;
                vertical-align: middle;
                background: #d29a5440;
                color: #fff;
                position: sticky;
                top: 0;
                .topic-column {
                  @include fontTable(1.2vh, bold, black);
                  padding: 0px 10px;
                  display: flex;
                  align-items: center;
                  vertical-align: middle;
                  justify-content: center;
                }
              }
            }
            .row-header-box .column-header-box:last-child {
              border-top-right-radius: 4px;
              border-right: 0;
            }
          }
          .body-table {
            width: 100%;
            position: relative;
            tr:nth-child(even) {background: #ffffff}
            tr:nth-child(odd) {background: #f5f9fb}
            // fix style column content
            td:first-child {
              border-left: 1px solid #c4c4c4;
            }
            td {
              padding: 5px 10px;
              line-height: 1.3;
              border-right: 1px solid #c4c4c4;
              border-bottom: 0px;
              vertical-align: top;
              vertical-align: middle;
              text-align: center;
              word-break: break-all !important;
              span {
                @include fontTable(1.2vh, normal, #333333);
              }
              .active-text {
                color: #60b58e !important;
              }
              .not-active-text {
                color: #c86d6d !important;
              }
            }
          }
        }
      }
    }
  }
</style>

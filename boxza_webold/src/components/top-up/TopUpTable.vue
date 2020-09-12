<template>
  <div id="topUpTable">
    <div class="columns">
      <div class="column">
        <div id="table" class="table-box">
          <div id="customTableScroll" class="table-scroll">
            <table id="customTable">
              <thead id="customHeader" class="header-table">
                <tr class="row-header-box">
                  <template v-for="(columnHeader, columnHeaderIndex) in trueMoneyheaderTable">
                    <th class="column-header-box" :key="columnHeaderIndex" scope="col">
                      <div class="topic-column">{{ columnHeader.name }}</div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="body-table">
                <tr v-for="(rowDetail, rowKey) in trueMoneyList" :key="rowKey">
                  <td class="center-text"> <span>{{ mapField(rowDetail.trueMoneyAmount, '', '0', 0) }}</span> </td>
                  <td class="center-text"> <span>{{ mapField(rowDetail.gAmount, '', '0', 0) }}</span> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div id="table" class="table-box">
          <div id="customTableScroll" class="table-scroll">
            <table id="customTable">
              <thead id="customHeader" class="header-table">
                <tr class="row-header-box">
                  <template v-for="(columnHeader, columnHeaderIndex) in payMoneyListheaderTable">
                    <th class="column-header-box" :key="columnHeaderIndex" scope="col">
                      <div class="topic-column">{{ columnHeader.name }}</div>
                    </th>
                  </template>
                </tr>
              </thead>
              <tbody class="body-table">
                <tr v-for="(rowDetail, rowKey) in payMoneyList" :key="rowKey">
                  <td class="center-text"> <span>{{ mapField(rowDetail.payMoneyAmount, '', '0', 0) }}</span> </td>
                  <td class="center-text"> <span>{{ mapField(rowDetail.gAmount, '', '0', 0) }}</span> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mapField from '~/components/general/format-not-null/FormatNotNull'
  export default {
    name: 'TopUpTable',
    components: {},
    data () {
      return {
        trueMoneyheaderTable: [
          { name: 'บัตรทรู (฿)' },
          { name: 'G ที่ได้' }
        ],
        payMoneyListheaderTable: [
          { name: 'เงินที่เติม (฿)' },
          { name: 'G ที่ได้' }
        ],
        trueMoneyList: [
          { trueMoneyAmount: 50, gAmount: 42 },
          { trueMoneyAmount: 90, gAmount: 76 },
          { trueMoneyAmount: 150, gAmount: 127 },
          { trueMoneyAmount: 300, gAmount: 255 },
          { trueMoneyAmount: 500, gAmount: 425 },
          { trueMoneyAmount: 1000, gAmount: 851 }
        ],
        payMoneyList: [
          { payMoneyAmount: 50, gAmount: 48 },
          { payMoneyAmount: 100, gAmount: 96 },
          { payMoneyAmount: 200, gAmount: 192 },
          { payMoneyAmount: 300, gAmount: 288 },
          { payMoneyAmount: 500, gAmount: 480 },
          { payMoneyAmount: 1000, gAmount: 960 }
        ]
      }
    },
    mounted () {},
    methods: {
      mapField: mapField
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
  #topUpTable {
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
                width: 50%;
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
                  @include fontTable(14px, bold, black);
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
                @include fontTable(12px, normal, #333333);
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

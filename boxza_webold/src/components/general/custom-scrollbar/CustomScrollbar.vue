<template>
  <div :class="type" v-if="showScrollY || showScrollX">
    <div v-if="showScrollY" id="scrollbarY" class="scrollbar-y scrollbar-dynamic" @scroll="customScrollY()">
      <div id="scrollY" />
    </div>
    <div v-if="showScrollX" id="scrollbarX" class="scrollbar-x scrollbar-dynamic" @scroll="customScrollX()">
      <div id="scrollX" />
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CustomScrollbar',
    components: {},
    props: {
      scrollType: { type: String, default: '' },
      rowUpdate: { type: Number, default: 0 },
      scrollMargin: { type: Object,
        default: () => ({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        })
      },
      scrollPadding: { type: Object,
        default: () => ({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        })
      }
    },
    data () {
      return {
        update: '',
        dragging: false,
        showScrollY: false,
        showScrollX: false,
        type: this.scrollType
      }
    },
    watch: {
      rowUpdate: function () {
        this.customScrollStyle()
      }
    },
    mounted () {
      setTimeout(() => {
        this.customScrollStyle()
      }, 100)
      document.getElementById('customTable').addEventListener('wheel', (e) => {
        if (!e.cancelable) {
          if (window.event.shiftKey && this.showScrollX) {
            document.getElementById('scrollbarX').scrollLeft += Math.floor(e.deltaY)
            document.getElementById('customTableScroll').scrollLeft = document.getElementById('scrollbarX').scrollLeft
          } else if (this.showScrollY) {
            document.getElementById('scrollbarY').scrollTop += Math.floor(e.deltaY)
            document.getElementById('customTableScroll').scrollTop = document.getElementById('scrollbarY').scrollTop
          }
        }
      }, {
        passive: true
      })
    },
    methods: {
      customScrollStyle: function () {
        const vm = this
        setImmediate(() => {
          const flagHeader = document.getElementById('customHeader').offsetHeight
          const tBodyHeight = document.getElementById('customTable').offsetHeight
          const tBodyWidth = document.getElementById('customTable').offsetWidth
          const tableMaxHeight = document.getElementById('customTableScroll').offsetHeight
          const tableMaxWidth = document.getElementById('customTableScroll').offsetWidth
          // เช็คว่าต้องการให้ scroll เกิดตอนไหน
          tBodyHeight > tableMaxHeight ? vm.showScrollY = true : vm.showScrollY = false
          tBodyWidth > tableMaxWidth ? vm.showScrollX = true : vm.showScrollX = false
          setImmediate(() => {
            if (vm.showScrollY) {
              document.getElementById('scrollbarY').style.top = `${flagHeader}px`
              document.getElementById('scrollbarY').style.height = `calc(100% - ${flagHeader}px)`
              // หาความยาวของกล่อง แกน Y
              document.getElementById('scrollY').style.height = `${(tBodyHeight - (flagHeader + (vm.scrollPadding.bottom * 2)))}px`
            }
            if (vm.showScrollX) {
              // หาความกว้างของกล่อง แกน X
              document.getElementById('scrollX').style.width = `${tBodyWidth - (vm.scrollPadding.right * 2)}px`
            }
            // config ระยะห่างของสกอ กับ กล่องตาราง
            const scrollConfig = (marginBottom, marginRight, padding) => {
              if (vm.showScrollX) {
                document.getElementById('scrollbarX').style.bottom = `${marginBottom}px`
                document.getElementById('scrollbarX').style.left = `${padding.left}px` // padding แกน X แนวนอน padding ซ้าย
                document.getElementById('scrollbarX').style.width = `calc(100% - ${padding.right * 2}px)` // padding แกน X แนวนอน padding ขวา
              }
              if (vm.showScrollY) {
                document.getElementById('scrollbarY').style.right = `${marginRight}px`
                document.getElementById('scrollbarY').style.top = `${flagHeader + padding.top}px` // padding แกน Y แนวตั้ง padding บน
                document.getElementById('scrollbarY').style.height = `calc(100% - ${(flagHeader + (padding.bottom * 2))}px)` // padding แกน Y แนวตั้ง padding ล่าง
              }
            }
            // เช็ค type ก่อนที่จะนำค่าไป config scroll จากข้างบน
            switch (vm.type) {
              case 'in-side':
                scrollConfig(vm.scrollMargin.bottom, vm.scrollMargin.right, vm.scrollPadding)
                break
              case 'new-scroll':
                vm.scrollPadding.top === 0 ? vm.scrollPadding.top = 1 : vm.scrollPadding.top
                vm.scrollPadding.bottom === 0 ? vm.scrollPadding.bottom = 1 : vm.scrollPadding.bottom
                vm.scrollMargin.bottom === 0 ? vm.scrollMargin.bottom = 1 : vm.scrollMargin.bottom
                vm.scrollMargin.right === 0 ? vm.scrollMargin.right = 1 : vm.scrollMargin.right
                scrollConfig(vm.scrollMargin.bottom, vm.scrollMargin.right, vm.scrollPadding)
                break
              case 'out-side':
                scrollConfig((-8 + (-vm.scrollMargin.top)), (-8 + (-vm.scrollMargin.left)), vm.scrollPadding)
                break
            }
          })
        })
      },
      customScrollY: function () {
        const vm = this
        document.getElementById('customTableScroll').scrollTop = document.getElementById('scrollbarY').scrollTop
      },
      customScrollX: function () {
        const vm = this
        document.getElementById('customTableScroll').scrollLeft = document.getElementById('scrollbarX').scrollLeft
      }
    }
  }
</script>
<style lang="scss" scoped>
  .scrollbar-y {
    top: 0;
    height: 100%;
    right: 2px;
    width: 10px;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
  }
  .scrollbar-x {
    bottom: 6px;
    height: 10px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
  }
  #scrollbarX {
    left: 8px;
    width: calc(100% - 16px);
    #scrollX {
      height: 1px;
    }
  }
  .scrollbar-dynamic::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    border-radius: 6px;
  }
  .scrollbar-dynamic::-webkit-scrollbar-track {
    border-radius: 6px;
  }
  .new-scroll {
    .scrollbar-dynamic:hover::-webkit-scrollbar {
      height: 10px;
      width: 10px;
      border-radius: 6px;
    }
    .scrollbar-dynamic:hover::-webkit-scrollbar-track {
      background-color: #e2e2e2;
      border-radius: 6px;
    }
    .scrollbar-dynamic:hover::-webkit-scrollbar-thumb {
      border-radius: 6px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #6793bc;
    }
  }
  .out-side, .in-side {
    .scrollbar-dynamic::-webkit-scrollbar-track {
      background-color: #e2e2e2;
      border-radius: 6px;
    }
  }
</style>
<style lang="scss">
  #table {
    .out-side, .in-side {
      .scrollbar-dynamic::-webkit-scrollbar-thumb {
        border-radius: 6px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #6793bc;
      }
    }
  }
  #table {
    .new-scroll {
      opacity: .0;
      transition: opacity .5s ease-out;
      .scrollbar-dynamic::-webkit-scrollbar-thumb {
        border-radius: 6px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #6793bc;
      }
    }
  }
  #table:hover {
    .new-scroll {
      opacity: 1;
      transition: opacity 0s ease-out;
      .scrollbar-dynamic::-webkit-scrollbar-thumb {
        border-radius: 6px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
        background-color: #6793bc;
      }
    }
  }
</style>

<template>
  <div :id="`selectBox_${name}`" class="select-box">
    <label class="form-text" :for="`inputBox_${name}`">{{ topicName }}</label>
    <div :id="`customBox_${name}`" class="custom-box desktop-font">
      <div class="select-div">
        <input ref="selectInput"
               :id="`inputBox_${name}`"
               v-click-outside="outside"
               @focus="toggleSelectBox"
               @blur="blurEle"
               type="text"
               class="width-100"
               :class="{ 'is-invalid': config.isInvalid }"
               :placeholder="config.placeholder"
               :value="showData"
               :disabled="disable"
               @keyup="keyMonitor" readonly>
        <span class="select-icon" />
      </div>
      <div v-if="showOption" class="option-div width-100" ref="optionRef">
        <div class="option"
             :id="`OptionBox_${name}`"
             :class="{'active': data.id === flagId && showData, 'hover': data.hover}"
             v-for="(data, index) in dataItems"
             :key="index"
             @click="selectData(data, index); flagId = data.id"
             @mouseover="setItemHover(index, true)"
             @mouseleave="setItemHover(index, false)">
          <span>{{ mapField(data[config.text], '', '-') }}</span>
        </div>
      </div>
      <div v-if="config.isInvalid" class="invalid-feedback"><i class="fa fa-warning" />&nbsp;{{ config.invalidText }}</div>
    </div>
  </div>
</template>
<script>
  import mapField from 'ntb-venom'

  export default {
    name: 'SelectBox',
    directives: {
      'click-outside': {
        bind: function(el, binding, vNode) {
          if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${
              binding.expression
              }' is not a function, but has to be`
            if (compName) {
              warn += `Found in component '${compName}'`
            }
          }
          const bubble = binding.modifiers.bubble
          const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
              binding.value(e)
            }
          }
          el.__vueClickOutside__ = handler
          document.addEventListener('click', handler)
        },
        unbind: function(el, binding) {
          document.removeEventListener('click', el.__vueClickOutside__)
          el.__vueClickOutside__ = null
        }
      }
    },
    components: {},
    props: {
      topicName: { type: String, default: '' },
      name: { type: String, default: '' },
      items: { type: Array, default: null },
      disable: { type: Boolean, default: false },
      config: { type: [Array, Object], default: null }
    },
    data () {
      return {
        showData: '',
        flagId: '',
        showOption: false,
        focusOption: 0,
        dataItems: [],
        currentOffset: 0,
        oneTimeUpdate: true,
        checkDataItems: []
      }
    },
    computed: {

    },
    mounted () {
      this.config['placeholder'] = this.config.placeholder ? this.config.placeholder : ''
      this.showData = this.config['initValue'] ? this.config.initValue : ''
    },
    updated () {
      if (this.items) {
        if ((this.items.length && this.oneTimeUpdate) || this.checkDataItems.length !== this.items.length) {
          this.dataItems = this.items
          this.checkDataItems = this.items
          if (this.items.length) {
            this.dataItems.forEach((ele) => { ele.hover = false })
            if (!this.config.placeholder || this.config.placeholder === '') {
              this.showData = this.dataItems[0][this.config.text]
              this.$emit('selected', this.dataItems[0])
            }
            this.oneTimeUpdate = false
          }
        }
      }
    },
    methods: {
      mapField: mapField,
      isInvalid() {
        return this.config.isInvalid
      },
      outside(e) {
        this.showOption = false
      },
      blurEle(e) {
        setTimeout(() => {
          this.showOption = false
        }, 250);
      },
      toggleSelectBox() {
        this.showOption = !this.showOption
        if (!this.showOption) {
          this.$refs.selectInput.blur()
          this.dataItems.forEach((ele) => { ele.hover = false })
        }
        this.$nextTick(() => {
          if (this.$refs.optionRef) {
            this.$refs.optionRef.scrollTo(0, this.focusOption * 35)
          }
        })
      },
      setItemHover(index, flag) {
        this.dataItems.forEach((ele) => { ele.hover = false })
        this.dataItems[index].hover = flag
        this.focusOption = index
        this.currentOffset = index * 35
        this.$forceUpdate()
      },
      selectData(item, index) {
        item.hover = false
        this.showData = item[this.config.text]
        this.showOption = false
        this.focusOption = index
        this.$refs.selectInput.blur()
        this.$forceUpdate()
        this.$emit('selected', item)
      },
      keyMonitor(e) {
        this.dataItems[this.focusOption].hover = false
        let scrollTo = 0
        let reference = 0
        if (e.keyCode === 38) {
          this.focusOption = --this.focusOption < 0 ? ++this.focusOption : this.focusOption
          reference = Math.abs(((this.focusOption + 1) * 35) - this.currentOffset)
          scrollTo = reference > 35 ? this.currentOffset : this.focusOption * 35
        } else if (e.keyCode === 40) {
          this.focusOption = ++this.focusOption > (this.items.length - 1) ? --this.focusOption : this.focusOption
          reference = Math.abs(((this.focusOption - 6) * 35) - this.currentOffset)
          scrollTo = reference > 35 ? this.currentOffset : (this.focusOption - 5) * 35
        } else if (e.keyCode === 13) {
          this.selectData(this.dataItems[this.focusOption], this.focusOption)
        }
        this.dataItems[this.focusOption].hover = true
        if (this.$refs.optionRef) {
          this.$refs.optionRef.scrollTo(0, scrollTo || 0)
        }
        this.currentOffset = scrollTo
        this.$forceUpdate()
      },
      clear() {
        this.showData = ''
        this.showOption = false
        this.focusOption = 0
        this.dataItems = []
        this.currentOffset = 0
      }
    }
  }
</script>
<style lang="scss" scoped>
  @mixin standardFont($size, $weight, $color) {
    font-family: 'Sarabun-Regular';
    font-size: $size;
    font-weight: $weight;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: $color;
  }
  .select-box {
    .form-text {
      margin: 0 0 5px !important;
      @include standardFont(12px, normal, #333333);
    }
    .custom-box {
      position: relative;
      ::-webkit-scrollbar {
        margin-top: 10px !important;
        border-radius: 4px !important;
        height: 8px !important;
        width: 8px !important;
      }
      ::-webkit-scrollbar-track {
        background: #f3f3f3 !important;
        border-radius: 4px !important;
        margin: 0 !important;
      }
      ::-webkit-scrollbar-thumb {
        background: #6793bc !important;
        border-radius: 4px !important;
      }
      .is-invalid {
        border: 1px solid #c86d6d !important;
      }
      .select-div{
        position: relative;
        input{
          cursor: default;
        }
        input::placeholder {
          color: #9b9b9b;
        }
        .select-icon{
          position: absolute;
          font-size: 10px;
          line-height: 14px;
          right: 12px;
          top: 7px;
          &:before {
            content: '\f078';
            font-family: FontAwesome;
            font-style: normal;
            font-weight: normal;
            text-decoration: inherit;
          }
        }
      }
      .option-div{
        position: absolute;
        top: 30px;
        left: 0;
        max-height: 210px;
        background-color: #fff;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        margin-right: -5px;
        z-index: 96;
        overflow: auto;
        .option:first-child {
          margin: 8px 8px 0px 8px;
        }
        .option:last-child {
          margin: 0px 8px 8px 8px;
        }
        .option {
          @include standardFont(12px, normal, #333333);
          cursor: default;
          display: flex;
          align-items: center;
          min-height: 30px;
          margin: 0px 8px 0px 8px;
          padding: 0px 5px 0px 5px;
          &.hover{
            color: #0192ff !important;
            cursor: pointer;
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.05);
          }
          &.active{
            color: #0192ff !important;
            cursor: pointer;
          }
        }
      }
      .invalid-feedback{
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-family: 'Sarabun-Regular';
        font-size: 12px;
        font-weight: normal;
        color: #c86d6d;
      }
    }
  }
</style>

<template>
  <div class="opencase-item" :style="itemStyles">
    <div class="opencase-item-image-wrap">
      <div class="opencase-item-image-wrap2">
        <img
          :src="post.item_pic"
          class="opencase-item-icon"
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="2.014in"
          height="0.444in"
          style="position: absolute; margin-left: 45px; margin-top: 20px;"
        >
          <path
            fill-rule="evenodd"
            :fill="gettype(post.rate_id)"
            d="M16.126,0.000 L145.000,0.000 L145.000,32.000 L15.874,32.000 C7.107,32.000 0.000,24.893 0.000,16.126 C0.000,7.220 7.220,0.000 16.126,0.000 Z"
          />
          <text
            x="10"
            y="20"
            max-width="20px"
            font-family="DB Helvethaica X Bd Cond"
            font-size="20"
            fill="white"
            font-style="italic"
            clip-path="url(#clip1)"
          >
            {{ post.item_name }}
          </text>
          <clipPath id="clip1">
            <rect x="5" y="5" width="135" height="90" />
          </clipPath>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="1.403in"
          height="0.569in"
          style="position: absolute; margin-left: 45px; margin-top: 145px;"
        >
          <path
            fill-rule="evenodd"
            :fill="gettype(post.rate_id)"
            d="M20.000,6.000 L80.000,6.000 C87.732,6.000 94.000,12.268 94.000,20.000 C94.000,27.732 87.732,34.000 80.000,34.000 L20.000,34.000 C12.268,34.000 6.000,27.732 6.000,20.000 C6.000,12.268 12.268,6.000 20.000,6.000 Z"
          />
          <text
            x="26"
            y="25"
            max-width="24px"
            font-family="DB Helvethaica X Bd Cond"
            font-size="24"
            fill="white"
            font-style="italic"
            clip-path="url(#clip1)"
          >
            {{ formatPrice(post.item_price) }}
          </text>
        </svg>
        <img
          v-if="post.rate_id == 1"
          src="~/assets/images/common_bg.png"
          class="opencase-item-image"
        >
        <img
          v-if="post.rate_id == 2"
          src="~/assets/images/rare_bg.png"
          class="opencase-item-image"
        >
        <img
          v-if="post.rate_id == 3"
          src="~/assets/images/epic_bg.png"
          class="opencase-item-image"
        >
        <img
          v-if="post.rate_id == 4"
          src="~/assets/images/legend_bg.png"
          class="opencase-item-image"
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: Object
  },
  data() {
    return {};
  },
  computed: {
    itemStyles() {
      return {
        width: `190px`,
        height: `190px`
      };
    }
  },
  mounted() {},
  methods: {
    getSlotItem() {},
    gettype(rate) {
      // console.log("rate : " + rate);
      if (rate === 1) {
        return "rgb(12, 208, 2)";
      } else if (rate === 2) {
        return "rgb(24, 57, 255)";
      } else if (rate === 3) {
        return "rgb(255, 62, 37)";
      } else if (rate === 4) {
        return "rgb(149, 0, 176)";
      }
    },
    formatPrice(value) {
      var val = value;
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>
<style lang="scss" scoped>
.opencase-item {
  float: left;
  color: #fff;
  margin-right: 4px;
  margin-left: 4px;
}
.opencase-item-image-wrap {
}
.opencase-item-image-wrap2 {
  .opencase-item-icon {
    position: absolute;
    margin-left: 20px;
    margin-top: 15px;
    width: 150px;
    z-index: 99;
  }
}
.opencase-item-image {
  width: 100%;
}
.opencase-item-title {
  white-space: nowrap;
  font-size: 0.85em;
}
.item-imagez {
  background: white !important;
  height: 100%;
}
</style>

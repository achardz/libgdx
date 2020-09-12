<template>
  <v-layout class="row pa-10 pl-12">
    <v-dialog
      v-model="dialog"
      max-width="250px"
    >
      <v-card>
        <v-row class="justify-end ma-0">
          <v-btn
            color="error"
            icon
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-card-text>
          <v-img max-width="196px" :src="selectitem.item_pic" />
          {{ selectitem.item_description }}
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            color="primary"
            icon
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="pa-5" max-width="235px" @click="showbuy(item)">
      <v-img
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,0.2)"
        height="200px"
        max-width="196px"
        :src="item_pic"
      >
        <v-card-title />
      </v-img>
      <v-spacer />
      <p class="name ml-3 mt-1 mb-1">{{ item_name }}</p>
      <span class="price mt-0 mb-3 ml-3">฿ {{ item_price }}</span>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "Item",
  props: {
    itemPic: String,
    itemName: String,
    itemPrice: {},
    item: Object
  },
  data() {
    return {
      dialog: false,
      selectitem: {}
    };
  },
  mounted() {},
  methods: {
    formatPrice (value) {
      var val = value;
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showbuy (item) {
      this.selectitem = item;
      this.dialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin fontNav($size, $color) {
  font-family: "DB Helvethaica X Bd Cond";
  font-size: $size;
  font-stretch: normal;
  line-height: 1;
  letter-spacing: normal;
  color: $color;
}
.name {
  font-size: 20px;
  font-family: "DB Helvethaica X Bd Cond";
  color: rgb(111, 111, 111);
  text-transform: uppercase;
  line-height: 1.2;
}
.price {
  font-size: 28px;
  font-family: "DB Helvethaica X Reg";
  color: rgb(255, 158, 94);
  text-transform: uppercase;
  line-height: 1.2;
}
</style>

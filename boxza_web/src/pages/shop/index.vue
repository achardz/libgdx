<template>
  <div class="carousel-wrapper">
    <VueSlickCarousel class="carousel__shop" v-bind="slickOptions">
      <div v-for="(item, i) in slideShowList" :key="i" class="img-wrapper">
        <v-img :src="item.imgPath" />
      </div>
    </VueSlickCarousel>
    <v-container
      ref="searchbox"
      :class="['bg-white', isscroll ? 'fluid-row-fix' : '']"
    >
      <v-row class="fluid-row">
        <v-form>
          <v-text-field
            :class="['input__new', isscroll ? 'ma-0' : '']"
            label="ค้นหา"
            v-model="searchtext"
            @input="searchfilter()"
          >
            <v-tooltip slot="append" bottom>
              <v-icon slot="activator" color="primary" dark>mdi-magnify</v-icon>
              <span>search</span>
            </v-tooltip>
          </v-text-field>
        </v-form>
        <div
          :class="[
            isscroll ? 'catagory-hide' : 'catagory-logo hidden-sm-and-down'
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.972in"
            height="0.556in"
          >
            <defs>
              <linearGradient
                id="PSgrad_0"
                x1="35.902%"
                x2="0%"
                y1="93.333%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stop-color="rgb(255,51,132)"
                  stop-opacity="1"
                />
                <stop
                  offset="100%"
                  stop-color="rgb(255,17,112)"
                  stop-opacity="1"
                />
              </linearGradient>
            </defs>
            <path
              fill-rule="evenodd"
              fill="url(#PSgrad_0)"
              d="M-0.001,-0.000 L141.999,-0.000 L124.561,40.000 L-0.001,40.000 L-0.001,-0.000 Z"
            />
          </svg>
          <span>หมวดหมู่</span>
        </div>
      </v-row>
      <v-chip-group
        show-arrows
        multiple
        :class="[isscroll ? 'submenu__box ma-0' : 'submenu__box']"
      >
        <v-chip
          :class="[isscroll ? 'bg_submenu_sticky' : 'bg_submenu']"
          v-for="(item, i) in menuItems"
          :key="i"
          :active-class="[
            isscroll ? 'bg_submenu_stickyactive' : 'bg_submenu_active'
          ]"
          @click="activefilter(i)"
        >
          <v-icon>{{ item.icon }}</v-icon>
          <span class="d-inline-block text-truncate" style="max-width: 150px;">
            {{ item.title }}
          </span>
        </v-chip>
        <v-chip
          :class="[isscroll ? 'bg_submenu_sticky' : 'bg_submenu']"
          :active-class="[
            isscroll ? 'bg_submenu_stickyactive' : 'bg_submenu_active'
          ]"
          to="/dash-board"
        >
          <v-icon>mdi-seal-variant</v-icon>
          <span class="d-inline-block text-truncate" style="max-width: 150px;">
            สุ่มของรางวัล
          </span>
        </v-chip>
      </v-chip-group>
    </v-container>
    <v-container class="bg-white" id="main">
      <v-row>
        <Item
          v-for="(item, id) in showItems"
          :key="id"
          :item_pic="item.item_pic"
          :item_name="item.item_name"
          :item_price="item.item_price"
          :item="item"
          @click="dialog = true"
        />
      </v-row>
    </v-container>
    <v-container class="bg-white mt-12" id="hot" style="z-index: 1;">
      <v-row class="fluid-row">
        <div class="catagory-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="3in"
            height="0.556in"
          >
            <defs>
              <linearGradient
                id="PSgrad_1"
                x1="35.837%"
                x2="0%"
                y1="93.358%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stop-color="rgb(255,51,132)"
                  stop-opacity="1"
                />
                <stop
                  offset="100%"
                  stop-color="rgb(255,17,112)"
                  stop-opacity="1"
                />
              </linearGradient>
            </defs>
            <path
              fill-rule="evenodd"
              fill="url(#PSgrad_1)"
              d="M215.999,-0.000 L198.561,40.000 L74.000,40.000 L74.000,40.000 L-0.000,40.000 L-0.000,-0.000 L74.000,-0.000 L74.000,-0.000 L215.999,-0.000 Z"
            />
          </svg>
          <span>ของเล่นแนะนำประจำวัน</span>
        </div>
      </v-row>
      <VueSlickCarousel v-bind="slickOptions">
        <div v-for="(item, i) in slideShowList" :key="i" class="img-wrapper">
          <v-img :src="item.imgPath" />
        </div>
      </VueSlickCarousel>
    </v-container>
    <v-container class="bg-white mt-12" id="hot">
      <v-row class="fluid-row">
        <div class="catagory-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="1.972in"
            height="0.556in"
          >
            <defs>
              <linearGradient
                id="PSgrad_2"
                x1="35.902%"
                x2="0%"
                y1="93.333%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stop-color="rgb(255,51,132)"
                  stop-opacity="1"
                />
                <stop
                  offset="100%"
                  stop-color="rgb(255,17,112)"
                  stop-opacity="1"
                />
              </linearGradient>
            </defs>
            <path
              fill-rule="evenodd"
              fill="url(#PSgrad_2)"
              d="M-0.001,-0.000 L141.999,-0.000 L124.561,40.000 L-0.001,40.000 L-0.001,-0.000 Z"
            />
          </svg>
          <span>ของเล่นขายดี</span>
        </div>
        <Item v-for="n in 5" :key="n" />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Item from "~/components/shop/Item";

export default {
  name: "App",
  layout: "shoplayout",
  components: { Item },
  data() {
    return {
      isscroll: false,
      searchtext: "",
      dialog: false,
      searchoffset: 0,
      appTitle: "Awesome App",
      sidebar: false,
      slickOptions: {
        dots: true,
        dotsClass: "slick-dots custom-dot-class",
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      },
      Items: [],
      showItems: [],
      beforewordItems: [],
      menuItems: [
        {
          title: "ของเล่นผู้หญิง",
          path: "/home",
          icon: "mdi-home",
          keyword: "หญิง",
          status: false
        },
        {
          title: "ของเล่นผู้ชาย",
          path: "/signup",
          icon: "mdi-face",
          keyword: "ชาย",
          status: false
        },
        {
          title: "ของเล่นแปลกๆ",
          path: "/signin",
          icon: "mdi-lock-open",
          keyword: "แปลก",
          status: false
        },
        {
          title: "ของเล่น Promotion",
          path: "/signin",
          icon: "mdi-lock-open",
          status: false
        },
        {
          title: "ของเล่น Promotion",
          path: "/signin",
          icon: "mdi-lock-open",
          status: false
        },
        {
          title: "ของเล่น Promotion",
          path: "/signin",
          icon: "mdi-lock-open",
          status: false
        }
      ],
      slideShowList: [
        {
          id: 1,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/1.jpg"
        },
        {
          id: 2,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/2.jpg"
        },
        {
          id: 3,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/3.jpg"
        },
        {
          id: 4,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/4.jpg"
        },
        {
          id: 5,
          imgPath: "https://cdnboxza.sgp1.digitaloceanspaces.com/banner/4.jpg"
        }
      ]
    };
  },
  created() {
    const vm = this;
    vm.$axios
      .$get("/shop/items")
      .then(res => {
        console.log(res.data.data.product);
        vm.beforewordItems = vm.showItems = vm.Items = res.data.data.product;
      })
      .catch(e => {
        if (e.response) {
          console.error(e.response.data.data.message);
        }
      });
  },
  mounted() {},
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      if (this.searchoffset === 0) {
        this.searchoffset = this.$refs.searchbox.offsetTop;
      }
      if (window.scrollY > this.searchoffset) {
        this.isscroll = true;
      } else {
        this.isscroll = false;
      }
    },
    activefilter(index) {
      const vm = this;
      var datafill = [];
      this.menuItems[index].status = !this.menuItems[index].status;
      this.menuItems.filter(item => {
        if (item.status === true) {
          datafill.push(item.keyword);
        }
      });
      vm.showItems = vm.beforewordItems.filter(item => {
        for (var i = 0; i < datafill.length; i++) {
          if (item.item_description.includes(datafill[i])) {
            return item;
          }
        }
      });
      if (datafill <= 0) {
        vm.showItems = vm.beforewordItems;
      }
      console.log(datafill);
    },
    searchfilter() {
      const vm = this;
      this.beforewordItems = vm.Items.filter(item => {
        if (
          item.item_description
            .toLowerCase()
            .includes(this.searchtext.toLowerCase()) ||
          item.item_name.toLowerCase().includes(this.searchtext.toLowerCase())
        ) {
          return item;
        }
      });
      var datafill = [];
      vm.showItems = vm.beforewordItems.filter(item => {
        for (var i = 0; i < datafill.length; i++) {
          if (item.item_description.includes(datafill[i])) {
            return item;
          }
        }
      });
      if (datafill <= 0) {
        vm.showItems = vm.beforewordItems;
      }
      console.log(this.beforewordItems);
    }
  }
};
</script>
<style lang="scss">
@mixin bgcolorall($colorOne, $colorTwo) {
  background: linear-gradient(to top right, $colorOne, $colorTwo);
}
.fluid-row-fix {
  position: sticky;
  top: 5rem;
  z-index: 100;
  box-shadow: 0px 30px 64px -6px rgba(0, 0, 0, 0.36);
}
.fluid-row {
  margin-right: 20px;
  justify-content: flex-end;
  .search {
    overflow: hidden;
    max-width: 200px;
    position: relative;
  }
  .input__new {
    input {
      border-width: 1px;
      border-color: rgb(227, 227, 227);
      border-style: solid;
      border-radius: 0px;
      background-color: rgb(232, 232, 232);
      width: 34vw;
      max-width: 330px;
      height: 34px;
    }
  }
  .button__new {
    background-image: linear-gradient(
      -117deg,
      rgb(0, 223, 221) 0%,
      rgb(0, 195, 193) 99%
    );
    min-width: 0px;
    width: 2vw !important;
    height: 34px !important;
  }
  .catagory-logo {
    left: 0px;
    top: 10px;
    z-index: 1;
    span {
      color: white;
      position: absolute;
      justify-content: center;
      width: 20vw;
      top: 0.35rem;
      left: 0.8rem;
    }
    justify-content: center;
    position: absolute;
    opacity: 1;
    transition: all 0.3s linear;
    width: 142px;
    height: 40px;
  }
  .catagory-hide {
    left: 0px;
    top: 10px;
    z-index: 1;
    position: absolute;
    transition: all 0.3s linear;
    opacity: 0;
    span {
      color: white;
      position: absolute;
      justify-content: center;
      width: 20vw;
      top: 0.35rem;
      left: 0.8rem;
    }
  }
}
.carousel-wrapper {
  .VueCarousel-slide {
    text-align: center;
  }
  ul {
    margin: 0px !important;
  }
  .slick-dots {
    position: absolute;
    bottom: 20px;
  }
}
.img-wrapper img {
  padding: 5px;
  max-height: 500px;
  max-width: 500px;
  width: 100%;
}
.carousel__shop {
  margin: 0px;
}
.submenu__box {
  justify-content: center;
  margin-top: 30px;
}
.bg_submenu {
  border-radius: 14px;
  justify-content: center;
  span {
    color: white;
  }
  i {
    color: white !important;
  }
  background: linear-gradient(
    -117deg,
    rgb(0, 223, 221) 0%,
    rgb(0, 195, 193) 99%
  ) !important;
  &:hover {
    background-image: linear-gradient(
      -117deg,
      rgb(0, 223, 226) 0%,
      rgb(0, 195, 196) 99%
    );
  }
  transition: all 0.3s linear;
  width: 193px;
  height: 47px !important;
}
.bg_submenu_active {
  border-radius: 14px;
  justify-content: center;
  span {
    color: white;
  }
  i {
    color: white !important;
  }
  background: linear-gradient(
    -117deg,
    rgb(0, 223, 200) 0%,
    rgb(0, 195, 100) 99%
  ) !important;
  &:hover {
    background-image: linear-gradient(
      -117deg,
      rgb(0, 223, 200) 0%,
      rgb(0, 195, 100) 99%
    );
  }
  transition: all 0.3s linear;
  width: 193px;
  height: 47px !important;
}
.bg_submenu_sticky {
  border-radius: 14px;
  justify-content: center;
  span {
    color: white;
  }
  i {
    color: white !important;
  }
  background: linear-gradient(
    -117deg,
    rgb(0, 223, 221) 0%,
    rgb(0, 195, 193) 99%
  ) !important;

  &:hover {
    background-image: linear-gradient(
      -117deg,
      rgb(0, 223, 226) 0%,
      rgb(0, 195, 196) 99%
    );
  }
  transition: all 0.3s linear;
  width: 155px;
  height: 35px !important;
}
.bg_submenu_stickyactive {
  border-radius: 14px;
  justify-content: center;
  span {
    color: white;
  }
  i {
    color: white !important;
  }
  background: linear-gradient(
    -117deg,
    rgb(0, 223, 200) 0%,
    rgb(0, 195, 100) 99%
  ) !important;
  &:hover {
    background-image: linear-gradient(
      -117deg,
      rgb(0, 223, 200) 0%,
      rgb(0, 195, 100) 99%
    );
  }
  transition: all 0.3s linear;
  width: 155px;
  height: 35px !important;
}
</style>

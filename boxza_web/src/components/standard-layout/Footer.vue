<template>
  <v-footer id="footer">
    <div
      class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd"
    >
      <!-- <div class="column is-9">
        <div class="topic-footer">
          <label class="topic-text">เกี่ยวกับ BOXZA</label>
        </div>
       <p class="about-detail">ที่นี่คุณสามารถกดซื้อของที่คุณชอบพร้อมใช้คูปองส่วนลดต่างๆ หรือ เปิดกล่องลึกลับตามที่คุณเลือก เพื่อรับสินค้าจริงได้ เปิดกล่องเเละลุ้นรางวัลอิเล็กทรอนิกส์หรือบัตรเติมเงินเกมต่างๆ คุณสามารถดูสิ่งของที่อยู่ในกล่องของเราก่อนที่จะตัดสินใจเปิด
เนื่องจากบริษัทของเราเป็นบริษัท สัญชาติไทย เสียภาษีถูกต้องตามกฎหมายเเละตั้งอยู่ในประเทศไทยจึงมั่นใจได้ว่า ทางเราจะส่งสินค้ารายการใดๆก็ตามที่คุณได้สั่งผ่านระบบจัดส่งในเว็บไซต์ของเรา ถึงมือคุณภายใน 3วัน โปรดทราบว่าหากคุณเลือกที่จะเล่นกล่องสุ่ม ทางเราอนุญาตเฉพาะผู้ที่มีอายุมากกว่า 18 ปีเท่านั้นที่จะใช้บริการนั้นของเรา (DEV1122)</p>
      </div> -->
      <div class="social-box column is-3">
        <div class="columns social-icon-box">
          <a
            class="social-icon"
            href="https://mobile.twitter.com/BoxzaBox"
            target="_blank"
            rel="noopener"
          >
            <div class="social-icon-type">
              <img
                id="twitterIcon"
                class="icon"
                src="~@/assets/images/icon/twitter.png"
                alt="Twitter Icon"
              >
            </div>
          </a>
          <a
            class="social-icon"
            href="https://www.facebook.com/BOXZA-101944501503717"
            target="_blank"
            rel="noopener"
          >
            <div class="social-icon-type">
              <img
                id="facebookIcon"
                class="icon"
                src="~@/assets/images/icon/facebook.png"
                alt="Facebook Icon"
              >
            </div>
          </a>
          <a
            class="social-icon"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener"
          >
            <div class="social-icon-type">
              <img
                id="instagramIcon"
                class="icon"
                src="~@/assets/images/icon/Instagram.png"
                alt="Instagram Icon"
              >
            </div>
          </a>
        </div>
      </div>
    </div>
    <registerBar />
  </v-footer>
</template>

<script>
import registerBar from "./RegisterBar";
export default {
  name: "Footer",
  components: { registerBar },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@mixin fontFoot($size, $weight, $color, $style) {
  font-family: "Prompt-Regular";
  font-size: $size;
  font-weight: $weight;
  font-style: $style;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: $color;
}
@media only screen and (max-width: 770px) {
  #footer {
    padding: 30px !important;
  }
}
#footer {
  top: 100%;
  bottom: 0px;
  color: white;
  padding: 30px !important;
  // min-height: 9%;
  background-color: blue;
  background-image: linear-gradient(-90deg, #66d483, #1e1eb4);
  .topic-footer {
    .topic-text {
      @include fontFoot(16px, bold, white, normal);
    }
  }
  .social-box {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    .social-icon-box {
      display: flex;
      .social-icon {
        margin: 10px;
        .social-icon-type {
          width: 26px;
          height: 26px;
          object-fit: contain;
          .icon {
            width: 100%;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

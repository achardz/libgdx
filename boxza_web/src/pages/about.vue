<template>
  <section id="about">
    <div class="columns">
      <div class="column">
        <label class="about-title">เกี่ยวกับเรา</label>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="about-detail">
          BOXZA เป็นเว็บไซต์ e-commerce เเละเปิดกล่องออนไลน์
        </p>
        <br>
        <p class="about-detail">
          ที่นี่คุณสามารถกดซื้อของที่คุณชอบพร้อมใช้คูปองส่วนลดต่างๆ หรือ
          เปิดกล่องลึกลับตามที่คุณเลือก เพื่อรับสินค้าจริงได้
          เปิดกล่องเเละลุ้นรางวัลอิเล็กทรอนิกส์หรือบัตรเติมเงินเกมต่างๆ
          คุณสามารถดูสิ่งของที่อยู่ในกล่องของเราก่อนที่จะตัดสินใจเปิด
        </p>
        <p class="about-detail">
          เนื่องจากบริษัทของเราเป็นบริษัท สัญชาติไทย
          เสียภาษีถูกต้องตามกฎหมายเเละตั้งอยู่ในประเทศไทยจึงมั่นใจได้ว่า
          ทางเราจะส่งสินค้ารายการใดๆก็ตามที่คุณได้สั่งผ่านระบบจัดส่งในเว็บไซต์ของเรา
          ถึงมือคุณภายใน 3วัน โปรดทราบว่าหากคุณเลือกที่จะเล่นกล่องสุ่ม
          ทางเราอนุญาตเฉพาะผู้ที่มีอายุมากกว่า 18
          ปีเท่านั้นที่จะใช้บริการนั้นของเรา
        </p>
        <br>
        <p class="about-detail">อีเมลบริการลูกค้า: support@boxza.co.th</p>
        <br>
        <p class="about-detail">หมายเลขโทรศัพท์ฝ่ายบริการลูกค้า 02-115-4447</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@mixin fontNav($size, $weight, $color, $style) {
  font-family: "Prompt-Regular";
  font-size: $size;
  font-weight: $weight;
  font-style: $style;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: $color;
}
@media (min-width: 767px) {
  #about {
    width: 50%;
    margin-left: 30% !important;
    padding: 10% !important;
    background-color: white;
    border-radius: 4px;
    .about-title {
      @include fontNav(24px, bold, black, normal);
    }
    .about-detail {
      margin-bottom: 10px;
      @include fontNav(16px, normal, black, normal);
    }
  }
}
@media (max-width: 770px) {
  #about {
    padding: 100px;
    background-color: white;
    border-radius: 4px;
    .about-title {
      @include fontNav(24px, bold, black, normal);
    }
    .about-detail {
      margin-bottom: 10px;
      @include fontNav(16px, normal, black, normal);
    }
  }
}
</style>

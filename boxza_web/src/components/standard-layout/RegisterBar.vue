<template>
  <div id="registerBar">
    <registerModal v-if="openRegisterModal" v-on:dialog="openRegisterModal = $event" />
    <div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
      <div class="column is-7 is-12-mobile" />
      <div class="register-box column is-5 is-12-mobile">
        <div class="register-content">
          <div class="row">
            <div class="col-12 pt-0 pb-0 topic-register">สมัครสมาชิก</div>
            <div class="col-12 pt-0 pb-0">สมัครเป็นสมาชิกวันนี้ แล้วสะสมคะแนนเพื่อนำมาแลกของรางวัล และสิทธิประโยชน์ต่างๆ อีกมากมาย</div>
            <div class="col-12 pb-0 button-register-box">
              <v-btn class="button-register" @click="openRegisterModal = true">
                <span class="button-text">คลิ๊กเพื่อสมัครสมาชิก</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import registerModal from '~/components/standard-layout/components/RegisterAndLoginModal'
  export default {
    name: 'RegisterBar',
    components: {
      registerModal
    },
    data () {
      return {
        openRegisterModal: false
      }
    },
    watch: {
    },
    mounted () {},
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  @mixin fontFoot($size, $weight, $color, $style) {
    font-family: 'Prompt-Regular';
    font-size: $size;
    font-weight: $weight;
    font-style: $style;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: $color;
  }
  @media only screen and (max-width: 770px) {
    #registerBar {
      padding: 30px !important;
    }
  }
  @media (max-width: 768px) {
    .button-register-box {
      text-align: center !important;
    }
  }
  #registerBar {
    color: white;
    padding: 30px 50px;
    background-color: #333333;
    .topic-register-bar {
      .topic-text {
        @include fontFoot(16px, bold, white, normal);
      }
    }
    .register-box {
      align-items: center;
      .register-content {
        width: 100%;
        .topic-register {
          font-size: 26px;
        }
        .button-register {
          height: 45px;
          .button-text {
            color: #505050;
            font-size: 16px;
            border-bottom: 1px solid #848484;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

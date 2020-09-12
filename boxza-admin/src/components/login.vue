<template>
  <div id="login">
    <AlertBox ref="alertBox" />
    <div class="login-form-card col-lg-6">
       <form>
        <div class="login-title">LOGIN</div>
        <v-text-field
          v-model="username"
          @keyup.enter="login"
          :error-messages="usernameErrors"
          label="username"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          @keyup.enter="login"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="passwordErrors"
          label="password"
          required
          outlined
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-sheet class="text-center" height="auto">
          <v-btn width="150px" height="50px" color="blue" dark :loading="loadingBeforeLogin" @click="login">Login</v-btn>
        </v-sheet>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import AlertBox from '~/components/general/alert-box/AlertBox'
const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    mixins: [validationMixin],
    validations: {
      username: { required },
      password: { required }
    },
    components: {
      AlertBox
    },
    data () {
      return {
        username: '',
        password: '',
        showPassword: false,
        loadingBeforeLogin: false
      }
    },
    computed: {
      usernameErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('กรุณากรอก Username')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('กรุณากรอก Password')
        return errors
      }
    },
    methods: {
      showAlert: function (value) {
        const vm = this
        const alert = {
          'mainTitle': value.title,
          'subTitle': value.text,
          'type': value.type,
          'time': value.time,
          'autoClose': value.autoClose,
          'show': value.show
        }
        vm.$refs.alertBox.showBox(alert)
      },
      login () {
        const vm = this
        const bodyLogin = { username: vm.username, password: vm.password }
        if (vm.username && vm.password) {
          vm.loadingBeforeLogin = true
          vm.$axios.$post('/login', bodyLogin)
            .then((res) => {
              if (res.data.is_login) {
                const auth = {
                  id: res.data.id,
                  isLogin: res.data.is_login,
                  username: res.data.username,
                  accessToken: res.data.token,
                  timestamp: res.data.expires
                }
                this.$store.commit('setAuth', auth)
                Cookie.set('auth', auth)
                this.$router.push('/welcome')
                vm.showAlert({ title: 'Login สำเร็จ', text: 'เข้าสู่ระบบ', type: 'success', time: 5, autoClose: true, show: true })
              } else {
                vm.showAlert({ title: 'คำเตือน!', text: res.data.message, type: 'warning', time: 5, autoClose: true, show: true })
              }
            })
            .catch((e) => {
              if (e.response) {
                vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง',
                  type: 'error', time: 5, autoClose: true, show: true })
              }
            })
            .finally(() => {
              vm.loadingBeforeLogin = false
            })
        } else {
          this.$v.$touch()
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  #login {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("~@/assets/images/bg-login.jpg") no-repeat;
    background-size: 100% 100%;
    .login-form-card {
      position: absolute;
      max-width: 450px;
      max-height: 400px;
      background-color: white;
      border-radius: 15px;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: box-shadow .28s cubic-bezier(.4,0,.2,1);
      will-change: box-shadow;
      box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
      .login-title {
        text-align: center;
        margin: 30px;
        font-size: 36px;
      }
    }
  }
</style>

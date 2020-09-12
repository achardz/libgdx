<template>
  <div id="registerModal">
    <AlertBox ref="alertBox" />
    <ConditionsModal v-if="openConditionsModal" v-on:conditionsDialog="openConditionsModal = $event" />
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card id="registerCard">
          <div class="close-icon">
            <v-icon class="icon" @click="dialog = false">mdi-close-circle</v-icon>
          </div>
          <v-form class="register-form">
            <!-- Register -->
            <template v-if="!loginFlag">
              <v-form class="input-form">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-account</v-icon>
                  </div>
                  <input type="text" class="form-control" placeholder="Username" v-model="registerForm.username"
                         @keyup.enter="sendRegister"
                         onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-email-variant</v-icon>
                  </div>
                  <input type="email" class="form-control" placeholder="Email" v-model="registerForm.email"
                         @keyup.enter="sendRegister"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         ( event.charCode >= 48 && event.charCode <= 57) || ( event.charCode === 46 ) || ( event.charCode === 95 )">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-lock</v-icon>
                  </div>
                  <input type="password" class="form-control" placeholder="Password" v-model="registerForm.password" autocomplete="off"
                         @keyup.enter="sendRegister"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-lock</v-icon>
                  </div>
                  <input type="password" class="form-control" placeholder="Repeat password" v-model="registerForm.confirm_password" autocomplete="off"
                         @keyup.enter="sendRegister"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
              </v-form>
              <v-card-text class="checkbox-form">
                <input type="checkbox" :value="true" v-model="termsCheck" id="terms" checked>
                <label for="terms">I am over 18 and I accept</label> <u class="terms-box" @click="openConditionsModal = true">Terms & Conditions</u>
              </v-card-text>
              <div class="row">
                <div class="col-md-12">
                  <div class="button-register-box">
                    <v-btn class="button-register" @click="sendRegister" :loading="loadingBeforeRegister">สมัคร !</v-btn>
                  </div>
                </div>
              </div>
              <div class="button-register-box">
                <v-btn class="button-register" @click="loginFlag = true" :loading="loadingBeforeLogin">เข้าสู่ระบบ</v-btn>
              </div>
            </template>
            <!-- login -->
            <template v-if="loginFlag && !forgotPasswordFlag && !resetPasswordFlag">
              <v-form class="input-form">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-account</v-icon>
                  </div>
                  <input type="text" class="form-control" placeholder="Username" v-model="loginForm.username"
                         @keyup.enter="login"
                         onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-lock</v-icon>
                  </div>
                  <input type="password" class="form-control" placeholder="Password" v-model="loginForm.password" autocomplete="off"
                         @keyup.enter="login"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
              </v-form>
              <div class="row">
                <div class="col-md-6">
                  <div class="button-register-box">
                    <v-btn class="button-register" @click="login" :loading="loadingBeforeLogin">เข้าสู่ระบบ</v-btn>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="button-register-box">
                    <v-btn class="button-register" @click="loginFlag = false" :loading="loadingBeforeLogin">สมัครสมาชิก</v-btn>
                  </div>
                </div>
              </div>
            </template>
            <!-- Reset Password-->
            <template v-if="loginFlag && resetPasswordFlag">
              <v-form class="input-form">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-account</v-icon>
                  </div>
                  <input type="text" class="form-control" placeholder="Username" v-model="resetPasswordForm.username"
                         @keyup.enter="resetPassword"
                         onkeypress="return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-lock</v-icon>
                  </div>
                  <input type="password" class="form-control" placeholder="Password" v-model="resetPasswordForm.password" autocomplete="off"
                         @keyup.enter="resetPassword"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-lock</v-icon>
                  </div>
                  <input type="password" class="form-control" placeholder="New password" v-model="resetPasswordForm.new_password" autocomplete="off"
                         @keyup.enter="resetPassword"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-lock</v-icon>
                  </div>
                  <input type="password" class="form-control" placeholder="Confirm new password" v-model="resetPasswordForm.confirm_password" autocomplete="off"
                         @keyup.enter="resetPassword"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         (event.charCode >= 48 && event.charCode <= 57)">
                </div>
              </v-form>
              <div class="button-register-box">
                <v-btn class="button-register" @click="resetPassword" :loading="loadingBeforeResetPass">RESET PASSWORD</v-btn>
              </div>
            </template>
            <!-- Forgot Password-->
            <template v-if="loginFlag && forgotPasswordFlag">
              <v-form class="input-form">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <v-icon class="input-group-text">mdi-email-variant</v-icon>
                  </div>
                  <input type="email" class="form-control" placeholder="Email" v-model="forgotPasswordForm.email" autocomplete="off"
                         @keyup.enter="forgotPassword"
                         onkeypress="return (event.charCode >= 64 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) ||
                         ( event.charCode >= 48 && event.charCode <= 57) || ( event.charCode === 46 ) || ( event.charCode === 95 )">
                </div>
              </v-form>
              <div class="button-register-box">
                <v-btn class="button-register" @click="forgotPassword" :loading="loadingBeforeForgotPass">RESET PASSWORD</v-btn>
              </div>
            </template>
          </v-form>
          <v-form class="login-form">
            <!-- <div class="button-login-box" v-if="!loginFlag" @click="loginFlag = true">
              LOGIN
            </div> -->
            <div class="button-password-action-box" v-if="loginFlag && !resetPasswordFlag && !forgotPasswordFlag" @click="resetPasswordFlag = !resetPasswordFlag">
              RESET PASSWORD
            </div>
            <div class="button-password-action-box" v-if="loginFlag && !forgotPasswordFlag && !resetPasswordFlag" @click="forgotPasswordFlag = !forgotPasswordFlag">
              FORGOT PASSWORD
            </div>
            <div class="login-topic">
              <label class="topic-text">เข้าใช้งานด้วย Social media</label>
            </div>
            <v-row justify="center">
              <v-col cols="4">
                <div class="social-buttons facebook" @click="socialFacebookLogin">
                  <img class="facebook-icon" :src="require('~/assets/images/logo/white-facebook.png')">
                </div>
              </v-col>
              <v-col cols="4">
                <div class="social-buttons twitter" @click="socialTwitterLogin">
                  <v-icon class="twitter-icon">mdi-twitter</v-icon>
                </div>
              </v-col>
              <v-col cols="4">
                <div class="social-buttons google-plus" @click="socialGoogleLogin">
                  <v-icon class="google-plus-icon">mdi-google-plus</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  // import { socialFirebase } from '../../../plugins/firebase.plugin'
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  import ConditionsModal from './sub-components/conditionsModal'
  import AlertBox from '~/components/general/alert-box/AlertBox'
  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    name: 'RegisterModal',
    components: {
      AlertBox,
      ConditionsModal
    },
    data () {
      return {
        dialog: true,
        openConditionsModal: false,
        loginFlag: false,
        forgotPasswordFlag: false,
        resetPasswordFlag: false,
        termsCheck: false,
        loadingBeforeRegister: false,
        loadingBeforeLogin: false,
        loadingBeforeResetPass: false,
        loadingBeforeForgotPass: false,
        registerForm: {
          username: '',
          email: '',
          password: '',
          confirm_password: ''
        },
        loginForm: {
          username: '',
          password: ''
        },
        resetPasswordForm: {
          username: '',
          password: '',
          new_password: ''
        },
        forgotPasswordForm: {
          email: ''
        }
      }
    },
    watch: {
      dialog () {
        const vm = this
        vm.$emit('dialog', vm.dialog)
      }
    },
    mounted() {
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
      showlogin () {
        const vm = this
        vm.loginFlag = true;
      },
      sendRegister () {
        const vm = this
        if (vm.termsCheck) {
          const registerDataCheck = (vm.registerForm.username && vm.registerForm.email &&
            vm.registerForm.password && vm.registerForm.confirm_password)
          const minPasswordCheck = vm.registerForm.password.length >= 8
          const checkMatchPassword = (vm.registerForm.password === vm.registerForm.confirm_password)
          if (registerDataCheck) {
            if (minPasswordCheck) {
              if (checkMatchPassword) {
                vm.loadingBeforeRegister = true
                vm.$axios.$post('/register', vm.registerForm)
                  .then((res) => {
                    if (res.data.status === 'success') {
                      vm.showAlert({ title: 'สำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
                      vm.loginForm.username = vm.registerForm.username
                      vm.loginForm.password = vm.registerForm.password
                      vm.login()
                      vm.$nextTick(() => {
                        vm.loadingBeforeRegister = false
                        vm.termsCheck = false
                        vm.registerForm.username = ''
                        vm.registerForm.email = ''
                        vm.registerForm.password = ''
                        vm.registerForm.confirm_password = ''
                      })
                    } else {
                      vm.showAlert({ title: 'คำเตือน!', text: res.data.message, type: 'warning', time: 5, autoClose: true, show: true })
                    }
                  })
                  .catch((e) => {
                    if (e.response) {
                      vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
                    }
                  })
                  .finally(() => {
                    vm.loadingBeforeRegister = false
                  })
              } else {
                vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกรหัสผ่านให้ตรงกัน', type: 'warning', time: 5, autoClose: true, show: true })
              }
            } else {
              vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกรหัสผ่านขั้นต่ำ 8 ตัวอักษร', type: 'warning', time: 5, autoClose: true, show: true })
            }
          } else {
            vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
          }
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณายืนยันเงื่อนไขข้อตกลง', type: 'warning', time: 5, autoClose: true, show: true })
        }
      },
      login () {
        const vm = this
        if (vm.loginForm.username && vm.loginForm.password) {
          vm.loadingBeforeLogin = true
          vm.$axios.$post('/login', vm.loginForm)
            .then((res) => {
              console.log(res.data);
              if (res.data.is_login) {
                const auth = {
                  id: res.data.id,
                  accessToken: res.data.token,
                  isLogin: res.data.is_login,
                  email: res.data.email,
                  gold: '',
                  itemStoragCount: '',
                  username: res.data.username,
                  firstName: res.data.firstname,
                  lastName: res.data.lastname,
                  userPic: res.data.user_pic,
                  timestamp: res.data.expires
                }
                this.$store.commit('setAuth', auth)
                Cookie.set('boxzaAuth', auth)
                vm.showAlert({ title: 'Login สำเร็จ', text: 'เข้าสู่ระบบ', type: 'success', time: 5, autoClose: true, show: true })
                setTimeout(() => {
                  window.location.reload()
                  vm.dialog = false
                }, 1000)
              } else {
                vm.showAlert({ title: 'คำเตือน!', text: res.data.message, type: 'warning', time: 5, autoClose: true, show: true })
              }
            })
            .catch((e) => {
              if (e.response) {
                vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
              }
            })
            .finally(() => {
              vm.loadingBeforeLogin = false
            })
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      },
      resetPassword () {
        const vm = this
        const resetDataCheck = (vm.resetPasswordForm.username && vm.resetPasswordForm.password && vm.resetPasswordForm.new_password && vm.resetPasswordForm.confirm_password)
        const minConfirmPasswordCheck = vm.resetPasswordForm.confirm_password.length >= 8
        const checkMatchPassword = vm.resetPasswordForm.new_password === vm.resetPasswordForm.confirm_password
        if (resetDataCheck) {
          if (minConfirmPasswordCheck) {
            if (checkMatchPassword) {
              vm.loadingBeforeResetPass = true
              vm.$axios.$patch('/reset-password', vm.resetPasswordForm)
                .then((res) => {
                  vm.showAlert({ title: 'เปลี่ยนรหัสผ่านสำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
                  vm.resetPasswordForm.username = ''
                  vm.resetPasswordForm.password = ''
                  vm.resetPasswordForm.new_password = ''
                  vm.resetPasswordForm.confirm_password = ''
                  setTimeout(() => {
                    vm.dialog = false
                  }, 1000)
                })
                .catch((e) => {
                  if (e.response) {
                    vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
                  }
                })
                .finally(() => {
                  vm.loadingBeforeResetPass = false
                })
            } else {
              vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกรหัสผ่านใหม่ให้ตรงกัน', type: 'warning', time: 5, autoClose: true, show: true })
            }
          } else {
            vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกรหัสผ่านใหม่ขั้นต่ำ 8 ตัวอักษร', type: 'warning', time: 5, autoClose: true, show: true })
          }
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      },
      forgotPassword () {
        const vm = this
        if (vm.forgotPasswordForm.email) {
          vm.loadingBeforeForgotPass = true
          vm.$axios.$post('/forgot-password', vm.forgotPasswordForm)
            .then((res) => {
              if (res.data.message !== 'ไม่พบอีเมล') {
                vm.showAlert({ title: 'เปลี่ยนรหัสผ่านสำเร็จ', text: res.data.message, type: 'success', time: 5, autoClose: true, show: true })
                vm.forgotPasswordForm.email = ''
                setTimeout(() => {
                  vm.dialog = false
                }, 1000)
              } else {
                vm.showAlert({ title: 'ผิดพลาด!', text: res.data.message, type: 'error', time: 5, autoClose: true, show: true })
              }
            })
            .catch((e) => {
              if (e.response) {
                vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
              }
            })
            .finally(() => {
              vm.loadingBeforeForgotPass = false
            })
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอกข้อมูลให้ครบถ้วน', type: 'warning', time: 5, autoClose: true, show: true })
        }
      },
      // social
      socialGoogleLogin: function() {
        const provide = new firebase.auth.GoogleAuthProvider().addScope('email')
        firebase
          .auth()
          .signInWithPopup(provide)
          .then(result => {
            const obj = {
              google_id: result.additionalUserInfo.profile.id,
              fullname: result.additionalUserInfo.profile.name,
              firstname: result.additionalUserInfo.profile.given_name,
              lastname: result.additionalUserInfo.profile.family_name,
              email: result.additionalUserInfo.profile.email,
              user_pic: result.additionalUserInfo.profile.picture
              // user_type_id: 1
            };
            console.log(obj);
            // send to database
            const vm = this
            vm.loadingBeforeRegister = true
                vm.$axios.$post('/login/google', obj)
                  .then((res) => {
                    console.log(res);
                    const auth = {
                      id: res.data.id,
                      accessToken: res.data.token,
                      isLogin: res.data.is_login,
                      email: res.data.email,
                      gold: '',
                      itemStoragCount: '',
                      username: res.data.firstname,
                      firstName: res.data.firstname,
                      lastName: res.data.lastname,
                      userPic: res.data.user_pic,
                      timestamp: res.data.expires
                    }
                    this.$store.commit('setAuth', auth)
                    Cookie.set('boxzaAuth', auth)
                    vm.showAlert({ title: 'Login สำเร็จ', text: 'เข้าสู่ระบบ', type: 'success', time: 5, autoClose: true, show: true })
                    setTimeout(() => {
                      window.location.reload()
                      vm.dialog = false
                    }, 1000)
                  })
                  .catch((e) => {
                    if (e.response) {
                      vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
                    }
                  })
                  .finally(() => {
                    vm.loadingBeforeRegister = false
                  })
          })
          .catch(err => {
            console.warn('Oops. ' + err.message)
          });
      },
      socialFacebookLogin: function() {
        const provide = new firebase.auth.FacebookAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provide)
          .then(result => {
            console.log(result);
            const obj = {
              facebook_id: result.additionalUserInfo.profile.id,
              fullname: result.additionalUserInfo.profile.name,
              firstname: result.additionalUserInfo.profile.first_name,
              lastname: result.additionalUserInfo.profile.last_name,
              email: result.additionalUserInfo.profile.email,
              profile_image: result.additionalUserInfo.profile.picture.data.url
              // user_type_id: 1
            };
            // console.log(obj);
            // send to database
            const vm = this
            vm.loadingBeforeRegister = true
                vm.$axios.$post('/login/facebook', obj)
                  .then((res) => {
                    console.log(res);
                    const auth = {
                      id: res.data.id,
                      accessToken: res.data.token,
                      isLogin: res.data.is_login,
                      email: res.data.email,
                      gold: '',
                      itemStoragCount: '',
                      username: res.data.firstname,
                      firstName: res.data.firstname,
                      lastName: res.data.lastname,
                      userPic: res.data.user_pic,
                      timestamp: res.data.expires
                    }
                    this.$store.commit('setAuth', auth)
                    Cookie.set('boxzaAuth', auth)
                    vm.showAlert({ title: 'Login สำเร็จ', text: 'เข้าสู่ระบบ', type: 'success', time: 5, autoClose: true, show: true })
                    setTimeout(() => {
                      window.location.reload()
                      vm.dialog = false
                    }, 1000)
                  })
                  .catch((e) => {
                    if (e.response) {
                      vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
                    }
                  })
                  .finally(() => {
                    vm.loadingBeforeRegister = false
                  })
          })
          .catch(err => {
            console.warn('Oops. ' + err.message)
          });
      },
      socialTwitterLogin: function() {
        console.log('socialTwitterLogin');
        const provide = new firebase.auth.TwitterAuthProvider()
        firebase
          .auth()
          .signInWithPopup(provide)
          .then(result => {
            console.log(result);
            const obj = {
              twitter_id: result.additionalUserInfo.profile.id_str,
              fullname: result.additionalUserInfo.profile.name,
              firstname: result.additionalUserInfo.profile.name,
              lastname: result.additionalUserInfo.profile.family_name,
              email: result.additionalUserInfo.profile.email,
              profile_image: result.additionalUserInfo.profile.profile_image_url
              // user_type_id: 1
            };
            console.log(obj);
            // send to database
            const vm = this
            vm.loadingBeforeRegister = true
                vm.$axios.$post('/login/twitter', obj)
                  .then((res) => {
                    console.log(res);
                    const auth = {
                      id: res.data.id,
                      accessToken: res.data.token,
                      isLogin: res.data.is_login,
                      email: res.data.email,
                      gold: '',
                      itemStoragCount: '',
                      username: res.data.firstname,
                      firstName: res.data.firstname,
                      lastName: res.data.lastname,
                      userPic: res.data.user_pic,
                      timestamp: res.data.expires
                    }
                    this.$store.commit('setAuth', auth)
                    Cookie.set('boxzaAuth', auth)
                    vm.showAlert({ title: 'Login สำเร็จ', text: 'เข้าสู่ระบบ', type: 'success', time: 5, autoClose: true, show: true })
                    setTimeout(() => {
                      window.location.reload()
                      vm.dialog = false
                    }, 1000)
                  })
                  .catch((e) => {
                    if (e.response) {
                      vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
                    }
                  })
                  .finally(() => {
                    vm.loadingBeforeRegister = false
                  })
          })
          .catch(err => {
            console.warn('Oops. ' + err.message)
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #registerCard {
    padding: 10px;
    position: relative;
    border-radius: 15px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    .close-icon {
      text-align: right;
      margin-right: 5px;
      .icon {
        cursor: pointer;
        color: #cfcfcf;
        font-size: 30px;
      }
    }
    .register-form {
      max-width: 370px;
      margin: 30px auto !important;
      position: relative;
      border-bottom: 3px solid rgba(197, 197, 197, 0.44);
      padding-bottom: 50px;
      .input-form {
        .input-group {
          margin-bottom: 20px;
        }
        .input-group-text {
          border: none !important;
          border-radius: 1px !important;
          color: white !important;
          background: linear-gradient(to top right, #66c4c4, #00daf0) !important;
        }
        input {
          border: none !important;
          border-radius: 1px !important;
          background-color: #e9ecef !important;
        }
      }
      .checkbox-form {
        position: relative;
        [type="checkbox"]:checked,
        [type="checkbox"]:not(:checked) {
          position: absolute;
          left: -9999px;
        }
        [type="checkbox"]:checked + label,
        [type="checkbox"]:not(:checked) + label
        {
          position: relative;
          padding-left: 28px;
          line-height: 20px;
          display: inline-block;
          color: #666;
          font-weight: bold;
        }
        [type="checkbox"]:checked + label:before,
        [type="checkbox"]:not(:checked) + label:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 18px;
          height: 18px;
          background: rgba(196, 196, 196, 0.34);
          border-radius: 50%;
        }
        [type="checkbox"]:checked + label:after,
        [type="checkbox"]:not(:checked) + label:after {
          content: '';
          width: 8px;
          height: 8px;
          background: #717171;
          position: absolute;
          border-radius: 50%;
          top: 5px;
          left: 5px;
          -webkit-transition: all 0.2s ease;
          transition: all 0.2s ease;
        }
        [type="checkbox"]:not(:checked) + label:after {
          opacity: 0;
          -webkit-transform: scale(0);
          transform: scale(0);
        }
        .terms-box {
          cursor: pointer;
          color: #666;
          font-weight: bold;
          font-style: italic;
        }
      }
      .button-register-box {
        margin: 10px 0px;
        text-align: center;
        .button-register {
          background: linear-gradient(to top right, #66c4c4, #00daf0) !important;
          color: white;
          border-radius: 10px;
          min-width: 150px;
          font-size: 16px;
          font-weight: bold;
          box-shadow: none;
        }
      }
    }
    .login-form {
      max-width: 400px;
      margin: 30px auto !important;
      .login-topic {
        text-align: center;
        .topic-text {
          color: #6a6a6a;
          font-size: 20px;
        }
      }
      .button-login-box {
        margin: 10px 0px;
        text-align: center;
        font-weight: bold;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
        /*.button-login {*/
        /*  background: linear-gradient(to top right, #5e3a74, #ff00ba);*/
        /*  color: white;*/
        /*  border-radius: 10px;*/
        /*  width: 150px;*/
        /*  font-size: 16px;*/
        /*  font-weight: bold;*/
        /*  box-shadow: none;*/
        /*}*/
      }
      .button-password-action-box {
        font-size: 13px;
        margin: 10px 0px;
        text-align: center;
        font-weight: bold;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .social-buttons {
        margin-top: 10px;
        /*width: 80px;*/
        height: 45px;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
      .facebook {
        background-color: #1a51b4;
        justify-content: center;
        align-items: center;
        display: flex;
        .facebook-icon {
          width: 10%;
          height: 50%;
      }
      }
      .twitter {
        background-color: #15b3ff;
        justify-content: center;
        align-items: center;
        display: flex;
        .twitter-icon {
          font-size: 25px;
          color: white;
        }
      }
      .google-plus {
        background-color: #dd4315;
        justify-content: center;
        align-items: center;
        display: flex;
        .google-plus-icon {
          font-size: 30px;
          color: white;
        }
      }
    }
  }
</style>

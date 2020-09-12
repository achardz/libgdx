<template>
  <div id="editProfile">
    <AlertBox ref="alertBox" />
    <div class="row">
      <span class="topic col-12">ข้อมูลผู้ใช้</span>
      <div class="form-group col-12">
        <label for="email">Email</label>
        <input type="email" class="form-control col-xs-12 col-md-7" id="email" placeholder="email"
               v-model="editProfileForm.email">
        <!--<small id="emailHelp" class="form-text text-muted">*Email address is required to make payments through PayPal.
          Please enter email address that you can access.</small>-->
      </div>
      <span class="topicAddress col-12">ข้อมูลการจัดส่ง</span>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="firstName">ชื่อจริง</label>
        <input type="text" class="form-control" id="firstName" placeholder="ชื่อจริง"
               v-model="editProfileForm.firstname">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="lastName">นามสกุล</label>
        <input type="text" class="form-control" id="lastName" placeholder="นามสกุล"
               v-model="editProfileForm.lastname">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="idCard">รหัสบัตรประชาชน</label>
        <input type="text" oninput="this.value=this.value.replace(/[^0-9]/g,'');" maxlength="13" class="form-control" id="idCard" placeholder="รหัสบัตรประชาชน"
               v-model="editProfileForm.id_card">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="houseNumber">บ้านเลขที่</label>
        <input type="text" class="form-control" id="houseNumber" placeholder="บ้านเลขที่"
               v-model="editProfileForm.address">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="province">จังหวัด</label>
        <input type="text" class="form-control" id="province" placeholder="จังหวัด"
               v-model="editProfileForm.province">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="subDistrict">ตำบล</label>
        <input type="text" class="form-control" id="subDistrict" placeholder="ตำบล"
               v-model="editProfileForm.sub_district">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="district">อำเภอ / แขวง</label>
        <input type="text" class="form-control" id="district" placeholder="อำเภอ / แขวง"
               v-model="editProfileForm.district">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="road">ถนน</label>
        <input type="text" class="form-control" id="road" placeholder="ถนน"
               v-model="editProfileForm.road">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="building">ตึก / อาคาร</label>
        <input type="text" class="form-control" id="building" placeholder="ตึก / อาคาร"
               v-model="editProfileForm.building">
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="postCode">รหัสไปรษณีย์</label>
        <input type="text" class="form-control" id="postCode" placeholder="รหัสไปรษณีย์"
               v-model="editProfileForm.post">
      </div>
      <span class="topicSize col-12">ไซส์</span>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="shirtSize">ขนาดเสื้อ</label>
        <div class="input-group">
          <select class="form-control" v-model="editProfileForm.shirt_size" id="shirtSize">
            <option :value="null" selected disabled>ขนาดเสื้อ</option>
            <option v-for="shirtSize in shirtSizeList">
              {{ shirtSize }}
            </option>
          </select>
          <div class="input-group-prepend">
            <div class="input-group-text btn dropdown-toggle" />
          </div>
        </div>
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="pantsSize">ขนาดกางเกง</label>
        <div class="input-group">
          <select class="form-control" v-model="editProfileForm.pant_size" id="pantsSize">
            <option :value="null" selected disabled>ขนาดกางเกง</option>
            <option v-for="pantsSize in pantsSizeList">
              {{ pantsSize }}
            </option>
          </select>
          <div class="input-group-prepend">
            <div class="input-group-text btn dropdown-toggle" />
          </div>
        </div>
      </div>
      <div class="form-group col-xs-12 col-sm-6 col-md-4">
        <label for="shoeSize">ขนาดรองเท้า</label>
        <div class="input-group">
          <select class="form-control" v-model="editProfileForm.shoes_size" id="shoeSize">
            <option :value="null" selected disabled>ขนาดรองเท้า</option>
            <option v-for="shoeSize in shoeSizeList">
              {{ shoeSize }}
            </option>
          </select>
          <div class="input-group-prepend">
            <div class="input-group-text btn dropdown-toggle" />
          </div>
        </div>
      </div>
      <div class="col-12">
        <v-btn class="button-profile-save" :loading="loadingBeforeUpdateProfile" @click="updateProfile">
          <span class="button-text">Save</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import AlertBox from '@/components/general/alert-box/AlertBox'

  export default {
    name: 'EditProfile',
    components: {
      AlertBox
    },
    data: () => ({
      loadingBeforeUpdateProfile: false,
      editProfileForm: {
        email: '',
        firstname: '',
        lastname: '',
        id_card: '',
        address: '',
        province: '',
        sub_district: '',
        district: '',
        road: '',
        building: '',
        post: '',
        shirt_size: null,
        pant_size: null,
        shoes_size: null
      },
      shirtSizeList: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      pantsSizeList: ['29', '30', '31', '32', '33', '34', '35', '36', '37', '38'],
      shoeSizeList: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47']
    }),
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
      updateProfile () {
        const vm = this
        if (vm.editProfileForm.email) {
          vm.loadingBeforeUpdateProfile = true
          delete vm.editProfileForm.user_pic
          vm.$axios.$patch('/user-profile/profile', vm.editProfileForm)
            .then((res) => {
              vm.showAlert({ title: 'สำเร็จ', text: 'เพิ่มข้อมูลสำเร็จ', type: 'success', time: 5, autoClose: true, show: true })
              vm.$emit('editProfileUpdate', true)
            })
            .catch((e) => {
              if (e.response) {
                vm.showAlert({ title: 'ผิดพลาด!', text: e.response.data.data.message ? e.response.data.data.message : 'ระบบขัดข้อง', type: 'error', time: 5, autoClose: true, show: true })
              }
            })
            .finally(() => {
              vm.loadingBeforeUpdateProfile = false
            })
        } else {
          vm.showAlert({ title: 'คำเตือน!', text: 'กรุณากรอก email', type: 'warning', time: 5, autoClose: true, show: true })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin button($colorOne, $colorTwo) {
    color: white;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(to top right, $colorOne, $colorTwo);
    border-radius: 8px;
  }
  select {
    /*border-right: 0px !important;*/
    /*border-color: #e9ecef !important;*/
    cursor: pointer;
    border: 1px solid #e9ecef;
    overflow: hidden;
    padding: 6px 20px 6px 6px !important;
    width: auto;
  }
  .dropdown-toggle {
    position: absolute;
    height: 94%;
    top: 1px;
    z-index: 3;
    right: 0px;
    pointer-events:none;
    &::after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: "";
      border-top: 0.6em solid;
      border-right: 0.4em solid transparent;
      border-bottom: 0;
      border-left: 0.4em solid transparent;
    }
  }
  .form-control {
    border-radius: 2px !important;
  }
  .form-group {
    padding-top: 0px;
    margin-bottom: 0px !important;
    label {
      color: #7c7b7b;
      font-size: 1rem;
    }
  }
  .text-muted {
    color: red !important
  }
  .topic {
    padding-top: 0px;
    font-weight: bold;
    font-style: italic;
  }
  .topicAddress, .topicSize {
    padding-top: 20px;
    font-weight: bold;
    font-style: italic;
  }
  .button-profile-save {
    margin: auto;
    margin-top: 40px;
    height: 35px !important;
    width: 140px !important;
    text-decoration: none;
    @include button(#46bfbf, #00daf0);
    &:hover {
      @include button(#36aaaa, #04ccdf);
    }
  }
</style>

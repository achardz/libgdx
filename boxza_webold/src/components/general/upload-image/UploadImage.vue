<template>
  <div id="previewImageBox">
    <AlertBox ref="alertBox" />
    <label class="main-preview-image">
      <input class="none-input-file" :id="`inputImageFile`" type="file" accept="image/*" @change="pushImage">
      <img class="preview-image" v-if="image" :src="image">
      <span class="icon-plus" v-if="!image">
        <img v-if="showImage" id="imageUser" :src="showImage">
        <template v-else>
          <img id="imageUser" src="~@/assets/images/icon/account.png">
          <v-icon class="camera-icon">mdi-camera</v-icon>
        </template>
      </span>
    </label>
  </div>
</template>

<script>
  import { toNumber } from '@/components/utility/utility'
  import AlertBox from '@/components/general/alert-box/AlertBox'

  export default {
    name: 'UploadImage',
    components: {
      AlertBox
    },
    props: {
      showImage: { type: String, default: '' }
    },
    data () {
      return {
        imageList: [],
        imageName: '',
        image: ''
      }
    },
    methods: {
      toNumber: toNumber,
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
      pushImage: function (e) {
        const vm = this
        const files = e.target.files
        if (files.length !== 0) {
          const convertImageSize = vm.toNumber(Math.round(files[0].size / 1024)) // .KB
          if (files[0].name !== '') {
            const imagePath = files[0].name.split('.')
            const checkType = '.' + imagePath[imagePath.length - 1]
            const typeImage = ['.png', '.jpg', '.jpeg', '.heic', '.gif']
            const checkData = new Set(typeImage)
            const checkBoolean = checkData.has(checkType.toLowerCase())
            if (checkBoolean) {
              if (convertImageSize <= 4700) {
                const findInputValue = document.querySelector(`#inputImageFile`).value
                if (findInputValue) {
                  setImmediate(() => {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      vm.image = reader.result
                      vm.$emit('imageFile', vm.image)
                      vm.imageName = files[0].name
                    }
                    reader.readAsDataURL(files[0])
                  })
                }
              } else {
                vm.showAlert({ title: 'ผิดพลาด!', text: 'ขนาดของไฟล์รูปภาพต้องไม่เกิน 4.5 MB', type: 'error', time: 5, autoClose: true, show: true })
              }
            }
            if (!checkBoolean) {
              vm.showAlert({ title: 'ผิดพลาด!', text: 'กรุณาเพิ่มไฟล์ที่เป็นนามสกุล ' + typeImage.join(' '), type: 'error', time: 5, autoClose: true, show: true })
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #previewImageBox {
    text-align: center;
    .main-preview-image {
      position: relative;
      margin-bottom: 0px !important;
      cursor: pointer;
      display: inline-block;
      background-color: #00000005;
      /*width: 100%;*/
      /*height: 100%;*/
      width: 100px;
      height: 100px;
      border-radius: 50%;
      input[type="file"] {
        display: none;
      }
      .preview-image {
        height: 100%;
        margin-top: 1px;
        width: 100%;
        cursor: pointer;
        border-radius: 50%;
      }
      .icon-plus {
        #imageUser {
          border-radius: 50%;
          width: 100px;
          height: 100px;
        }
        cursor: pointer;
        display: inline-block;
        .upload-icon {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 120px;
          color: #949aaf;
          transition: all ease-in 0.2s !important;
        }
      }
      .camera-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        color: white;
      }
    }
  }
</style>

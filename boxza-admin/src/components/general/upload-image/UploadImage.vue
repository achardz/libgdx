<template>
  <div id="uploadImage">
    <AlertBox ref="alertBox" />
    <div id="uploadImageBox" class="side-image">
      <div id="slider" class="row">
        <div class="image-container slide">
          <div class="disabled-outside-box">
            <div class="row image-no-box">
              <div class="col-md box-card-image"
                   :class="{
                     'pr-0': index === (imageList.length - 1),
                     'pl-0': item === imageList[0]
                   }"
                   v-for="(item, index) in imageList" :key="index">
                <div class="upload-col-box">
                  <div class="upload-box">
                    <div id="dropArea">
                      <div id="imageLoading" v-if="item.loadingFlag">
                        <Loading
                          :type="'image'"
                          :iconSize="'30px'"
                          :textSize="'30px'" />
                      </div>
                      <div id="previewImageBox" v-if="!item.loadingFlag">
                        <label class="main-preview-image">
                          <input class="none-input-file" :id="`inputImageFile_${index}`"
                                 :data-field="JSON.stringify({'index': index})"
                                 :data-target="index" type="file"
                                 accept="image/*" @change="pushImage">
                          <img :id="`previewImage${index}`" class="preview-image" v-if="item.previewImage" :src="item.image">
                          <span class="icon-plus" v-if="!item.previewImage">
                            <i class="fa fa-plus-circle upload-icon" aria-hidden="true" />
                          </span>
                        </label>
                        <span class="button-remove" v-if="item.previewImage"><i class="icon-opr-cancel" @click="removeImage(index)" /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="imageDetail" v-if="item.previewImage">
                  <label class="font-pic-name">{{ item.imageName }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loading from '@/components/general/loading/Loading'
  import AlertBox from '@/components/general/alert-box/AlertBox'
  import { toNumber } from '@/components/general/utility/utility'
  export default {
    name: 'UploadImage',
    components: {
      AlertBox,
      Loading
    },
    data () {
      return {
        previewImage: false,
        imageList: [],
        imageName: '',
        image: '',
        imageSum: 1,
        loadingFlag: false
      }
    },
    mounted () {
      this.genImageList()
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
      genImageList: function () {
        const vm = this
        vm.imageList.push({ image: '', imageName: '', previewImage: false, loadingFlag: false })
      },
      pushImage: function (e) {
        const vm = this
        const files = e.target.files || e.dataTransfer.files
        const indexImage = JSON.parse(e.target.dataset.field).index
        if (files.length !== 0) {
          if (vm.imageList.length <= vm.imageSum) {
            const convertImageSize = vm.toNumber(Math.round(files[0].size / 1024)) // .KB
            if (files[0].name !== '') {
              const imagePath = files[0].name.split('.')
              const checkType = '.' + imagePath[imagePath.length - 1]
              const typeImage = ['.png', '.jpg', '.jpeg', '.heic', '.gif']
              const checkData = new Set(typeImage)
              const checkBoolean = checkData.has(checkType.toLowerCase())
              if (checkBoolean) {
                if (convertImageSize <= 4700) {
                  vm.imageList[indexImage].previewImage = true
                  vm.imageList[indexImage].loadingFlag = true
                  const findInputValue = document.querySelector(`#inputImageFile_${indexImage}`).value
                  if (findInputValue) {
                    setImmediate(() => {
                      vm.imageList[indexImage].loadingFlag = false
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        vm.imageList[indexImage].image = reader.result
                        vm.imageList[indexImage].imageName = files[0].name
                        if (vm.imageList.length <= (vm.imageSum - 1)) {
                          if (vm.imageList[vm.imageList.length - 1].imageName) {
                            vm.imageList.push({ image: '', imageName: '', previewImage: false, loadingFlag: false })
                          }
                        }
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
      },
      removeImage (indexImage) {
        const vm = this
        // Clear image box
        vm.imageList.splice(indexImage, 1)
        const findImageBox = vm.imageList.filter(e => e.image)
        if (findImageBox.length === (vm.imageSum - 1)) {
          vm.imageList.push({ image: '', imageName: '', previewImage: false, loadingFlag: false })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  #uploadImage {
    .side-image {
      height: 92px;
      padding-top: 8px;
      width: 100%;
      overflow-x: auto;
      background-color: #fff;
      border-radius: 5px;
    }
    .side-image::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
      border-radius: 10px;
    }
    .side-image::-webkit-scrollbar {
      width: 2px;
      height: 11px;
      background-color: #F5F5F5;
    }
    .side-image::-webkit-scrollbar-thumb {
      background-color: #1646D4;
      border-radius: 10px;
    }
    #uploadImageBox {
      @mixin fontData($size, $weight, $color) {
        font-size: $size;
        font-weight: $weight;
        color: $color;
        font-family: 'THSarabunNew';
      }
      .row{
        display: flex;
        margin: auto;
      }
      #slider {
        margin: 0 auto;
        width: 100%;
        .image-container{
          width: 100%;
          .disabled-outside-box {
            position: relative;
            .image-no-box{
              margin-left: 0px !important;
              width: 100%;
              .box-card-image {
                display: flex;
                .upload-col-box{
                  position: relative;
                  border-radius: 4px;
                  height: 80px;
                  border: 1px #C4C4C4 dashed;
                  .upload-box {
                    position: relative;
                    /* Drag and drop */
                    #dropArea {
                      cursor: pointer;
                      position: relative;
                      padding: 1px;
                      width: 80px;
                      height: 80px;
                      border-radius: 5px;
                      text-align: center;
                      /*input {*/
                      /*position: absolute;*/
                      /*cursor: pointer;*/
                      /*top: 0;*/
                      /*right: 0;*/
                      /*bottom: 0;*/
                      /*left: 0;*/
                      /*width: 100%;*/
                      /*height: 100% !important;*/
                      /*opacity: 0;*/
                      /*}*/
                      #previewImageBox {
                        .button-remove {
                          position: absolute;
                          margin-left: -6px;
                          margin-top: -9px;
                          cursor: pointer;
                          z-index: 1;
                          @include fontData(14px, 600, #333333);
                          &:hover {
                            @include fontData(14px, bold, #6793bc);
                          }
                        }
                        .main-preview-image {
                          margin-bottom: 0px !important;
                          cursor: pointer;
                          display: inline-block;
                          input[type="file"] {
                            display: none;
                          }
                          .preview-image {
                            width: 100%;
                            cursor: pointer;
                            max-height: 100%;
                            border-radius: 3px;
                            height: 76px !important;
                          }
                          .icon-plus {
                            cursor: pointer;
                            width: 78px;
                            height: 76px;
                            display: inline-block;
                            i {
                              font-size: 16px;
                              margin-bottom: 5px;
                              color: #1459a8;
                              -webkit-transition: all ease-in 0.2s !important;
                              transition: all ease-in 0.2s !important;
                            }
                            .upload-icon {
                              padding-top: 26px;
                              margin-bottom: 0px;
                              color: #1646d4;
                              transition: all ease-in 0.2s !important;
                            }
                          }
                        }
                      }
                    }
                  }
                }
                .upload-col-box:hover{
                  border: 1px #6793bc dashed;
                }
              }
            }
            .disabled-inside-box {
              position: absolute;
              width: 100%;
              height: 100%;
              background-color: white;
              opacity: 0.5;
              z-index: 999;
              cursor: no-drop;
            }
          }
        }
      }
      #imageDetail {
        word-break: break-all;
        text-align: justify;
        position: relative;
        margin-top: -7px;
        .font-pic-name {
          @include fontData(18px, 600, #333333);
          margin-left: 10px;
        }
      }
      .loadImageValidate {
        border: 2px solid #dd5155;
      }
      .boxUploadImage {
        margin-left: -15px;
      }
    }
  }
</style>

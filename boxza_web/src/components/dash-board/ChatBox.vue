<template>
  <div id="chatBox">
    <v-btn class="mx-2" v-if="!openChat" fab dark large color="cyan" @click="openChat = !openChat">
      <v-icon dark>mdi-wechat</v-icon>
    </v-btn>
    <div class="chat-box" v-if="openChat">
      <div class="hide-chat-mobile is-hidden-tablet" @click="openChat = !openChat">
        <v-icon class="hide-chat-text" color="white">mdi-chevron-double-down</v-icon>
      </div>
      <div class="content-chat-box">
        <template v-for="message in messageData">
          <div class="no-user-box" v-if="message.no_user">
            <img class="img-show-reward" :src="message.item_pic_2">
            <div class="text-box">
              <label class="user-text-reward">ยินดีด้วย <span class="text-red">{{ message.username }}</span> คุณได้รับของมูลค่า</label>
              <span class="price-text-reward">{{ mapField(message.item_price, '', '0', 0) }} ฿</span>
            </div>
            <v-avatar class="user-avatar">
              <img v-if="message.user_pic" :src="message.user_pic">
              <img v-else src="~@/assets/images/icon/account.png">
            </v-avatar>
          </div>
          <div class="user-message container" v-if="!message.no_user">
            <div class="row pl-3">
              <div class="col p-0 user-img-message">
                <img v-if="message.userPic" id="userImageMessage" :src="message.userPic">
                <img v-else src="~@/assets/images/icon/account.png">
              </div>
              <div class="col user-content-message">
                <div class="first-name">{{ message.username }}</div>
                <div class="message-text">{{ message.messageText }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="input-box">
        <div class="hide-chat-desktop is-hidden-mobile" @click="openChat = !openChat">
          <v-icon class="hide-chat-text" color="white">mdi-chevron-double-right</v-icon>
        </div>
        <div class="input-group">
          <input type="text" class="form-control" v-model="userMessage" @keyup.enter="sendMessage" placeholder="พิมพ์ข้อความที่นี้">
          <div class="input-group-prepend" @click="sendMessage">
            <div class="input-group-text">
              <span class="arrow-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import mapField from '~/components/general/format-not-null/FormatNotNull'

  export default {
    name: 'ChatBox',
    data () {
      return {
        openChat: false,
        messageData: [],
        userMessage: '',
        userPic: this.$store.getters['auth/getProfile'] ? this.$store.getters['auth/getProfile'].userPic : '',
        username: this.$store.getters['auth/getProfile'] ? this.$store.getters['auth/getProfile'].username : 'user'
      }
    },
    mounted() {
      // /*socket.on('sendMessage', (msg) => {
      //   this.messageData.push(msg)
      // })*/
    },
    methods: {
      mapField: mapField,
      sendMessage () {
        // const vm = this
        // if (vm.userMessage) {
        //   vm.userPic = this.$store.getters['auth/getProfile'].userPic
        //   const sendMessageForm = {
        //     username: vm.username,
        //     userPic: vm.userPic,
        //     messageText: vm.userMessage
        //   }
        //   socket.emit('sendMessage', sendMessageForm)
        // }
        // vm.userMessage = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  #chatBox {
    z-index: 1;
    .hide-chat-mobile {
      position: absolute;
      top: -35px;
      right: 0;
      height: 35px;
      width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: linear-gradient(to right, #4cc9c9, #00daf0);
      .hide-chat-text {
        width: 20px;
        font-size: 35px;
      }
    }
    .mx-2 {
      position: fixed;
      bottom: 0;
      right: 30px;
      margin-bottom: 20px;
    }
    .chat-box {
      position: fixed;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 17%;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      background-color: white;
      .content-chat-box {
        overflow: auto;
        height: calc(100% - 46px);
        .no-user-box {
          width: 100%;
          height: 40%;
          margin-bottom: 15px;
          position: relative;
          background: linear-gradient(to top right, #f03700, #ffcc6f);
          .img-show-reward {
            height: 100%;
            width: 100%;
          }
          .text-box {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            padding: 20px;
            color: white;
            font-weight: bold;
            .user-text-reward {
              font-size: 0.7vw;
              .text-red {
                color: red !important;
              }
            }
            .price-text-reward {
              margin-top: 10px;
              display: block;
              font-size: 1.3vw;
            }
          }
          .user-avatar {
            position: absolute;
            bottom: 15px;
            right: 15px;
            width: 2.8vw;
            height: 2.8vw;
            min-width: 2.8vw ;
          }
        }
        .user-message {
          .user-img-message {
            margin-top: 15px;
            max-width: 40px;
            max-height: 40px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .user-content-message {
            .first-name {
              color: blue;
              word-break: break-all;
              font-weight: bold;
            }
            .message-text {
              word-break: break-all;
              color: #828282;
            }
          }
        }
      }
      .input-box {
        width: 100%;
        position: absolute;
        bottom: 0;
        max-height: 45px;
        .input-group {
          max-1height: 45px;
          input {
            height: auto;
            border: 0px !important;
            border-top: 1px solid #c5c5c5 !important;
            border-radius: 0px !important;
          }
          input:focus {
            box-shadow: none !important;
          }
          .input-group-prepend {
            cursor: pointer;
            border: 1px solid #4cc9c9;
            height: 45px;
            .input-group-text {
              color: white;
              border: 1px solid #4cc9c9;
              background: linear-gradient(to right, #4cc9c9, #00daf0);
              .arrow-right {
                width: 0;
                height: 0;
                border-left: 35px solid white;
                border-top: 15px solid transparent;
                border-bottom: 15px solid transparent;
              }
            }
          }
        }
        .hide-chat-desktop {
          position: absolute;
          bottom: 0;
          left: -30px;
          height: 45px;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: linear-gradient(to right, #4cc9c9, #00daf0);
          .hide-chat-text {
            width: 20px;
            font-size: 35px;
          }
        }
      }
    }
    @media (max-width: 1440px) {
      .text-box {
        .user-text-reward {
          font-size: 0.9vw !important;
        }
        .price-text-reward {
          margin-top: 10px;
          display: block;
          font-size: 1.3vw;
        }
      }
    }
    @media (max-width: 1979px) {
      .arrow-right {
        border-left: 1.6vw solid white !important;
        border-top: 1vw solid transparent !important;
        border-bottom: 1vw solid transparent !important;
      }
      .no-user-box {
        width: 100%;
        height: 30% !important;
      }
      .chat-box {
        width: 22%;
        height: 60%;
      }
    }
    @media (max-width: 1024px) {
      .no-user-box {
        width: 100%;
        height: 20% !important;
      }
      .text-box {
        .user-text-reward {
          font-size: 0.8vw !important;
        }
        .price-text-reward {
          margin-top: 10px;
          display: block;
          font-size: 1vw !important;
        }
      }
      .user-avatar {
        width: 2.8vw !important;
        height: 2.8vw !important;
        min-width: 2.8vw !important;
      }
    }
    @media (min-width: 500px) and (max-width: 768px) {
      .chat-box {
        top: auto;
        bottom: 0;
        height: 40%;
        width: 40%;
      }
      .text-box {
        .user-text-reward {
          font-size: 1.5vw !important;
        }
        .price-text-reward {
          margin-top: 10px;
          display: block;
          font-size: 1.9vw !important;
        }
      }
      .user-avatar {
        width: 4.8vw !important;
        height: 4.8vw !important;
        min-width: 4.8vw !important;
      }
    }
    @media (max-width: 499px) {
      .chat-box {
        top: auto;
        bottom: 0;
        height: 40%;
        width: 100%;
        .no-user-box {
          width: 100%;
          height: 30% !important;
        }
      }
      .text-box {
        .user-text-reward {
          font-size: 4vw !important;
        }
        .price-text-reward {
          margin-top: 10px;
          display: block;
          font-size: 6vw !important;
        }
      }
      .user-avatar {
        width: 10.8vw !important;
        height: 10.8vw !important;
        min-width: 10.8vw !important;
      }
    }
  }
</style>

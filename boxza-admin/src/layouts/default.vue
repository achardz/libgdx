<template>
  <v-app v-if="!$store.state.auth">
    <Login></Login>
  </v-app>
  <v-app color="primary" v-else>
    <v-navigation-drawer color="primary" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app >
      <v-list>
        <v-list-item color="white" v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="color" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
      <v-btn color="white" icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn color="white" icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title class="color" v-text="title" />
      <v-spacer></v-spacer>
      <v-toolbar-title class="color mr-5" v-text="$store.getters['auth/getProfile'].username" />
      <v-btn width="150px" height="40px" color="red" dark :loading="loadingBeforeLogout" @click="logout">Logout</v-btn>
    </v-app-bar>
    <v-content class="content-box">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import menuList from './menuList.json'
  import Login from '~/components/login'
  const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    Login
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: menuList,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      loadingBeforeLogout: false,
      title: 'Boxza (Administrator)'
    }
  },
  methods: {
    logout: function () {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .color {
    color: white;
    /*background-color: white;*/
  }
</style>
<style>
  html {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .v-input .v-label {
    height: 25px;
    display: flex;
    align-items: center;
    line-height: 20px;
  }
</style>

<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list dense>
        <v-list-item
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click="onLogout"
          v-if="isUserLoggedIn"
        >
          <v-list-item-icon>
            <v-icon>fa-arrow-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark color="primary">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Ad application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link of links"
          :key="link.title"
          :to="link.url"
          text
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn
          @click="onLogout"
          text
          v-if="isUserLoggedIn"
        >
          <v-icon left>fa-arrow-right</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn text dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>

export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Orders', icon: 'fa-heart', url: '/orders'},
          {title: 'New ad', icon: 'fa-star', url: '/new'},
          {title: 'My ads', icon: 'fa-list', url: '/list'}
        ]
      }

      return [
        {title: 'Login', icon: 'fa-lock', url: '/login'},
        {title: 'Registration', icon: 'fa-address-card', url: '/registration'}
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>

<template>
  <div>
    <div id="sign-in" class="login-bg container">
      <div class="login-page card">
        <div class="row">
          <form class="container" @submit.prevent="processForm">
            <p v-for="(error, index) in errors" :key="index">
              <SectionMessage type="danger" title-message="Unable to login" :text-message="error" />
            </p>

            <div class="text-center">
              <img class="mb-3" src="../assets/logo.png" alt="Black Horse Carriers Inc." />
              <h1 class="mb-3">Login</h1>
              <p class="mb-0">Welcome to Vuejs</p>
              <p>Please sign in to your account</p>
            </div>

            <div class="input-w-icon mb-3">
              <input
                type="text"
                id="login-input"
                name="login-input"
                v-model="loginField"
                class="text-editor w-100 icon-envelope"
                placeholder="Email Address / User ID"
                autofocus=""
              />
            </div>
            <div class="input-w-icon mb-3">
              <input
                type="password"
                id="login-pass"
                name="login-pass"
                v-model="password"
                class="text-editor w-100 icon-envelope"
                placeholder="Password"
              />
            </div>
            <div class="form-group input-w-icon"></div>
            <button type="submit" class="btn btn-lg btn-primary btn-block">Login</button>
            <button
              type="button"
              class="btn btn-lg btn-primary btn-block"
              @click="$router.push('register')"
            >
              Create Account
            </button>

            <div class="row align-items-center my-4">
              <div class="col pl-0">
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="RememberLogin"
                    name="RememberLogin"
                    v-model="remember_login_check"
                    @change="rememberClick"
                  />
                  <label for="RememberLogin">Remember me</label>
                </div>
              </div>
              <div class="col-auto text-right pr-0">
                <router-link to="forgot-password">Forgot password? </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="loginBkg">
      <img src="../assets/images/bg-ocean.jpg" alt="" class="loginBkg__img" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueJwtDecode from 'vue-jwt-decode';

import SectionMessage from '@/components/common/SectionMessage.vue';

export default {
  name: 'Login',
  components: {
    SectionMessage
  },
  data() {
    return {
      loginField: '',
      password: '',
      remember_login_check: false,
      errors: []
    };
  },
  mounted() {
    // get data from localStorage
    const userdata = window.localStorage.getItem('userdata');
    if (userdata) {
      try {
        const decoded = this.decodeToken(userdata);
        if (decoded && decoded.exp < JSON.parse(new Date().getTime() / 1000)) {
          Vue.prototype.$http.defaults.headers.common.Authorization = null;
          window.localStorage.removeItem('userdata');
        } else {
          this.$router.push({
            name: 'Success'
          });
        }
      } catch (e) {
        console.error(e);
        this.errors.push(`Can't get the current user data, try again.`);
        throw new Error(`Can't get the current user data`);
      }
    }
  },
  methods: {
    async processForm() {
      const loginDetails = { UserName: this.loginField, Password: this.password };

      try {
        const { user, token } = await this.$store.dispatch('login', loginDetails);

        window.localStorage.setItem('userdata', user);
        window.localStorage.setItem('usertoken', token);

        const decoded = this.decodeToken(user);
        await this.$store.dispatch('setUserData', decoded);
        await this.$store.dispatch('setUserToken', token);

        await this.setDefaultToken(token);

        this.$router.push({
          name: 'Success'
        });
      } catch (e) {
        console.error(e);
        this.errors.push(`Can't get the user data`);
        throw new Error(`Can't get the user data`);
      }
    },
    setDefaultToken(token) {
      Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}` || null;
    },
    decodeToken(token) {
      return VueJwtDecode.decode(token);
    },
    rememberClick() {
      //toDo;
    }
  }
};
</script>

<style>
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}
</style>

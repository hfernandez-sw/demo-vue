<script>
import Vue from 'vue';

export default {
  name: 'Signout',
  created() {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = null;
    // clears browser local storage
    window.localStorage.removeItem('userdata');

    this.$router.push({
      name: 'Login'
    });
  }
};
</script>

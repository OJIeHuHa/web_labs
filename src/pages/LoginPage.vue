<template>
    <div id="login-form-wrap">
    <h2>Login</h2>
    <div id="login-form">
      <p>
        <input type="email" id="email" v-model="email" name="email" placeholder="Email Address" required><i class="validation"><span></span><span></span></i>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </p>
      <p>
        <input type="password" id="password" v-model="password" name="password" placeholder="Password" required>
      </p>
      <p>
        <button type="submit" to="/profile" @click="login" id="login">Login</button>
      </p>
    </div>
    <div id="login-error-message"></div>
    <div id="create-account-wrap">
      <p>Not a member? <router-link to="/register">Create account</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // ...
  methods: {
    login() {
      let model = {
        email: this.email,
        password: this.password
      };
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };
      axios
        .post('http://localhost:8000/api/login', model, config)
        .then(response => {
          
          if (response.data.status === 200) {
            // Зберігаємо email в Vuex store перед переходом до /profile
            console.log("Logged user email:", this.email)
            this.$store.commit('setUserEmail', this.email);
            this.$router.push('/profile');
          }
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }
};
</script>


<style scoped>
  @import '../style.css';
</style>

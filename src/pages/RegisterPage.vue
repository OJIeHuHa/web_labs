<template>
    <div id="registration-form-wrap">
    <h2>Registration</h2>
    <div id="registration-form">
      <div class="form-group">
        <input type="text" class="form-control" id="name" v-model="name" placeholder="Your name">
      </div>
      <div class="form-group">
        <input type="email" id="email" name="email" v-model="email" class="form-control" placeholder="Email Address" required>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" name="password" class="form-control" placeholder="Password" required>
      </div>
      <div class="form-group">
        <select class="form-control" id="gender" v-model="gender">
          <option value="" selected disabled hidden>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-group">
        <input type="date" id="date-input" v-model="dob" name="dob" class="form-control" placeholder="Birth Date">
      </div>
      <div class="form-group">
        <div id="registration-error-message"></div>
        <button type="submit" @click="registration" class="btn btn-primary btn-lg">Register</button>
      </div>
    </div>
    <div id="login-account-wrap">
      <p>Already have an account? <router-link to="/login">Log In</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
    name: '',
    email: '',
    password: '',
    gender: null,
    dob: null
  }),
  methods: {
    registration() {
      let model = {
        name: this.name,  
        email: this.email,
        password: this.password,
        gender: this.gender,
        dob: this.dob,
        posts: []
      }
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };
      console.log(model);
      axios.post('http://localhost:8000/api/register', model, config)
      .then(response => {
        if(response.data.status == 200) {
          return this.$router.push('/login')
        }
        console.log(response.data.message)
      })
      .catch(error => {
        console.error(error.message);
      })
      
    }
  }
}
</script>

<style scoped>
  @import '../style.css';
</style>

<template>
  <nav class="navbar">
    <ul>
      <li class="main-link"><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/workpage">Workpage</router-link></li>
    </ul>
    <button type = "submit" id="logout" @click="logOut"><router-link to="/login">Log Out</router-link></button>
  </nav>
  <div class="outer-profile-container">
    <div>
      <img src="@/assets/profile-picture.png" alt="Profile photo" style="display: block; margin: 0 auto; margin-top:5%;">
    </div>
    <div class="profile-container">
      <table>
        <tr>
          <td>Name:</td>
          <td id="name">{{ user.name }}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td id="email">{{ user.email }}</td>
        </tr>
        <tr>
          <td>DOB:</td>
          <td id="dob">{{ user.dob }}</td>
        </tr>
        <tr class="last-row">
          <td>Gender:</td>
          <td id="gender">{{ user.gender }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    // Отримуємо userEmail з Vuex Store
    const userEmail = this.$store.getters.getUserEmail;
    console.log("getter userEmail:", userEmail)
    // Виклик методу /profile через API за допомогою Axios з передачею userEmail
    axios.get(`http://localhost:8000/api/profile?userEmail=${userEmail}`)
      .then(response => {
        this.user = response.data.user;
        console.log("User:",this.user);
        this.$store.commit('setUser', this.user);
      })
      .catch(error => {
        console.error(error);
      });
  },
}
</script>


<style scoped>
  
  .navbar {

    background-color: #212529;
    display: flex;
    height: 55px;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  .navbar li {
    margin: 0;
    padding: 0;
  }
  
  .navbar a {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    font-size:20px;
  }
  
  .navbar a.active {
    background-color: #212529;
  }

  .main-link {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: #343a40;
  }
  
  .main-link:hover {
    background-color: #343a40;
  }

  .navbar a:not(.active):hover {
    background-color: #666;
  }
  
  #logout {
    width:8em;
    height:75%;
    margin-bottom:0.5%;
  }
</style>









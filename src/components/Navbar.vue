<template>
    <nav class="navbar">
        <ul>
          <li><a><router-link :params="user" to="/profile">Profile</router-link></a></li>
          <li><a><router-link :params="user" to="/workpage">Workpage</router-link></a></li>
        </ul>
        <button @click="logOut"><router-link to="/login">Log Out</router-link></button>
      </nav>
      <router-view/>
</template>

<script>
    export default {
      props: {
        user: {
          type: Boolean,
          required: true
        }
      },
      methods: {
        toggleUser() {
          const newValue = !this.user
          this.$emit('update-prop', newValue)
        },
        logOut() {
          localStorage.setItem("user", JSON.stringify([]))
          this.toggleUser()
        }
      }
    }
</script>

<style scoped>

  .navbar {
    background-color: #212529;
    display: flex;
    height: 55px;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 0;
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
    font-size:16px;
  }
  
  .navbar a.active {
    background-color: #212529;
  }

  .main-link {
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

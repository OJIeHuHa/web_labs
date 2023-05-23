<template>
  <router-view v-if="!user"/>
  <div v-if="user">
    <Navbar :user="user" @update-prop="updatePropValue"/> 
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: 'App',
  data: () => ({
    user: false,
    userData: []
  }),
  components: {
    Navbar
  },
  methods: {
    updatePropValue(newValue) {
      this.user = newValue;
    },
  },
  /*beforeMount() {
    let userInfo = localStorage.getItem("user")
    console.log(userInfo)
    if(userInfo == 0 || userInfo.length === 2) {
      return 0
    } else {
      return this.user = true
    } 
  }*/
}
</script>

<style scoped>
  @import 'style.css';
</style>

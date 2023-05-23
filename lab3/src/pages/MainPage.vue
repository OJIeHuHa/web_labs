<template>
    <div class="MainPageBg">
        <div class="upper-container">
            <div class="logo-container" style="display: flex;">
                <img src="@/assets/logo.png" style="display:block;height:50px;width:50px;">
                <p>OnlinePhoneBook</p>
            </div>
            <button type="submit" id="login-logo" @click ="toLogin">Log In</button>
        </div>
        <div class="slogan-container">
            <p style="margin-left:10%">WE WILL </p>
            <p style="margin-left:20%">ORGANIZE YOUR CONTACTS </p>
        </div>
        <div class="tryout-container">
            <button type="submit" id="try-out" @click ="toRegister">Try out</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toLogin() {
                this.$router.push('/login');
            },
            toRegister() {
                this.$router.push('/register');
            }
        }
        
    }
</script>

<style scoped>
    .MainPageBg {
        background-image: url('@/assets/background.png');
        background-repeat:repeat-y;
        background-size: cover;
        background-position: center; 
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .upper-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;
        background-color:#6c757d;
        width:100%;
        height:6%;
    }

    .slogan-container {
        margin:10%;
        margin-top:5em;
        margin-bottom:5%;
        font-weight:bold;
        font-size:50px;
        display: flex;
        flex-direction:column;
        border-radius:40px;
        position: relative;
        color:#000000;
    }
    #try-out
    {
        margin-left:35%;
        width:30%;
    }

    #login-logo {
        width:5em;
        margin-top:0.2%;
        margin-bottom:0.5%;
    }
</style>

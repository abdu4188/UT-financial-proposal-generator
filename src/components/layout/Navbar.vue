<template>
  <div>
      <nav class=" blue darken-3">
        <div class="nav-wrapper">
        <a href="#" class="brand-logo"><router-link style="color: white; text-decoration: none;" :to="{name: 'Home'}"><img src="../../assets/logo.png" alt="UT Solutions"></router-link></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li v-if="loggedIn"><router-link style="color: white; text-decoration: none;" :to="{name: 'Home'}">Home</router-link></li>
            <li v-if="loggedIn"><router-link style="color: white; text-decoration: none;" :to="{name: 'Documents'}">Documents</router-link></li>
            <li><router-link style="color: white; text-decoration: none;" :to="{name: 'AddUser'}">Add User</router-link></li>
            <li><router-link style="color: white; text-decoration: none;" :to="{name: 'AddProject'}">Add Project</router-link></li>
            <li>Logout</li>
        </ul>
        </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{
      loggedIn: false
    }
  }
}
</script>

<style>
.brand-logo img{
    height: 6vh;
    width: auto;
}
</style>
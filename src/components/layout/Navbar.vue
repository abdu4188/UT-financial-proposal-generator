<template>
  <div>
      <nav class=" blue darken-3">
        <div class="nav-wrapper">
        <a href="#" class="brand-logo"><router-link style="color: white; text-decoration: none;" :to="{name: 'Home'}"><img src="../../assets/logo.png" alt="UT Solutions"></router-link></a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li v-if="loggedIn"><router-link style="color: white; text-decoration: none;" :to="{name: 'Home'}">Home</router-link></li>
            <li v-if="loggedIn"><router-link style="color: white; text-decoration: none;" :to="{name: 'Documents'}">Documents</router-link></li>
            <li v-if="loggedIn && superu"><router-link style="color: white; text-decoration: none;" :to="{name: 'AddUser'}">Add User</router-link></li>
            <li v-if="loggedIn && superu"><router-link style="color: white; text-decoration: none;" :to="{name: 'ManageUsers'}">Manage Users</router-link></li>
            <li v-if="loggedIn"><router-link style="color: white; text-decoration: none;" :to="{name: 'AddProject'}">Add Project</router-link></li>
            <li v-if="loggedIn"><a @click="logout">Logout</a></li>
        </ul>
        </div>
    </nav>
  </div>
</template>

<script>
import {auth, db} from '@/firebase/init'

export default {
  name: 'Navbar',
  data(){
    return{
      loggedIn: false,
      superu: false,
      userId: null,
    }
  },
  methods:{
    logout(){
      auth.signOut().then(
        () => {
          this.loggedIn = false
          this.$router.push({name: 'Login'})
        }
      ).catch(
        err => {
          console.log(err.message);
        }
      )
    },
    checkSuper(uid){
      console.log("here")
      db.collection('users').doc(uid).get().then(
        doc => {
          if(doc.data()['admin'] == 'super'){
            this.superu = true
          }
        }
      )
    },
  },
  created(){
    auth.onAuthStateChanged(
      user => {
        if(user){
          this.loggedIn = true
          this.checkSuper(user.uid)
        }
      }
    )
  }
}
</script>

<style>
.brand-logo img{
    height: 6vh;
    width: auto;
}
</style>
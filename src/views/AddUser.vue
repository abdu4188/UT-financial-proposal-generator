<template>
  <div class="add-user">
      <div class="container custom-container">
          <div class="card-panel">
              <div class="card-title center">
                <h4 class="blue-text darken-3">Add User</h4>
            </div>
             <div class="row">
                 <div class="col-sm-4"></div>
                 <div class="col-sm-4">
                    <form class="card-content center">
                        <div class="field input-field center">
                            <input v-model="email" type="email" name="email">
                            <label for="email">Email</label>
                        </div>
                        <div class="switch">
                            <label>
                            Super user
                            <input type="checkbox" v-model="superu">
                            <span class="lever"></span>
                            </label>
                        </div><br><br>
                        <a @click="addUser()" class="waves-effect waves-light btn blue darken-3 white-text">Login</a>
                    </form>
                 </div>
             </div>
          </div>
      </div>
  </div>
</template>

<script>
import {db} from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'AddUser',
    data(){
        return{
            email: null,
            superu: false
        }
    },
    methods: {
        addUser(){
            // this.$progress.start()
            db.collection('users').where('email', '==', this.email).get().then(
                snapshot => {
                    if(snapshot.empty){
                        let sendMail = firebase.functions().httpsCallable('sendMail');
                        sendMail(
                            {
                                email: this.email,
                                superu: this.superu
                            }
                        ).then(
                            () => {
                                // this.$Progress.finish()
                                this.$dialog.alert("User has been added successfuly. An email has been sent to the user.")
                                this.email = null,
                                this.superu = false
                            }
                        ).catch(
                            () => {
                                // this.$Progress.fail()
                                this.$dialog.alert("Error! Please check the email address you inserted and make sure you are connected to the internet")
                            }
                        )
                    }
                     else{
                        // this.$Progress.fail()
                        this.$dialog.alert("Error! The email address you entered is in use")
                    }
                }
            )
        }
    }
}
</script>

<style>
.card-content{
    text-align: center !important;
}
</style>
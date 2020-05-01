<template>
  <div class="login">
      <div class="container custom-container">
        <div class="card-panel">
            <div class="card-title center">
                <h4 class="blue-text darken-3">Login</h4>
            </div>
            <form @submit.prevent="login">
                <div class="row col-sm-12">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4 center.align">
                        <div class="field input-field">
                            <input v-model="email" type="email" name="email">
                            <label for="email">Email</label>
                        </div>
                        <p class="red-text darken-3" v-if="emailFeedback">{{ emailFeedback }}</p>
                        <div class="field input-field">
                            <input v-model="password" type="password" name="password">
                            <label for="password">Password:</label>
                        </div>
                        <p class="red-text darken-3" v-if="passwordFeedback">{{ passwordFeedback }}</p>
                        <div class="center">
                            <button class="waves-effect waves-light btn blue darken-3 white-text">Login</button><br><br>
                            <a class="flat">Forgot password</a>
                        </div>
                    </div>
                    <div class="col-sm-4"></div>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import {auth, db} from '@/firebase/init'

export default {
name:'Login',
    data(){
        return{
            email: null,
            password: null,
            emailFeedback: null,
            passwordFeedback: null
        }
    },
    created(){
        auth.signOut().then()
    },
    methods: {
        login(){
            this.$Progress.start()
            if(this.email && this.password){
                this.passwordFeedback = null
                this.emailFeedback =  null
                auth.signInWithEmailAndPassword(this.email, this.password).then(
                    () => {
                        var uid = auth.currentUser.uid
                        db.collection('users').doc(uid).get().then(
                            doc => {
                                if(doc.data()['disabled']){
                                    this.$Progress.fail()
                                    this.passwordFeedback = "Your account has been disabled. Please contact your admin."
                                }
                                else if(doc.data()['deleted']){
                                    this.$Progress.fail()
                                    this.passwordFeedback = "This account has been deactivated. Please contact your admin."
                                }
                                else{
                                    this.$Progress.finish()
                                    this.$router.push({name: 'Home'})
                                }
                            }
                        )
                    }
                ).catch(err => {
                    this.$Progress.fail()
                    this.passwordFeedback = err.message
                })
            }
            else if(this.email == null){
                this.$Progress.fail()
                this.emailFeedback = "Please enter an email address"
            }
            else{
                this.$Progress.fail()
                this.passwordFeedback = "Please enter your password"
            }
        },
    }

}
</script>

<style>
.login .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 65vw;
}
.col-sm-4{
    width: 33%;
}
</style>
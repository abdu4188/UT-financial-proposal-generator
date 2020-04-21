<template>
  <div class="signup">
      <div class="container custom-container">
        <div class="card-panel">
            <div class="card-title center">
                <h4 class="blue-text darken-3">Signup</h4>
            </div>
            <form @submit.prevent="signup" class="">
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4 center.align">
                        <div class="field input-field">
                            <input v-model="firstName" type="text" name="fname">
                            <label for="fname">First name</label>
                        </div>
                        <p class="red-text darken-3" v-if="firstNameFeedback">{{ firstNameFeedback }}</p>
                        <div class="field input-field">
                            <input v-model="lastName" type="text" name="lname">
                            <label for="lname">Last name</label>
                        </div>
                        <p class="red-text darken-3" v-if="lastNameFeedback">{{ lastNameFeedback }}</p>
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
                        <div class="field input-field">
                            <input v-model="rePassword" type="password" name="repass">
                            <label for="repass">Enter your password again</label>
                        </div>
                        <p class="red-text darken-3" v-if="rePasswordFeedback">{{ rePasswordFeedback }}</p>
                        <div class="center">
                            <button class="waves-effect waves-light btn blue darken-3 white-text">signup</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import {db, auth} from '@/firebase/init'


export default {
name: 'Signup',
    data(){
        return{
            firstName: null,
            firstNameFeedback: null,
            lastName: null,
            lastNameFeedback: null,
            email: null,
            password: null,
            rePassword: null,
            emailFeedback: null,
            passwordFeedback: null,
            rePasswordFeedback: null,
            admin: null,
            sentEmail: null,
        }
    },
    methods:{
        signup(){
            console.log("start")
            this.$Progress.start()
            if (this.firstName == null) {
                this.$Progress.fail()
                this.firstNameFeedback = "First name is required"
            }
            if (this.lastName == null) {
                this.$Progress.fail()
                this.lastNameFeedback = "Last name is required"
            }
            if (this.phone == null) {
                this.$Progress.fail()
                this.phoneFeedback = "Phone number is required"
            }
            if (this.email == null) {
                this.$Progress.fail()
                this.emailFeedback = "Email is required"
            }
            if(this.email != null && this.email != this.$route.params.email){
                this.$Progress.fail()
                this.emailFeedback = "You can only register with the email address you recieved the invitaion with"
            }
            if (this.password == null) {
                this.$Progress.fail()
                this.passwordFeedback = "Password is required"
            }
            if (this.password != this.rePassword) {
                this.$Progress.fail()
                this.rePasswordFeedback = "Passwords do not match"
            }
            console.log(this.firstName && this.lastName && this.email && this.phone && this.password && this.rePassword && this.password == this.rePassword && this.email == this.$route.params.email);
            
            if (this.firstName && this.lastName && this.email && this.password && this.rePassword && this.password == this.rePassword && this.email == this.$route.params.email) {
                
                this.firstNameFeedback = null
                this.lastNameFeedback = null
                this.emailFeedback = null
                this.phoneFeedback = null
                this.passwordFeedback = null
                this.rePasswordFeedback = null

                auth.createUserWithEmailAndPassword(this.email, this.password).then(
                    
                    cred => {
                        console.log(cred.user.uid),
                        db.collection('users').doc(cred.user.uid).set({
                            admin: this.admin,
                            email: this.email,
                            fname: this.firstName,
                            surname: this.lastName,
                            'user.uid': cred.user.uid
                        }).catch(
                            err => {
                                console.log(err.message);
                                
                            }
                        )
                    }
                ).then( () => {
                    this.$Progress.finish()
                    this.$router.push({name: 'Login'})
                }
                ).catch(
                    err => {
                        this.$Progress.fail()
                        console.log(err.message)
                        this.rePasswordFeedback = err.message
                    }
                )
            }
        }
    },
    created(){
        auth.signOut().then()
        this.sentEmail = this.$route.params.email
        if(this.$route.params.superu){
            this.admin = "super"
        }
        else{
            this.admin = "admin"
        }
    }
}
</script>

<style>
.signup .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 60vw;
}
</style>
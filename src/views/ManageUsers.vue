<template>
  <div class="manage-users">
      <div class="container custom-container">
          <div class="card-panel">
                <div class="card-title center">
                    <h5 class="blue-text darken-3">Users</h5>
                </div>
                <div class="card-content">
                    <table class="highlight">
                        <thead>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Super</th>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody :key="reRender">
                            <tr v-for="user in users" :key="user['uid']">
                                <td>{{user['fname']+" "+user['surname']}}</td>
                                <td>{{user['email']}}</td>
                                <td v-if="user['admin'] == 'super'"><i class="blue-text small material-icons">check</i></td>
                                <td v-else><i class="blue-text small material-icons">close</i></td>
                                <td><a v-if="user['disabled']" @click="enable(user)" class="waves-effect waves-light blue white-text darken-3 btn">Enable</a>
                                <a v-else @click="disable(user)" class="waves-effect waves-light blue white-text darken-3 btn">Disable</a>
                                
                                </td>
                                
                                <td><a @click="deleteU(user['uid'])"  class="waves-effect waves-light red white-text btn">Delete</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import {db} from '@/firebase/init'

export default {
    name: 'ManageUsers',
    data(){
        return{
            users: [],
            loaded: false,
            reRender: 0,
        }
    },
    methods:{
        disable(id){
            console.log("disable");
            if(id['user.uid'] != undefined){
                db.collection('users').doc(id['user.uid']).update(
                    {
                        disabled: true
                    }
                ).then(
                    () => {
                        this.forceUpdate()
                    }
                )
            }
        },
        forceUpdate(){
            location.reload()
        },
        enable(id){
            if(id != undefined){
                db.collection('users').doc(id['user.uid']).update(
                    {
                        disabled: false
                    }
                ).then(
                    () => {
                        this.forceUpdate()
                    }
                )
            }
        },
        deleteU(id){
            if(id != undefined){
                let result = confirm("This action is irreversible. Do you really want to delete this user?")
                if(result){
                    db.collection('users').doc(id['user.uid']).update(
                        {
                            deleted: true
                        }
                    ).then(
                        () => {
                            this.forceUpdate()
                        }
                    )
                }
                
            }
        },
    },
    created(){
        db.collection('users').get().then(
            snapshot => {
                snapshot.forEach(
                    doc => {
                        this.users.push(doc.data())
                    }
                );
            }
        )
    },
    watch: {
        users: function(){
            this.loaded = true
        }
    }
}
</script>

<style>
.manage-users .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 80vw;
}
</style>
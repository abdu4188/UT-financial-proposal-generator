<template>
  <div class="addProject">
      <div class="container custom-container">
          <div class="card-panel ">
              <div class="card-content center">
                  <h5 class="card-title blue-text darken-3">Create Project</h5>
                  <div class="row">
                      <div class="col-sm-4"></div>
                      <div class="col-sm-4">
                        <form @submit.prevent="addProject">
                            <div class="field input-field">
                                <input v-model="name" type="text" name="name" id="name">
                                <label for="name">Project Name</label>
                            </div>
                            <button type="submit" class="create-btn waves-effect waves-light btn blue darken-3 white-text">Add</button>
                        </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import {db} from '@/firebase/init'

export default {
    name: 'AddProject',
    data(){
        return{
            name: null
        }
    },
    methods:{
        addProject(){
            db.collection('projects').doc().set(
                {
                    name: this.name
                }
            ).then( () => {
                console.log("added");
            }).catch((err) => {
                console.log(err.message);
            })
        }
    }
}
</script>

<style>
.addProject .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 80vw;
}
.field{
  width: 25vw;
}
</style>
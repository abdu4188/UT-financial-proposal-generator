<template>
    <div class="documents">
        <div class="container custom-container">
            <div class="card-panel">
                <div class="card-title center">
                    <h5 class="blue-text darken-3">Documents Prepared Previously</h5>
                </div>
                <div class="card-content">
                    <div class="center">
                        <a class=" waves-effect waves-light btn blue darken-3 white-text" @click="loadProjects">Load</a>
                    </div>
                    <table class="highlight">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>
                                <th>
                                <th style="text-align: right">Last modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div style="display: table-row" v-for="(project, index) in projects" :key="index">
                                <tr class="main-row">
                                    <td>
                                    <a class="collapsible-header" data-toggle="collapse" href="#project-detail">{{project['name']}}<i class="material-icons">expand_more</i></a>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td>{{project['modified']}}</td>
                                </tr>
                                <div class="collapse sub-row" id="project-detail" v-for="(document, index) in documents" :key="index">
                                    <tr class="sub-rows" v-if="document['project_id'] == project['id']">
                                        <td><b>Doc name:</b>{{ document['document_name']}}</td>
                                        <td><b>organization:</b>{{ document['organization']}}</td>
                                        <td></td>
                                        <td><b>Created on:</b> {{ document['time']}}</td>
                                        <td><a :href="getUrl(index)"  class="waves-effect waves-light btn blue darken-3 white-text">Download</a></td>
                                        <td><a @click="deleteDoc(document)" class="waves-effect waves-light btn red darken-3 white-text">Delete</a></td>
                                    </tr>
                                </div>
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {db, storage} from '@/firebase/init'
import moment from 'moment'

export default {
    name: 'DocumentsTable',
    data(){
        return{
            projects: [],
            projectIds: [],
            documents: [],
            users: [],
        }
    },
    methods:{
        loadProjects(){
            this.projectIds.forEach(element => {
                if(element){
                    db.collection('projects').doc(element).get().then(
                        doc => {
                            this.projects.push({
                                id: element,
                                name: doc.data()['name'],
                                modified: moment(doc.data()['modified']).format('MMMM Do YYYY, h:mm a')
                            })

                            this.projects = Array.from(new Set(this.projects.map(a => a.name))).map(
                                name => {
                                    return this.projects.find(a => a.name === name)
                                }
                            )
                        }
                    )
                    
                }
            });
            db.collection('documents').get().then(
                snapshot => {
                    snapshot.forEach(
                        doc => {
                            this.documents.push({
                                document_name: doc.data()['document_name'],
                                document_path: doc.data()['document_path'],
                                organization: doc.data()['organization'],
                                project_id: doc.data()['project_id'],
                                time: moment(doc.data()['time'] * 1000).format('MMMM Do YYYY, h:mm a'),
                                user_id: doc.data()['user_id']
                            })
                        }
                    );
                }
            )


            console.log(this.documents);
            
        },
        getUrl(index){
            return (this.documents[index]['document_path'])
        },
        async deleteDoc(name){
            name = await name['document_name']
            console.log(name);
            storage.ref().child("generated_docs/"+name+".docx").delete().then(
                () => {
                    console.log("deleted")
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
            
        }
    },
    created(){
        db.collection('documents').get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    this.projectIds.push(doc.data()['project_id'])
                });
            },
            
        ),

        db.collection('users').get().then(
            (snapshot) => {
                snapshot.forEach(doc => {
                    this.users.push({
                        id: doc.data()['user.uid'],
                        fname: doc.data()['fname'],
                        lname: doc.data()['lname'],
                    })
                });
            },
            
        )
    },
    
}
</script>

<style>
.documents .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 80vw;
}
.main-row td{
    width: 65vw;
}
.sub-rows td{
    width: 20%;
}
a{
    text-decoration: none;
}
a:hover{
    text-decoration: none;
}
</style>
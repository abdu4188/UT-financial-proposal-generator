<template>
  <div class="documents">
      <div class="container custom-container">
          <div class="card-panel">
              <div class="card-title center">
                   <h5 class="blue-text darken-3">Documents Prepared Previously</h5>
              </div>
              <div class="card-content">
                  <table class="highlight">
                      <thead>
                          <tr>
                              <th>Project Name</th>
                              <th>
                              <th>
                              <th style="text-align: right">Last modified</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="main-row">
                              <td>
                                <a class="collapsible-header" data-toggle="collapse" href="#project-detail">Project one<i class="material-icons">expand_more</i></a>
                              </td>
                              <td></td>
                              <td></td>
                              <td style="text-align: right">12/04/2020</td>
                          </tr>
                          <tr class="collapse sub-row" id="project-detail">
                              <td>Document 1</td>
                              <td>By: John Doe</td>
                              <td>Last Edited: Apr 14, 2020</td>
                              <td><a class="waves-effect waves-light btn yellow darken-3 white-text">Edit</a></td>
                              <td><a class="waves-effect waves-light btn blue darken-3 white-text">Download</a></td>
                          </tr>
                          <tr>
                              <td>
                                <a class="collapsible-header" data-toggle="collapse" href="#project-detail">Project one<i class="material-icons">expand_more</i></a>
                              </td>
                              <td></td>
                              <td></td>
                              <td style="text-align: right">12/04/2020</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

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
    width: 25%;
}
.sub-row{
    width: 20vw;
}
a{
    text-decoration: none;
}
a:hover{
    text-decoration: none;
}
</style>
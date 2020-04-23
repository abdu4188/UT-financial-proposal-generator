<template>
  <div class="home">
    <div class="container custom-container">
      <div class="card-panel">
        <div class="card-content center">
          <h5 class="card-title blue-text darken-3">Create New Document</h5>

          <form @submit.prevent="" class="form-group">
            <div class="row">

              <div class="col-sm-6">
                <div class="field">
                  <br>
                  <select name="project" class="form-control">
                    <option value="" selected disabled>project</option>
                  </select>
                  <div class="field input-field">
                    <input type="text" name="organizatio">
                    <label for="organization">Organization:</label>
                  </div>
                  <div class="field input-field">
                    <input type="text" name="ourReference">
                    <label for="ourReference">Our Reference No:</label>
                  </div>
                  <div class="field input-field">
                    <input type="number" name="exchange" step="0.01">
                    <label for="exchange">Exchange Rate:</label>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="field input-field">
                  <input type="text" name="docName">
                  <label for="docName">Document name:</label>
                </div>
                <div class="field input-field">
                  <input type="text" name="reference">
                  <label for="reference">Reference No:</label>
                </div>
                <div class="field input-group">
                  <input type="date" class="form-control date">
                  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <div class="field input-field">
                  <input type="text" name="optioms">
                  <label for="options">Option:</label>
                </div>
              </div>

            </div>
          </form>

          <table class="stripped centered">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                <th>Part No.</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>unit market price</th>
                <th>Markup percentage</th>
                <th><a class="waves-effect waves-light btn blue darken-3 white-text">Add row</a></th>
              </tr>
            </thead>
            <tbody class="body-rows">
              <tr>
                <td><a class="waves-effect waves-light btn red darken-3 white-text"><i class="material-icons left">delete</i></a></td>
                <td><input class="item-no" type="number" step="0.001" placeholder="Item no"></td>
                <td><input class="part-no" type="text" placeholder="part no"></td>
                <td><input type="text" placeholder="description"></td>
                <td><input class="quantity" type="number" step="0.01" placeholder="quantity"></td>
                <td><input class="ump" type="number" step="0.01" placeholder="UMP"></td>
                <td><input class="markup" type="number" step="0.01" placeholder="markup %"></td>
                <td><a class="add-sub waves-effect waves-light btn teal darken-3 white-text"><i class="material-icons left">add</i>sub</a></td>
              </tr>
              <tr>
                <td><div class="chip">Freight and Insurance</div></td>
                <td><div class="chip">Other costs</div></td>
                <td><div class="chip">Custom Rates</div></td>
                <td><div class="chip">Excise Tax</div></td>
                <td><div class="chip">VAT</div></td>
                <td><div class="chip">Surtax</div></td>
                <td><div class="chip">Withholding Tax</div></td>
              </tr>
              <tr>
                <td><input type="number" placeholder="freight & insurance"></td>
                <td><input type="number" placeholder="other costs"></td>
                <td><input type="number" placeholder="custom rates"></td>
                <td><input type="number" placeholder="excise tax"></td>
                <td><input type="number" placeholder="vat"></td>
                <td><input type="number" placeholder="surtax"></td>
                <td><input type="number" placeholder="withholding"></td>
              </tr>
            </tbody>
          </table><br><br>

          <div class="row">
            <div class="col-sm-6">
              <div class="field input-field">
                <textarea id="notes" class="materialize-textarea"></textarea>
                <label for="notes">Remarks:</label>
              </div>
            </div>

            <div class="col-sm-6">
              <h6> <b>Choose notes to be included</b></h6><br>
              <p>
                <label>
                  <input type="checkbox" />
                  <span>Please add 15% on all prices</span>
                </label><br>
                <label>
                  <input type="checkbox" />
                  <span>Price is valid for 15 days</span>
                </label><br>
                <label>
                  <input type="checkbox" />
                  <span>All prices are in Ethiopian birr</span>
                </label><br>
                <label>
                  <input type="checkbox" />
                  <span>Delivery will be within 45 days after PO, advance and bank foreign currency approval</span>
                </label><br>
                <label>
                  <input type="checkbox" />
                  <span>Payment Term 50% advance and remaining amount after delivery</span>
                </label><br>
                <label>
                  <input type="checkbox" />
                  <span>Installation is NOT part of this Quote</span>
                </label><br>
              </p>
               <div class="field ce input-field">
                <textarea id="notes" class="materialize-textarea" placeholder="note"></textarea>
              </div>
              <a class="waves-effect waves-light btn teal darken-3 white-text">add more</a>
            </div>
          </div>

          <a @click="create" class="create-btn waves-effect waves-light btn blue darken-3 white-text">create</a><br>

          <a :href="downloadLink" id="download" class="create-btn waves-effect waves-light btn blue darken-3 white-text">Download</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {storage} from '@/firebase/init'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver"

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      project: null,
      docName: null,
      orgName: null,
      refNo: null,
      ourRefNo: null,
      date: null,
      exchageRate: null,
      option: null,
      downloadLink: null
    }
  },
  methods:{
    create(){
      var storageRef = storage.ref()
      storageRef.child('master_doc/master.docx').getDownloadURL().then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function() {
        };
        xhr.open('GET', url);
        xhr.send();

        // var downloadBtn = document.getElementById('download');
        // downloadBtn.setAttribute('href',url)
        // let process = firebase.functions().httpsCallable('process');
        // process({
        //   masterUrl: url
        // })

        this.renderDoc(url)

      }).catch(function(err) {
        // Handle any errors
        console.log(err.message);
      });  
    },
    renderDoc(url) {
      loadFile(url, function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);
        doc.setData({
          organization: "John",
          // last_name: "Doe",
          // phone: "0652455478",
          // description: "New Website"
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          (key, value) => {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function(
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function(error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); //Output the document using Data-URI
        saveAs(out, "output.docx");
      });
    }
  },
  created(){
  },
}
</script>

<style>
.home .card-panel{
  border-radius: 25px;
  margin-top: 7vw;
  margin-bottom: 7vw;
}
.custom-container{
  width: 80vw;
}
select{
  display: inline;
}
.field{
  width: 25vw;
}
/* label color */
.input-field label {
  color: #1565c0 ;
}
/* label focus color */
.input-field input[type=text]:focus + label {
  color: #1565c0 ;
}
/* label underline focus color */
.input-field input[type=text]:focus {
  border-bottom: 1px solid #1565c0 ;
  box-shadow: 0 1px 0 0 #1565c0 ;
}
.add-sub{
  width: 5vw;
  margin: 0;
  padding: 0;
}
.add-sub i{
  margin: 0;
  padding: 0;
}
.item-no{
  width: 5vw !important;
}
.part-no{
  width: 6vw !important;
}
.quantity{
  width: 6vw !important;
}
.ump{
  width: 6vw !important;
}
.markup{
  width: 7vw !important;
}
.chip{
  height: auto;
}
.create-btn{
  margin: 5vw;
}
</style>

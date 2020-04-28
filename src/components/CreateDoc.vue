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
                  <select v-model="selectedProject" v-for="(project, index) in projects" :key="index" name="project" class="form-control">
                    <option disabled value="">Choose project</option>
                    <option :value="project" selected="selected"> {{project}} </option>
                  </select>
                  <div class="field input-field">
                    <input v-model="orgName" type="text" name="organizatio">
                    <label for="organization">Organization:</label>
                  </div>
                  <div class="field input-field">
                    <input v-model="ourRefNo" type="text" name="ourReference">
                    <label for="ourReference">Our Reference No:</label>
                  </div>
                  <div class="field input-field">
                    <input v-model="exchageRate" type="number" name="exchange" step="0.01">
                    <label for="exchange">Exchange Rate:</label>
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="field input-field">
                  <input v-model="docName" type="text" name="docName">
                  <label for="docName">Document name:</label>
                </div>
                <div class="field input-field">
                  <input v-model="refNo" type="text" name="reference">
                  <label for="reference">Reference No:</label>
                </div>
                <div class="field input-group">
                  <input v-model="date" type="date" class="form-control date">
                  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
                <div class="field input-field">
                  <input v-model="option" type="text" name="optioms">
                  <label for="options">Option:</label>
                </div>
                <div class="field input-field">
                  <input v-model="optionDescription" type="text" name="optioms">
                  <label for="options">Option description:</label>
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
                <th><a @click="addRow(false) " class="waves-effect waves-light btn blue darken-3 white-text">Add row</a></th>
              </tr>
            </thead>
            <tbody class="body-rows">
              <tr v-for="(row, index) in tableRows" :key="JSON.stringify(row)">
                  <td colspan="8">
                    <table>
                      <tr>
                        <td><a @click.prevent="deleteRow(index)" class="waves-effect waves-light btn red darken-3 white-text"><i class="material-icons left">delete</i></a></td>
                        <td><input v-model="form['item_no'+row]" class="item-no" type="number" step="0.001" placeholder="Item no"></td>
                        <td><input v-model="form['part_no'+row]" class="part-no" type="text" placeholder="part no"></td>
                        <td><input v-model="form['description'+row]" type="text" placeholder="description"></td>
                        <td><input v-model="form['quantity'+row]" class="quantity" type="number" step="0.01" placeholder="quantity"></td>
                        <td><input v-model="form['ump'+row]" class="ump" type="number" step="0.01" placeholder="UMP"></td>
                        <td><input v-model="form['markup_percentage'+row]" class="markup" type="number" step="0.01" placeholder="markup %"></td>
                        <td><a  @click="addRow(true) "  class="add-sub waves-effect waves-light btn teal darken-3 white-text"><i class="material-icons left">add</i>sub</a></td>
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
                        <td><input v-model="form['freight'+row]" type="number" placeholder="freight & insurance"></td>
                        <td><input v-model="form['other_costs'+row]" type="number" placeholder="other costs"></td>
                        <td><input v-model="form['custom_rates'+row]" type="number" placeholder="custom rates"></td>
                        <td><input v-model="form['excise_tax'+row]" type="number" placeholder="excise tax"></td>
                        <td><input v-model="form['vat'+row]" type="number" placeholder="vat"></td>
                        <td><input v-model="form['surtax'+row]" type="number" placeholder="surtax"></td>
                        <td><input v-model="form['withholding_tax'+row]" type="number" placeholder="withholding"></td>
                      </tr>
                    </table>
                  </td>          
              </tr>
            </tbody>
          </table><br><br>

          <div class="row">
            <div class="col-sm-6">
              <div class="field input-field">
                <textarea v-model="remark" id="notes" class="materialize-textarea"></textarea>
                <label for="notes">Remarks:</label>
              </div>
            </div>

            <div class="col-sm-6">
              <h6> <b>Choose notes to be included</b></h6><br>
              <p>
                <label>
                  <input type="checkbox" value="Please add 15% on all prices" v-model="checkedNotes"/>
                  <span>Please add 15% on all prices</span>
                </label><br>
                <label>
                  <input type="checkbox" value="Price is valid for 15 days" v-model="checkedNotes"/>
                  <span>Price is valid for 15 days</span>
                </label><br>
                <label>
                  <input type="checkbox" value="All prices are in Ethiopian birr" v-model="checkedNotes"/>
                  <span>All prices are in Ethiopian birr</span>
                </label><br>
                <label>
                  <input type="checkbox" value="Delivery will be within 45 days after PO, advance and bank foreign currency approval" v-model="checkedNotes"/>
                  <span>Delivery will be within 45 days after PO, advance and bank foreign currency approval</span>
                </label><br>
                <label>
                  <input type="checkbox" value="Payment Term 50% advance and remaining amount after delivery" v-model="checkedNotes"/>
                  <span>Payment Term 50% advance and remaining amount after delivery</span>
                </label><br>
                <label>
                  <input type="checkbox" value="Installation is NOT part of this Quote" v-model="checkedNotes"/>
                  <span>Installation is NOT part of this Quote</span>
                </label><br>
              </p>
              <form @submit.prevent="addNote">
                <div v-for="(note, index) in moreNotes" :key="index">
                  <div class="chip"> {{note}} </div>
                  <a @click.prevent="deleteNote(index)" class="waves-effect waves-light btn red darken-3 white-text"><i class="material-icons left">delete</i></a>
                </div>
                <div class="field ce input-field">
                  <textarea id="notes" class="materialize-textarea" v-model="moreNote" placeholder="note"></textarea>
                </div>
                <button type="submit" class="waves-effect waves-light btn teal darken-3 white-text">add</button>
              </form>
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
import {storage, db} from '@/firebase/init'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import firebase from 'firebase'
// import { saveAs } from "file-saver"

var storageRef = storage.ref()

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      projects: [],
      selectedProject: '',
      docName: null,
      orgName: null,
      refNo: null,
      ourRefNo: null,
      date: null,
      exchageRate: 1,
      option: null,
      optionDescription: null,
      downloadLink: null,
      remark: null,
      slicedRemark: [],
      checkedNotes: [],
      moreNote: null,
      moreNotes: [],
      currentRows: 0,
      tableRows: [],
      inputData: [],
      form: {},
      subRows: [],
      mainRows: [],
      calculatedValues: {},
      netTotal: 0,
      outputData: {
        "table": [],
        "notes": [],
        'remark': [],
      },
    }
  },
  methods:{
    addNote(){
      this.moreNotes.push(this.moreNote)
      this.moreNote = null
    },
    deleteNote(index){
      this.moreNotes.pop(index)
    },
    addRow(isSUb){
      this.currentRows++
      this.tableRows.push(this.currentRows)      

      if(isSUb){
        this.subRows.push(this.currentRows)
      }

      else{
        this.mainRows.push(this.currentRows)
      }
      
    },
    deleteRow(index){
      this.tableRows.splice(index, 1)
      this.currentRows--
    },
    create(){
      var tempObj = {} 
      this.slicedRemark = this.remark != null ? this.remark.replace(/\r\n/g,"\n").split("\n") : [];
      console.log(this.slicedRemark);
      
      this.checkedNotes = this.checkedNotes.concat(this.moreNotes)

      for (let index = 0; index < this.tableRows.length; index++) {
        tempObj['item_no-'+this.tableRows[index]] = this.form['item_no'+this.tableRows[index]]
        tempObj['part_no-'+this.tableRows[index]] = this.form['part_no'+this.tableRows[index]]
        tempObj['description-'+this.tableRows[index]] = this.form['description'+this.tableRows[index]]
        tempObj['quantity-'+this.tableRows[index]] = this.form['quantity'+this.tableRows[index]]
        tempObj['ump-'+this.tableRows[index]] = this.form['ump'+this.tableRows[index]]
        tempObj['markup-'+this.tableRows[index]] = this.form['markup_percentage'+this.tableRows[index]]
        tempObj['freight-'+this.tableRows[index]] = this.form['freight'+this.tableRows[index]]
        tempObj['other_costs-'+this.tableRows[index]] = this.form['other_costs'+this.tableRows[index]]
        tempObj['custom_rate-'+this.tableRows[index]] = this.form['custom_rates'+this.tableRows[index]]
        tempObj['excise_tax-'+this.tableRows[index]] = this.form['excise_tax'+this.tableRows[index]]
        tempObj['vat-'+this.tableRows[index]] = this.form['vat'+this.tableRows[index]]
        tempObj['surtax-'+this.tableRows[index]] = this.form['surtax'+this.tableRows[index]]
        tempObj['witholding-'+this.tableRows[index]] = this.form['withholding_tax'+this.tableRows[index]]
        
      }

      this.inputData.pop()
      this.inputData.push(tempObj)

      this.calculateValues(this.inputData[0])

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
      this.calculateNetTotal()
      var tempOutput = this.outputData;
      var docName;
      
      this.outputData['organization'] = this.orgName;
      this.outputData['project_type'] = this.projects;
      this.outputData['reference'] = this.refNo;
      this.outputData['option'] = this.option;
      this.outputData['option_comment'] =this.optionDescription
      this.outputData['our_ref_no'] = this.ourRefNo;
      this.outputData['date'] = this.date;
      this.outputData['total'] = this.netTotal;
      this.outputData['reminder'] = this.remark;

      for (let index = 0; index < this.checkedNotes.length; index++) {
        this.outputData['notes'].push(
          {
            notes: this.checkedNotes[index]
          }
        )
      }

      for (let index = 0; index < this.slicedRemark.length; index++) {
        this.outputData['remark'].push(
          {
            remark: this.slicedRemark[index]
          }
        )
      }

      docName = this.docName;


      loadFile(url, function(
        error,
        content
      ) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);

        doc.setData(
          tempOutput
        );
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
        
        var uploadTask = storageRef.child('generated_docs/'+docName+'.docx').put(out)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function(error) {

          // A full list of error codes is available at
          // https://firebase.google.com/docs/firebase.storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              console.log("unauthorized");
              break;

            case 'storage/canceled':
              // User canceled the upload
              console.log("canceled");
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              console.log("unknown");
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        });
      });
    },
    calculateValues(inputData){
      var customRate = 0
      var exciseTax = 0
      var freight = 0
      var markup = 0
      var otherCosts = 0
      var quantity = 0
      var surtax = 0
      var ump = 0
      var withholding = 0
      var vat = 0

      for (let index = 0; index < this.tableRows.length; index++) {
        customRate = inputData['custom_rate-'+this.tableRows[index]] != undefined ? parseInt(inputData['custom_rate-'+this.tableRows[index]])  : 0
        exciseTax = inputData['excise_tax-'+this.tableRows[index]] != undefined ?  parseInt(inputData['excise_tax-'+this.tableRows[index]]) : 0
        freight = inputData['freight-'+this.tableRows[index]] != undefined ? parseInt(inputData['freight-'+this.tableRows[index]]) : 0
        markup = parseInt(inputData['markup-'+this.tableRows[index]]) 
        otherCosts = inputData['other_costs-'+this.tableRows[index]] != undefined ? parseInt(inputData['other_costs-'+this.tableRows[index]]) : 0
        quantity = inputData['quantity-'+this.tableRows[index]] != undefined ? parseInt(inputData['quantity-'+this.tableRows[index]]) : 0
        surtax = inputData['surtax-'+this.tableRows[index]] != undefined ? parseInt(inputData['surtax-'+this.tableRows[index]]) : 0
        ump = inputData['ump-'+this.tableRows[index]] != undefined ? parseInt(inputData['ump-'+this.tableRows[index]]) : 0
        withholding = inputData['witholding-'+this.tableRows[index]] != undefined ? parseInt(inputData['witholding-'+this.tableRows[index]]) : 0
        vat = inputData['vat-'+this.tableRows[index]] != undefined ? parseInt(inputData['vat-'+this.tableRows[index]]) :0

        var cif = ump + freight + otherCosts
        var customsDuty = cif * (customRate/100)
        var afterExcise = (cif + customsDuty) + ((cif + customsDuty) * (exciseTax/100))
        var afterVat = afterExcise + (afterExcise + (vat/100))
        var afterSurtax = afterVat + (afterVat * (surtax/100))
        var withholdingValue = cif * (withholding/100)
        var costOfGood = afterSurtax + withholdingValue
        var unitSalesPrice = costOfGood + (costOfGood * markup/100)
        var totalPrice = unitSalesPrice * quantity

        this.calculatedValues['unit-price'+this.tableRows[index]] = (Math.round((unitSalesPrice + Number.EPSILON) * 100) / 100 ) * this.exchageRate
        this.calculatedValues['total-price'+this.tableRows[index]] = (Math.round((totalPrice + Number.EPSILON) * 100) / 100) * this.exchageRate

        this.outputData['table'].push(
          {
            item_no: inputData['item_no-'+this.tableRows[index]] == undefined ? "" : inputData['item_no-'+this.tableRows[index]],
            part_no: inputData['part_no-'+this.tableRows[index]] == undefined ? "" : inputData['part_no-'+this.tableRows[index]],
            description: inputData['description-'+this.tableRows[index]] == undefined ? "" : inputData['description-'+this.tableRows[index]],
            quantity: inputData['quantity-'+this.tableRows[index]] == undefined ? "" : inputData['quantity-'+this.tableRows[index]],
            unit_price: this.calculatedValues['unit-price'+this.tableRows[index]] == undefined ? "" : this.calculatedValues['unit-price'+this.tableRows[index]],
            total_price: this.calculatedValues['total-price'+this.tableRows[index]] == undefined ? "" : this.calculatedValues['total-price'+this.tableRows[index]]
          }
        )

      }
    },
    calculateNetTotal(){
      for (let index = 0; index < this.mainRows.length; index++) {          
        this.netTotal = parseInt(this.netTotal) + parseInt(this.calculatedValues['total-price'+this.mainRows[index]])          
      }
      
    }
  },
  created(){
    db.collection('projects').get().then(
      snapshot => {
        snapshot.forEach(doc => {
          this.projects.push(doc.data()['name'])
        });
      }
    )
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
th{
  margin: 0;
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
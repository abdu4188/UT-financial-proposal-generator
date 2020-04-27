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
              </div>

            </div>
          </form>

          <table class="stripped centered">
            <pre>{{ form }}</pre>
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
import {storage, db} from '@/firebase/init'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
// import { saveAs } from "file-saver"

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
      exchageRate: null,
      option: null,
      downloadLink: null,
      currentRows: 0,
      tableRows: [],
      inputData: [],
      form: {},
      subRows: [],
      mainRows: [],
      calculatedValues: {},
    }
  },
  methods:{
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
    },
    create(){
      var tempObj = {}

      for (let index = 0; index < this.subRows.length; index++) {
        tempObj['sub_item_no-'+this.subRows[index]] = this.form['item_no'+this.subRows[index]]
        tempObj['sub_part_no-'+this.subRows[index]] = this.form['part_no'+this.subRows[index]]
        tempObj['sub_description-'+this.subRows[index]] = this.form['description'+this.subRows[index]]
        tempObj['sub_quantity-'+this.subRows[index]] = this.form['quantity'+this.subRows[index]]
        tempObj['sub_ump-'+this.subRows[index]] = this.form['ump'+this.subRows[index]]
        tempObj['sub_markup-'+this.subRows[index]] = this.form['markup_percentage'+this.subRows[index]]
        tempObj['sub_freight-'+this.subRows[index]] = this.form['freight'+this.subRows[index]]
        tempObj['sub_other_costs-'+this.subRows[index]] = this.form['other_costs'+this.subRows[index]]
        tempObj['sub_custom_rate-'+this.subRows[index]] = this.form['custom_rates'+this.subRows[index]]
        tempObj['sub_excise_tax-'+this.subRows[index]] = this.form['excise_tax'+this.subRows[index]]
        tempObj['sub_vat-'+this.subRows[index]] = this.form['vat'+this.subRows[index]]
        tempObj['sub_surtax-'+this.subRows[index]] = this.form['surtax'+this.subRows[index]]
        tempObj['sub_witholding-'+this.subRows[index]] = this.form['withholding_tax'+this.subRows[index]]

      }

      for (let index = 0; index < this.mainRows.length; index++) {
        tempObj['item_no-'+this.mainRows[index]] = this.form['item_no'+this.mainRows[index]]
        tempObj['part_no-'+this.mainRows[index]] = this.form['part_no'+this.mainRows[index]]
        tempObj['description-'+this.mainRows[index]] = this.form['description'+this.mainRows[index]]
        tempObj['quantity-'+this.mainRows[index]] = this.form['quantity'+this.mainRows[index]]
        tempObj['ump-'+this.mainRows[index]] = this.form['ump'+this.mainRows[index]]
        tempObj['markup-'+this.mainRows[index]] = this.form['markup_percentage'+this.mainRows[index]]
        tempObj['freight-'+this.mainRows[index]] = this.form['freight'+this.mainRows[index]]
        tempObj['other_costs-'+this.mainRows[index]] = this.form['other_costs'+this.mainRows[index]]
        tempObj['custom_rate-'+this.mainRows[index]] = this.form['custom_rates'+this.mainRows[index]]
        tempObj['excise_tax-'+this.mainRows[index]] = this.form['excise_tax'+this.mainRows[index]]
        tempObj['vat-'+this.mainRows[index]] = this.form['vat'+this.mainRows[index]]
        tempObj['surtax-'+this.mainRows[index]] = this.form['surtax'+this.mainRows[index]]
        tempObj['witholding-'+this.mainRows[index]] = this.form['withholding_tax'+this.mainRows[index]]
        
      }

      this.inputData.pop()
      this.inputData.push(tempObj)

      this.calculateValues(this.inputData[0])
      console.log(this.calculatedValues);

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
        // var out = doc.getZip().generate({
        //   type: "blob",
        //   mimeType:
        //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        // }); //Output the document using Data-URI
        // saveAs(out, "output.docx");
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

      for (let index = 0; index < this.mainRows.length; index++) {
        customRate = inputData['custom_rate-'+this.mainRows[index]] != undefined ? parseInt(inputData['custom_rate-'+this.mainRows[index]])  : 0
        exciseTax = inputData['excise_tax-'+this.mainRows[index]] != undefined ?  parseInt(inputData['excise_tax-'+this.mainRows[index]]) : 0
        freight = inputData['freight-'+this.mainRows[index]] != undefined ? parseInt(inputData['freight-'+this.mainRows[index]]) : 0
        markup = parseInt(inputData['markup-'+this.mainRows[index]]) 
        otherCosts = inputData['other_costs-'+this.mainRows[index]] != undefined ? parseInt(inputData['other_costs-'+this.mainRows[index]]) : 0
        quantity = inputData['quantity-'+this.mainRows[index]] != undefined ? parseInt(inputData['quantity-'+this.mainRows[index]]) : 0
        surtax = inputData['surtax-'+this.mainRows[index]] != undefined ? parseInt(inputData['surtax-'+this.mainRows[index]]) : 0
        ump = inputData['ump-'+this.mainRows[index]] != undefined ? parseInt(inputData['ump-'+this.mainRows[index]]) : 0
        withholding = inputData['witholding-'+this.mainRows[index]] != undefined ? parseInt(inputData['witholding-'+this.mainRows[index]]) : 0
        vat = inputData['vat-'+this.mainRows[index]] != undefined ? parseInt(inputData['vat-'+this.mainRows[index]]) :0

        var cif = ump + freight + otherCosts
        var customsDuty = cif * (customRate/100)
        var afterExcise = (cif + customsDuty) + ((cif + customsDuty) * (exciseTax/100))
        var afterVat = afterExcise + (afterExcise + (vat/100))
        var afterSurtax = afterVat + (afterVat + surtax)
        var withholdingValue = cif * (withholding/100)
        var costOfGood = afterSurtax + withholdingValue
        var unitSalesPrice = costOfGood + (costOfGood * markup/100)
        var totalPrice = unitSalesPrice * quantity

        this.calculatedValues['unit-price'+this.mainRows[index]] = unitSalesPrice
        this.calculatedValues['total-price'+this.mainRows[index]] = totalPrice


      }
    },
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
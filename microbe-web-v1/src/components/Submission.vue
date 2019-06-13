<template>
    <div class="submission">
      <div class="box">
        <h4>Please enter your data and information as prompted:</h4>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label><i class="must-icon"></i>Microorganism</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.microbe" v-bind:class="{'error':$v.form.microbe.$error&&!$v.form.microbe.required}" @blur="$v.form.microbe.$touch()">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label><i class="must-icon"></i>Diseaea name</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.disease" v-bind:class="{'error':$v.form.disease.$error&&!$v.form.disease.required}" @blur="$v.form.disease.$touch()">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label><i class="must-icon"></i>Variation tendency</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.tendency" v-bind:class="{'error':$v.form.tendency.$error&&!$v.form.tendency.required}" @blur="$v.form.tendency.$touch()">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label><i class="must-icon"></i>PMID</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.pmid" v-bind:class="{'error':$v.form.pmid.$error&&!$v.form.pmid.required}" @blur="$v.form.pmid.$touch()">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label>Microorganism type</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.type">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label>Position</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.position">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label>Phylogeny</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.phylogen">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label>Sample Name</label>
            </div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="form.sample">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-3">
              <label>Description</label>
            </div>
            <div class="col-md-9">
              <textarea class="form-control" rows="8" v-model="form.description"></textarea>
            </div>
          </div>
        </div>
        <div class="form-group my-btn-group">
          <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-9">
                <input type="button" class="submit-btn" value="Submit" @click="submit()" :disabled="this.$v.form.$invalid">
                <input type="button" class="reset-btn" value="Reset All" @click="resetAll()">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import API from './config/api.js';
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Submission',
  data(){
    return{
      form: {
        "microbe": "",
        "disease": "",
        "tendency": "",
        "pmid": "",
        "type": "",
        "position": "",
        "phylogen": "",
        "sample": "",
        "description": ""
      }
    }
  },
  validations: {
    form: {
        microbe: {
          required
        },
        disease: {
          required
        },
        tendency: {
          required
        },
        pmid: {
          required
        }
    }
  },
  methods:{
    submit(){
      this.$post(API.submissionSave, this.form).then((response)=>{
        if(response.status == 0){
          this.$alertify.success(response.status.message);
        }else{
          this.$alertify.error(response.status.message);
        }
      })
    },
    resetAll(){
      this.form ={
          "microbe": "",
          "disease": "",
          "tendency": "",
          "pmid": "",
          "type": "",
          "position": "",
          "phylogen": "",
          "sample": "",
          "description": ""
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .submission{
    height:-moz-calc(100vh - 56px);
    height:-webkit-calc(100vh - 56px);
    height:calc(100vh - 56px);
    overflow-x: auto;
    background: #f9f9f9;
    .box{
      width: 960px;
      margin:0 auto;
      padding:50px 0;
      .my-btn-group{
        margin-top:25px;
        .submit-btn{
          float:left;
          font-size: 20px;
          color: #FFFFFF;
          line-height: 24px;
          padding:8px;
          width: 48%;
          height:40px;
          background-image: linear-gradient(-96deg, #18BEB3 5%, #0A897C 99%);
          border-radius: 24px;
          border:0;
          margin-right:15px;
          outline: 0;
          cursor: pointer;
          &:hover{
            background: #0A897C;
          }
          &:disabled{
            background: #aaa;
          }
        }
        .reset-btn{
          float:right;
          font-size: 20px;
          color: #0A897C;
          line-height: 24px;
          padding:8px;
          width: 48%;
          height:40px;
          background: #FFFFFF;
          border: 1px solid #979797;
          border-radius: 24px;
          outline: 0;
          cursor: pointer;
        }
      }
    }
  }
</style>

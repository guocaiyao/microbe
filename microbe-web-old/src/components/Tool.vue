<template>
    <div class="tool">
      <div class="box">
        <ul class="tab">
          <li v-bind:class="{active:form.type=='Nucleotide'}" @click="tabFun('Nucleotide')">Nucleotide Sequence Similarity Search</li> 
          <li v-bind:class="{active:form.type=='Protein'}" @click="tabFun('Protein')">Protein Sequence Similarity Search</li>                   
        </ul>
        <div class="tab-content">
          <div class="sub-title">
            <p>This tool provides microbe virulence factor protein and antibiotic resistance protein databases.</p>
            <p>The emphasis of this tool is to find regions of sequence similarity, which will yield functional and evolutionary clues about the structure and function of your novel sequence.</p>
          </div>
          <div class="step-group">
            <h3><span class="green">STEP 1</span> - Select your database<span class="red">*</span></h3>
            <div class="sub-h3">Nucleotide DATABASES</div>
            <ul class="left-ul">              
              <li v-if="form.type=='Protein'">
                <div class="gray-bg">
                  <div class="cont">Virulence Factor Protein Database</div>
                  <div class="radio-group">
                    <input type="radio" value="virulenceFactorProteinDatabase" name="protein" id="virulenceProtein" v-model="form.database" v-on:change="clear('virulenceFactorProteinDatabase')">
                    <label for="virulenceProtein"></label>
                  </div>
                </div>
              </li>
              <li v-if="form.type=='Protein'">
                <div class="gray-bg">
                  <div class="cont">Antibiotic Resistance Protein Database</div>
                  <div class="radio-group">
                    <input type="radio" value="antibioticResistanceProteinDatabase" name="protein" id="antibioticProtein" v-model="form.database" v-on:change="clear('antibioticResistanceProteinDatabase')">
                    <label for="antibioticProtein"></label>
                  </div>
                </div>
              </li>
              <li v-if="form.type=='Nucleotide'">
                <div class="gray-bg">
                  <div class="cont">marcker gene database</div>
                  <div class="radio-group">
                    <input type="radio" value="markerGeneDatabase" name="nucleotide" id="marcker" v-model="form.database" v-on:change="clear('markerGeneDatabase')">
                    <label for="marcker"></label>
                  </div>
                </div>
              </li>
              <li v-if="form.type=='Nucleotide'">
                <div class="gray-bg">
                  <div class="cont">Virulence Factor Nucleotide Database</div>
                  <div class="radio-group">
                    <input type="radio" value="virulenceFactorNucleotideDatabase" name="nucleotide" id="virulenceNucleotide" v-model="form.database" v-on:change="clear('virulenceFactorNucleotideDatabase')">
                    <label for="virulenceNucleotide"></label>
                  </div>
                </div>
              </li>
              <li v-if="form.type=='Nucleotide'">
                <div class="gray-bg">
                  <div class="cont">Antibiotic Resistance Nucleotide Database</div>
                  <div class="radio-group">
                    <input type="radio" value="antibioticResistanceNucleotideDatabase" name="nucleotide" id="antibioticNucleotide" v-model="form.database" v-on:change="clear('antibioticResistanceNucleotideDatabase')">
                    <label for="antibioticNucleotide"></label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="step-group">
            <h3><span class="green">STEP 2</span>  - Enter your input sequence</h3>
            <div class="select-example-box">
              <div class="left-box">
                Enter or paste a sequence in any supported format:                           
              </div>
              <div class="right-box">                
                <a href="#" class="example-btn" @click.prevent="exampleInput()" :class="{'cancle-btn':isProtein || isNucleotide}">                  
                  <span v-if="isProtein || isNucleotide">Cancle</span>
                  <span v-else>Example input</span>
                </a>
              </div>
            </div>            
            <ul class="left-ul marginBottom" v-if="isProtein || isNucleotide">              
              <li v-if="isNucleotide">
                <div class="gray-bg">
                  <div class="cont">FASTQ</div>
                  <div class="radio-group">
                    <input type="radio" value="FASTQ" name="FASTQFASTA" id="FASTQ" v-model="form.sequence">
                    <label for="FASTQ"></label>
                  </div>
                </div>
              </li>
              <li v-if="isProtein || isNucleotide">
                <div class="gray-bg">
                  <div class="cont">FASTA</div>
                  <div class="radio-group">
                    <input type="radio" value="FASTA" name="FASTQFASTA" id="FASTA" v-model="form.sequence">
                    <label for="FASTA"></label>
                  </div>
                </div>
              </li>             
            </ul>
            <div class="textarea-box" v-else>
              <textarea rows="5" v-model="form.sequence" :disabled="form.uploadFile!=''"></textarea>
            </div>
            <div class="bottom-box">or upload a file : {{form.uploadFile}} <a href="#" class="green-btn cancle-btn margin-l" v-on:click.prevent="cancleFile()" v-if="form.uploadFile">Cancle</a><a href="#" class="green-btn margin-l" v-on:click.prevent="uploadFileFun()">Chose file</a></div>
          </div>
          <div class="step-group">
            <h3><span class="green">STEP 3</span>  - Set your parameters<span class="red">*</span></h3>
            <div class="select-example-box">
              <div class="left-box">
                PROGRAM
                <div class="select-group" v-if="form.type=='Protein'">
                  <select v-model="form.program">
                    <option value="" disabled>Please Select</option>
                    <option value="blastp" v-if="form.database == 'virulenceFactorProteinDatabase' || form.database == 'antibioticResistanceProteinDatabase'">blastp</option>
                    <option value="blastx" v-if="form.database == 'virulenceFactorProteinDatabase' || form.database == 'antibioticResistanceProteinDatabase'">blastx</option>
                  </select>
                  <i class="point-icon"></i>
                </div>
                <div class="select-group" v-if="form.type=='Nucleotide'">
                  <select v-model="form.program">
                    <option value="" disabled>Please Select</option>
                    <option value="metaphlan2" v-if="form.database == 'markerGeneDatabase'">metaphlan2</option>
                    <option value="blastn" v-if="form.database == 'virulenceFactorNucleotideDatabase' || form.database == 'antibioticResistanceNucleotideDatabase'">blastn</option>
                    <option value="tblastx" v-if="form.database == 'virulenceFactorNucleotideDatabase' || form.database == 'antibioticResistanceNucleotideDatabase'">tblastx</option>
                    <option value="tblastn" v-if="form.database == 'virulenceFactorNucleotideDatabase' || form.database == 'antibioticResistanceNucleotideDatabase'">tblastn</option>
                  </select>
                  <i class="point-icon"></i>
                </div>                
              </div>
            </div>
            <div class="content-box">
              The default settings will fulfill the needs of most users and, for that reason, are not visible. 
            </div>            
          </div>
          <div class="step-group">
            <h3><span class="green">STEP 4</span>  -  Submit your job</h3>
            <div class="clause-box">
                <div class="radio-group ms">
                  <input type="checkbox" value="1" name="clause" id="clause" v-model="notified">
                  <label for="clause"></label>
                </div>
                Be notified by email (Tick this box if you want to be notified by email when the results are available)
            </div>
            <ul class="email-title-box" v-if="notified">              
                <li><span>EMAIL:</span><input type="text" v-model="form.title"></li>
                <li><span>TITLE:</span><input type="text" v-model="form.email"></li>
                <li class="text-box">If available,the title will be included in the subject of the notification email and can be used as a way to identify your analysis.</li>
            </ul>
          </div>
          <div class="form-group">
            <input type="button" class="submit-btn" value="Submit" @click="submit()" :disabled="this.$v.form.$invalid">
          </div>
        </div> 
      </div>
      <div class="association-popup" v-if="isShowPopup" @click="closePopup()">
        <div class="box" @click.stop="openPopup()">
          <div class="scroll-box">
            <div class="content-box">
              <h2><span>Program:</span> {{form.program}}</h2>
              <div class="model-group" v-if="inputData">
                  <div class="title">Input Sequences<i :class="{'up':isInputSequences}" v-on:click="showCodeBox('inputSequences')"></i></div> 
                  <div class="code-box" :class="{'hide':!isInputSequences}">
                    <textarea rows="20" v-model="inputData" readonly></textarea>
                  </div>
              </div>
              <div class="model-group" v-if="microbeData">
                  <div class="title">Microbe Result<i :class="{'up':isMicrobeResult}" v-on:click="showCodeBox('microbeResult')"></i></div> 
                  <div class="code-box" :class="{'hide':!isMicrobeResult}">
                    <textarea rows="20" v-model="microbeData" readonly></textarea>
                  </div>
              </div>
              <div class="model-group" v-if="outputData">
                  <div class="title">Tool Output<i :class="{'up':isToolOutput}" v-on:click="showCodeBox('toolOutput')"></i></div> 
                  <div class="code-box" :class="{'hide':!isToolOutput}">
                    <textarea rows="20" v-model="outputData" readonly></textarea>
                  </div>
              </div>
            </div>
          </div>
          <a href="#" class="close-btn" @click.prevent="closePopup()"></a>
        </div>
      </div>         
    </div>    
</template>

<script>
import API from './config/api.js';
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Tool',
  data(){
    return{
      isShowPopup: false,
      notified: false,
      isProtein: false,
      isNucleotide: false,
      inputData: '',
      outputData: '',
      microbeData: '',
      form: {
        "database": "",
        "email": "",
        "program": "",
        "sequence": "",
        "title": "",
        "type": "Nucleotide",
        "uploadFile": ""
      },
      isToolOutput:true,
      isInputSequences: false,
      isMicrobeResult: false
    }  
  },
  validations: {
    form: {
        database: {
          required
        },
        program: {
          required
        }
    }
  },
  methods:{
    exampleInput(){
      if(this.form.uploadFile==''){
        this.form.sequence = '';
        if(this.form.type == 'Protein'){
          if(this.isProtein){
            this.isProtein = false;
          }else{
            this.isProtein = true;
          }
        }else{
          if(this.isNucleotide){
            this.isNucleotide = false;
          }else{
            this.isNucleotide = true;
          }
        }
      }
    },
    tabFun(name){
      this.form.type = name;
      this.form.database = "";
      this.form.email = "";
      this.form.program = "";
      this.form.sequence = "";
      this.form.title = "";
      this.form.uploadFile = "";
      this.notified = false;      
      if(this.form.type == 'Protein'){
        this.isNucleotide = false;
      }else{
        this.isProtein = false;
      }
    },
    clear(name){
      if(name == 'markerGeneDatabase'){
        if(this.form.program != 'metaphlan2'){
          this.form.program = '';
        }
      }else if(name == 'virulenceFactorNucleotideDatabase' || name == 'antibioticResistanceNucleotideDatabase'){
        if(this.form.program == 'metaphlan2'){
          this.form.program = '';
        }
      }
    },
    showCodeBox(name){
      if(name == 'toolOutput'){
        this.isToolOutput = !this.isToolOutput;
      }else if(name == 'inputSequences'){
        this.isInputSequences = !this.isInputSequences;
      }else if(name == 'microbeResult'){
        this.isMicrobeResult = !this.isMicrobeResult;
      }
    },
    submit(){        
      this.$store.commit('show');   
      this.$post(API.toolRun, this.form).then((response)=>{        
        if(response.status == 0){
          //this.$alertify.success(response.message);
          let self = this;
          let time = setInterval(function(){            
            self.$fetch(API.toolStatus + response.data).then((res)=>{
              if(res.status == 0){                
                if(res.data == 'FINISHED'){
                  clearInterval(time);
                  self.getData(response.data);                                   
                }
              }else{
                clearInterval(time);
                this.$store.commit('hide');
                self.$alertify.error(res.message);
              }
            });
          },3000)
        }else{
          this.$store.commit('hide');
          this.$alertify.error(response.message);
        }
      })
    },
    getData(id){
      this.$fetch(API.toolMicrobeResult + id).then((response1)=>{        
        if(response1.status == 0){
          this.microbeData = response1.data;
          this.$fetch(API.toolOutputResult + id).then((response2)=>{                    
            if(response2.status == 0){
              this.outputData = response2.data;
              this.$fetch(API.toolSequence + id).then((response3)=>{        
                if(response3.status == 0){
                  this.inputData = response3.data;
                  this.$store.commit('hide');
                  this.isShowPopup = true; 
                }else{
                  this.$store.commit('hide');
                  this.$alertify.error(response3.message);
                }
              });
            }else{
              this.$store.commit('hide');
              this.$alertify.error(response2.message);
            }
          });
        }else{
          this.$store.commit('hide');
          this.$alertify.error(response1.message);
        }
      });
    },
    openPopup(){

    },
    closePopup(){
      this.isShowPopup = false;
    },
    cancleFile(){
      this.form.uploadFile = '';
    },
    uploadFileFun:function(){
      let self = this;      
      this.$upload(function(res){  
        if(res.status == 0){
          self.form.sequence = '';
          self.form.uploadFile = res.data;          
        }else{          
          this.$alertify.error(res.message);
        }
      },API.uploadFile)      
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .tool{
    height:-moz-calc(100vh - 56px);	
    height:-webkit-calc(100vh - 56px);	
    height:calc(100vh - 56px);
    overflow-x: auto; 
    background: #f9f9f9;
    .red{
      color:red;
      padding-left:2px;
    }   
    .box{
      width: 96%;        
      min-width: 1080px;
      max-width: 1200px;
      margin:0 auto;
      padding:25px 0;
      .tab{
        overflow: hidden;
        width: 760px;
        margin:0 auto 10px auto;
        li{
          font-size: 20px;
          line-height: 24px;
          text-align: center;          
          cursor: pointer;
          border-right: 1px solid #757575;
          padding:0 15px;
          float:left;
          color:#757575;
          &:last-child{
            border:0;
          }
          &.active{
            color:#0A897C;
            font-weight: bold;
          }
        }
      }
      .email-title-box{
        margin-top:15px;
        li{
          margin-bottom: 10px;
          position: relative;
          padding-left:80px;
          span{
            width: 80px;
            display: block;
            position: absolute;
            left:0;
            top:0;
          }
          input{
            width: 50%;
            padding:0 5px;
          }
          &.text-box{
            padding:0;
          }
        }
      }
      .sub-title{
        margin-bottom:15px;
        p{
          font-size: 16px;
          line-height: 24px;
          margin: 0;
        }
      }
      .step-group{
        background: #ffffff;
        padding:15px 35px;
        border: 1px solid rgba(151,151,151,0.53);
        border-radius: 9px;
        margin-bottom:15px;
        h3{
          font-size: 20px;
          line-height: 24px;
          .green{
            color:#0A897C;
          }
        }
        .sub-h3{
          font-size: 14px;
          color:rgba(0,0,0,0.5);
          font-weight: bold;
          margin-bottom:10px;
        }
        .left-ul{
          overflow: hidden;  
          &.marginBottom{
            margin-bottom:15px;
          }       
          li{
            float:left;            
            width: 32%;
            margin-right:2%;
            &:last-child{
              margin-right:0;
            }
            .gray-bg{
              padding:12px 40px 12px 12px;
              background: #f5f5f5;
              position: relative;
              .cont{
                font-size: 16px;
                color: rgba(0,0,0,0.78);
                letter-spacing: 0;
                line-height: 24px;
                @media screen and (max-width: 1230px){
                  font-size: 14px;
                }
              }              
            }
            .radio-group{
              position: absolute;
              right:12px;
              top:12px;
            }
          }
        }
        .radio-group{
          width: 24px;
          height: 24px; 
          position: relative;
          &.ms{
            width: 18px;
            height: 18px;
            input[type='checkbox'],input[type='checkbox']+label{
              width: 18px;
              height: 18px;
            }
          }         
          input[type='checkbox']{
              width: 24px;
              height: 24px; 
              opacity: 0;
              margin: 0;
          }
          input[type='checkbox']+label{
              position:absolute;
              left:0;
              top:0;
              margin:0;
              display:block;				
              width:24px;
              height:24px;
              border:1px solid #0A897C;
              cursor: pointer;
              background: #ffffff;
          }
          input[type='checkbox']:checked+label{
            background: url('~@/assets/images/checked.png') no-repeat center center;
            background-size: 100%; 
          }
          input[type='radio']{
              width: 24px;
              height: 24px; 
              opacity: 0;
              margin: 0;
          }
          input[type='radio']+label{
              position:absolute;
              left:0;
              top:0;
              margin:0;
              display:block;				
              width:24px;
              height:24px;
              border:1px solid #0A897C;
              cursor: pointer;
              background: #ffffff;
          }
          input[type='radio']:checked+label{
            background: url('~@/assets/images/checked.png') no-repeat center center;
            background-size: 100%; 
          }
        }
        .select-example-box{
          width: 100%;
          height: 32px;
          margin-top:20px;
          margin-bottom:20px;
          .left-box{
            float:left;
            font-size: 16px;
            line-height: 32px;
            .protein-box{                
              padding-right:5px;
            }
            .select-group{
              display: inline-block;
              width: 320px;
              font-size: 16px;
              line-height: 32px;              
              border-bottom: 2px solid #0A897C;
              vertical-align: top;
              margin-left:16px;
              position: relative;
              margin-right:20px;
              select{
                height: 30px;
                width: 100%;
                border:0;
                border-radius: 0;
                outline:0;
                appearance:none;
                -moz-appearance:none;
                -webkit-appearance:none;
                position: relative;
                z-index: 9;
                background: none;
                &::-ms-expand{ 
                  display: none; 
                }
              }              
              .point-icon{
                display: block;
                width: 24px;
                height: 24px;
                background:#fff url('~@/assets/images/down.2.svg') no-repeat center center;
                position:absolute;
                right:0px;
                top:2px;
              }
            }
          }
          .right-box{
            float: left;
            font-size: 16px;
            line-height: 32px;
            .example-btn{
              min-width: 100px;
              padding:4px 18px;
              font-size: 16px;
              line-height: 24px;
              color:#fff;
              display: inline-block;
              vertical-align: top;
              background: #0A897C;
              border-radius: 20px;
              text-decoration: none;
              margin-left:10px;
              text-align: center;
              box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
              &:hover{
                background: #1a7c6e;
              }
              &.cancle-btn{
                padding:3px 18px;
                color: #0A897C;
                background: #fff;
                border: 1px solid #979797;
                &:hover{
                  background: #f9f9f9;
                }
              }             
            }
          }
        }
        .textarea-box{
          width: 100%; 
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 8px;                  
          textarea{
            width: 100%;
            padding:10px;
            font-size: 14px;
            line-height: 20px;
            background: #F9F9F9;
            border: 1px solid #D0D0D0;
            border-radius: 12px;
            outline: 0;
            &:disabled{
              background: #ddd;
            }
          }
        }
        .content-box{
          font-size: 16px;
          color: rgba(0,0,0,0.78);
          letter-spacing: 0;
          margin-bottom:15px;
        }
        .bottom-box{
          font-size: 16px;
          line-height: 32px;
          .green-btn{
            padding:4px 18px;
            font-size: 14px;
            line-height: 24px;
            color:#fff;
            display: inline-block;
            vertical-align: top;
            background: #0A897C;
            border-radius: 20px;
            text-decoration: none;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
            &:hover{
              background: #1a7c6e;
            }
            &.margin-l{
              margin-left: 10px;
            }
            &.margin-r{
              margin-right: 10px;
            }
            &.cancle-btn{
              padding:3px 18px;
              color: #0A897C;
              background: #fff;
              border: 1px solid #979797;
              &:hover{
                background: #f9f9f9;
              }
            }
          }
        }
      }
      .clause-box{
        font-size: 16px;
        line-height: 24px;
        padding-left:36px;
        position: relative;
        .radio-group{
          position: absolute;
          left:5px;
          top:4px;
        }
      }
      .form-group{
        margin-top:30px;
        text-align: center;
        .submit-btn{
          width: 320px;
          height: 48px;
          display: inline-block;
          background: #068D82;
          border-radius: 24px;
          font-size: 24px;
          line-height: 32px;
          padding:8px;
          color: #FFFFFF;
          text-align: center;
          border:0;
          outline: 0;
          cursor: pointer;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
          &:hover{
            background: #1a7c6e;
          }
          &:disabled{
            background: #aaa;
          }
        }
      }
    }
    .association-popup{
      width: 100%;
      height: 100vh;
      position: fixed; 
      background: rgba(0,0,0,0.2);     
      z-index: 999;
      top: 0;
      left: 0;
      padding:60px 0;
      .box{
        width: 80%;
        max-width: 1200px;
        height: 100%;
        margin:0 auto;
        background: #FFFFFF;
        border-radius: 12px;
        overflow:hidden;
        position: relative;
        .scroll-box{
          height: 100%;
          overflow-y:auto;
        }
        .close-btn{
          width: 24px;
          height: 24px;
          display: block;
          background: url('~@/assets/images/close.svg') no-repeat center center;
          background-size:100%;
          position: absolute;
          right:12px;
          top:10px;
        }        
        .content-box{
          padding:0 30px;
          h2{
            font-size: 20px;
            line-height: 24px;
            font-weight: bold;            
            padding:10px 0;
            margin-bottom:10px;
            span{
              color:#0A897C;
              padding-right: 5px;
            }
          }
          .model-group{            
            .title{
              font-size: 20px;
              line-height: 24px;
              font-weight: bold;
              color:#0A897C;
              padding:10px 0;
              border-bottom: 1px solid #0A897C;
              margin-bottom:20px;
              position:relative;
              i{
                width: 16px;
                height: 16px;                
                display: block;
                background: url('~@/assets/images/down.2.svg') no-repeat center center;
                background-size: 100%;
                position: absolute;
                right:5px;
                top:15px;
                cursor: pointer;
                &.up{
                  background: url('~@/assets/images/down.2.svg') no-repeat center center;
                  background-size: 100%;
                  transform:rotate(180deg);
                  -ms-transform:rotate(180deg); 	/* IE 9 */
                  -moz-transform:rotate(180deg); 	/* Firefox */
                  -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
                  -o-transform:rotate(180deg); 	/* Opera */
                }
              }
            }
            .code-box{
              textarea{
                width: 100%;
                padding:10px;
                font-size: 14px;
                line-height: 20px;
                background: #F9F9F9;
                border: 1px solid #D0D0D0;
                border-radius: 12px;
                outline: 0;
              }
            }
            .link-list{
              li{
                margin-bottom:18px;
                .name{
                  font-size: 16px;
                  line-height: 24px;
                  padding-left:10px;
                  margin-bottom:8px;
                }
                .link{
                  font-size: 16px;
                  line-height: 20px;
                  display: block;
                  color:#007C6F;
                  background: #E9F5F3;
                  padding:6px 10px;
                  text-decoration: none;
                  i{
                    width: 20px;
                    height: 20px;
                    background: url('~@/assets/images/download.png') no-repeat center center;
                    background-size:auto 100%;
                    margin-right: 10px;
                    vertical-align: top;
                    display: inline-block;
                  }
                }
              }
            }
          }
        }    
      }
    }
  }
</style>

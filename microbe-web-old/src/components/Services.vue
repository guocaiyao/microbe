<template>
    <div class="services">
      <div class="position-box">
        <div class="left-menu">
          <ul>
            <li><a href="#" :class="{active:activeTab=='Microbial'}" @click.prevent="showTab('Microbial')">Microbial search</a></li>
            <li><a href="#" :class="{active:activeTab=='Disease'}" @click.prevent="showTab('Disease')">Disease search</a></li>
          </ul>
        </div>
        <div class="right-content" v-if="activeTab=='Microbial'">
          <div class="box">
            <h2>{{activeTab}} search API</h2>
            <div class="decription">The API interface was invoked by the user in the programming language (python, Java, etc.), and the results were retrieved by providing the microbial name.</div>
            <div class="link">Example url: {{apiAssociationMicrobe}}?name=Acanthamoeba&amp;position=Other</div>
          </div>
          <div class="box">
            <h2>Optional parameters</h2>
            <ul>
              <li>name (String) — Microbe name to be searched.</li>
              <li>position (String) — This is the name of the body part.</li>
            </ul>
          </div>
          <div class="json-box">
            <div class="header">JSON <a href="#" class="my-icon" v-on:click.prevent="copyText('copyTextId1')"></a></div>
            <div class="content">
              <div class="content-box">
                <pre id="copyTextId1">
{
  "status": 0,
  "message": "Success",
  "data": {
    "associations": [
      {
        "id": 1055,
        "name": "MBP00001056",
        "score": 1.11135995388031,
        "tendency": "Increase",
        "position": "Other",
        "pmId": "NCIT_C118934",
        "pmUrl": "https://www.ncbi.nlm.nih.gov/pubmed/?term=NCIT_C118934",
        "microbeId": 5,
        "microbeName": "Acanthamoeba",
        "microbeType": "Bacteria",
        "diseaseId": 240,
        "diseaseName": "Cutaneous acanthamebiasis"
      },
      {
        "id": 2890,
        "name": "MBP00002891",
        "score": 1.11135995388031,
        "tendency": "Increase",
        "position": "Other",
        "pmId": "NCIT_C118934",
        "pmUrl": "https://www.ncbi.nlm.nih.gov/pubmed/?term=NCIT_C118934",
        "microbeId": 5,
        "microbeName": "Acanthamoeba",
        "microbeType": "Bacteria",
        "diseaseId": 4,
        "diseaseName": "Acanthamoeba keratitis"
      },
      {
        "id": 3479,
        "name": "MBP00003480",
        "score": 1.11135995388031,
        "tendency": "Increase",
        "position": "Other",
        "pmId": "NCIT_C118934",
        "pmUrl": "https://www.ncbi.nlm.nih.gov/pubmed/?term=NCIT_C118934",
        "microbeId": 5,
        "microbeName": "Acanthamoeba",
        "microbeType": "Bacteria",
        "diseaseId": 386,
        "diseaseName": "Granulomatous dermatitis"
      }
    ],
    "microbe": {
      "id": 5,
      "name": "Acanthamoeba",
      "type": "Bacteria",
      "scientificName": null,
      "taxId": null,
      "ncitId": null,
      "ncitUrl": null,
      "annotation": null,
      "phylogeny": null
    }
  }
}
                </pre>
              </div>
            </div>
          </div>
        </div> 
        <div class="right-content" v-if="activeTab=='Disease'">
          <div class="box">
            <h2>{{activeTab}} search API</h2>
            <div class="decription">The API interface was invoked by the user in the programming language (python, Java, etc.), and the results were retrieved by providing the microbial name.</div>
            <div class="link">Example url: {{apiAssociationDisease}}?name=Acute%20bacterial%20prostatitis&amp;microbeType=Fungus</div>
          </div>
          <div class="box">
            <h2>Optional parameters</h2>
            <ul>
              <li>name (String) — Disease names to be searched.</li>
              <li>microbeType (String) — It's the type of microorganism.</li>
            </ul>
          </div>
          <div class="json-box">
            <div class="header">JSON <a href="#" class="my-icon" v-on:click.prevent="copyText('copyTextId2')"></a></div>
            <div class="content">
              <div class="content-box">
                <pre id="copyTextId2">
{
  "status": 0,
  "message": "Success",
  "data": {
    "associations": [
      {
        "id": 2987,
        "name": "MBP00002988",
        "score": 2.0008699893951416,
        "tendency": "Increase",
        "position": "Urinary tract",
        "pmId": "29955859",
        "pmUrl": "https://www.ncbi.nlm.nih.gov/pubmed/?term=29955859",
        "microbeId": 578,
        "microbeName": "Coccidioides immitis",
        "microbeType": "Fungus",
        "diseaseId": 11,
        "diseaseName": "Acute bacterial prostatitis"
      },
      {
        "id": 874,
        "name": "MBP00000875",
        "score": 1.9216899871826172,
        "tendency": "Increase",
        "position": "Urinary tract",
        "pmId": "29955859",
        "pmUrl": "https://www.ncbi.nlm.nih.gov/pubmed/?term=29955859",
        "microbeId": 981,
        "microbeName": "Histoplasma capsulatum",
        "microbeType": "Fungus",
        "diseaseId": 11,
        "diseaseName": "Acute bacterial prostatitis"
      },
      {
        "id": 559,
        "name": "MBP00000559",
        "score": 1.9216899871826172,
        "tendency": "Increase",
        "position": "Urinary tract",
        "pmId": "29955859",
        "pmUrl": "https://www.ncbi.nlm.nih.gov/pubmed/?term=29955859",
        "microbeId": 310,
        "microbeName": "Blastomyces dermatitidis",
        "microbeType": "Fungus",
        "diseaseId": 11,
        "diseaseName": "Acute bacterial prostatitis"
      }
    ],
    "disease": {
      "id": 11,
      "name": "Acute bacterial prostatitis",
      "scientificName": "Prostatitis",
      "efoId": "EFO_0003830",
      "efoUrl": "https://www.ebi.ac.uk/ols/ontologies/efo/terms?iri=http%3A%2F%2Fwww.ebi.ac.uk%2Fefo%2FEFO_0003830",
      "annotation": "Infiltration of inflammatory cells into the parenchyma of PROSTATE. The subtypes are classified by their varied laboratory analysis, clinical presentation and response to treatment."
    }
  }
}
                </pre>
              </div>
            </div>
          </div>
        </div> 
      </div>       
    </div>
</template>

<script>
import API from './config/api.js';
export default {
  name: 'browser',
  data(){
    return{
      activeTab:'',
      apiAssociationMicrobe: API.associationMicrobe,
      apiAssociationDisease: API.associationDisease
    }
  },
  created(){    
      this.activeTab = 'Microbial'; 
  },
  methods:{
    showTab(name){
      this.activeTab = name;
    },
    //复制文本
    copyText:function(id){      
        const range = document.createRange();
        range.selectNode(document.getElementById(id)); 
        const selection = window.getSelection();
        if(selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');        
        this.$alertify.success('Copy to Clipboard'); 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .services{
    width: 100%;
    height:-moz-calc(100vh - 56px);	
	  height:-webkit-calc(100vh - 56px);	
	  height:calc(100vh - 56px);     
    margin:0 auto;
    background:#fff;
    .position-box{
      max-width: 1200px;
      margin:0 auto;      
      position:relative;
    }      
    .left-menu{
      padding:26px 0;
      width:220px;      
      height:446px;
      background: #F9F9F9;
      position:absolute;
      left:30px;
      top:30px;
      li{
        a{
          font-size:16px;
          color:#222;
          line-height:20px;
          padding:15px;
          display:block;
          position:relative;
          text-align: center;
          &:hover,&.active{
            background: #E9F5F3;
            text-decoration:none;
            color: #0A897C;
          }
          &.active{
            font-weight: bold;
          }
        }
      }
    }    
    .right-content{
      width:100%;
      height:100%;
      padding:30px 30px 30px 290px;
      background:#fff; 
      overflow:auto;
      .box{
        margin-bottom:30px;
        h2{
          font-size:24px;
          line-height:32px;
          margin-bottom:15px;      
        }
        .decription{
          font-size:16px;
          line-height:24px;
          padding-left:25px;
          margin-bottom:15px;
        }
        .link{
          font-size:20px;
          line-height:28px;
          color: #0A897C;
          padding:6px 25px;
          background: #E9F5F3;
          border-radius: 4px;
        }
        ul{
          padding-left:35px;
          li{
            font-size:16px;
            line-height:24px;
            list-style:disc;
            margin-bottom:5px;
            a{
              color:#0A897C;
            }
          }
        }
      }
      .json-box{
        .header{
          font-size:16px;
          line-height:24px;
          color:#0A897C;
          padding:10px 30px;
          background:#F9F9F9;
          border: 1px solid #979797;
          border-radius: 2px 2px 0px 0px;
          position:relative;
          overflow:hidden;
          .my-icon{
            width:65px;
            height:34px;
            display:block;
            background: url('~@/assets/images/icon.png') no-repeat center center;
            position:absolute;
            top:0;
            right:0;
          }
        }
        .content{
          padding:10px;
          border: 1px solid #979797;
          border-top:0;
          border-radius: 0px 0px 2px 2px;
          .content-box{ 
            padding:20px 30px;
            background:#F9F9F9;            
            pre{
              font-size:16px;
              color:#0A897C;
              margin-bottom:0;
            }
          }
        }
      }     
    }
  }
</style>

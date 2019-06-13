<template>
    <div class="documents">
      <div class="article-box">
        <div class="box">
          <h2>
              MicroPhenDB Introduction:<br>
              What is MicroPhenDB?
          </h2> 
          <div class="content">
            <h3>Introduction:</h3>
            <p>The MicroPheno website gives an overview of microbiome composition changes and core gene function transformation in different types of diseases. On this help page, we will help you navigate through the database content.</p>
            
            <h3>What can users do in microPheno ?</h3>
            <p>Microbe search: Microbe-based search for prioritizing and interpreting disease phenotype due to microbe dysregulations.</p>
            <p>Disease search: Disease-based search for prioritizing and interpreting disease phenotype due to microbe dysregulations.</p>
            <p>Web services: RESTful application programming interfaces (APIs) for data and tool access.</p>
            <p>Download: All relevant data can be freely downloaded from this website.</p>
            <p>Submission: Submitting novel microbe-disease associations for the future data integration.</p>

            <h3>Reverse retrieval introduction</h3>
            <p>The reverse search of microbial genome was based on blast and bowtie comparison algorithm to identify the species of host pathogenic microorganisms, microbial pathogenic genes and drug resistance genes. The composition of microbial species in the metagenome data sequenced by shotgun method was determined by MetaPhlAn tool. combined with the database of phenotypes of MicropheDB diseases and pathogenic microorganisms, the species of pathogenic microorganisms related to host diseases in the samples were determined. In addition, reverse retrieval provides sequence data of microbial pathogenic factors and drug resistance genes for users to upload local data for gene and protein sequence alignment.</p>
            
            <h3>Statistics:</h3>
            <p>microPheDB provides 5331 non-redundant microbe-disease associations between 1774 microorganism species and 500 disease phenotypes.</p>
            <p>431 disease provides disease annotation information of Experimental Factor Ontology.</p>
            <p>582 microorganisms provides species annotation information of NCI Thesaurus OBO Edition.</p>
            <p>700 microorganisms provides core genes information、gene sequences and gene functional annotations.</p>
          </div>
        </div>
      </div>
      <div class="tab-download"> 
        <div class="box">
          <h2>MicroPhenDB data download</h2>
          <ul>
            <li>
              <a :href="downloadUrl+'/core_table.txt'">
                <i class="data"></i>
                <span>Association of microbe and disease.txt</span>
              </a>
            </li>
            <li>
              <a :href="downloadUrl+'/EFO.txt'">
                <i class="bacteria"></i>
                <span>Disease-annotation.txt</span>
              </a>
            </li>
            <li>
              <a :href="downloadUrl+'/NCIT.txt'">
                <i class="disease"></i>
                <span>Microbe-annotation.txt</span>
              </a>
            </li>
            <li>
              <a :href="downloadUrl+'/GeneID.txt'">
                <i class="gene"></i>
                <span>Core-taxid.txt</span>
              </a>
            </li>
          </ul>
        </div>
      </div>             
    </div>
</template>

<script>
import API from './config/api.js';
export default {
  name: 'Documents',
  data(){
    return{
      downloadUrl:''
    }
  },
  created(){    
      this.downloadUrl = API.downloadUrl2;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .documents{
    height:-moz-calc(100vh - 56px);	
    height:-webkit-calc(100vh - 56px);	
    height:calc(100vh - 56px);
    overflow-x: auto; 
    .article-box{
      background: #ffffff;
      .box{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding:40px 20px;
        h2{
          font-size: 24px;
          color:#222222;
          line-height: 28px;
          text-align: center;
          margin-bottom: 35px;
        }
        .content{          
          h3{
            font-size: 20px;          
            line-height: 24px;
            color:#333;
            margin-top:20px;
          }
          p{
            font-size: 18px;          
            line-height: 24px;
            color:rgba(0,0,0,0.54);
            margin:0;            
          }
        }  
      }    
    }
    .tab-download{
      padding:40px 20px;
      background: #f9f9f9;
      .box{
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
        h2{
          font-size: 24px;
          color:#222222;
          text-align: center;
          margin-bottom:30px;
        }
        ul{
          margin:0 -20px;         
          padding:0;
          overflow: hidden;
          li{
            width: 25%;
            list-style: none;
            float:left;
            padding:20px;
            a{
              width: 100%;
              height:225px;
              background: #fff;
              box-shadow: 0 7px 28px 0 rgba(0,0,0,0.10);
              border-radius: 16px;
              display: block;
              padding:25px 0;
              &:hover{                
                box-shadow: 0 7px 25px 0 rgba(0,0,0,0.2);
                text-decoration: none;
                i{
                  width: 120px;
                  height: 120px;
                  margin-bottom: 15px;
                }
              }
              i{
                width: 115px;
                height: 115px;
                display: block;
                margin:0 auto;
                margin-bottom: 20px;
                &.data{
                  background: url('~@/assets/images/data.svg') no-repeat center center;
                  background-size: 100%;
                }
                &.bacteria{
                  background: url('~@/assets/images/bacteria.svg') no-repeat center center;
                  background-size: 100%;
                }
                &.disease{
                  background: url('~@/assets/images/disease.svg') no-repeat center center;
                  background-size: 100%;
                }
                &.gene{
                  background: url('~@/assets/images/gene.svg') no-repeat center center;
                  background-size: 100%;
                }
              }
              span{
                width: 80%;
                margin:0 auto;
                display: block;
                font-size: 16px;
                color: #0A897C;
                text-align: center;
                line-height: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>

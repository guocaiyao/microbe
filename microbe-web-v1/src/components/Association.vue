<template>
    <div class="association" :class="{noLeftMenu:isleft==0}">
        <div class="left-box">
          <ul>
            <li><a class="association-a" href="#" @click.prevent="clickScroll('Microbe','Microbe',0)" :class="{active:activeName == 'Microbe'}">Microbe</a></li>
            <li><a class="association-a" href="#" @click.prevent="clickScroll('Disease','Disease',0)" :class="{active:activeName == 'Disease'}">Disease</a></li>
            <li><a class="association-a" href="#" @click.prevent="clickScroll('Association','Association',0)" :class="{active:activeName == 'Association'}">Association</a></li>
            <li>
              <a class="association-a none-hover" href="javascript:;">Function</a>
              <ul class="association-menu">
                  <li><a href="#" @click.prevent="clickScroll('Function','VirulenceFactor',0)" :class="{active:activeName == 'VirulenceFactor'}">Virulence factor</a></li>
                  <li><a href="#" @click.prevent="clickScroll('Function','AntibioticResistance',0)" :class="{active:activeName == 'AntibioticResistance'}">Antibiotic resistance</a></li>
                  <li>
                    <a href="#" @click.prevent="clickScroll('Function','CoreGene',0)" :class="{active:activeName == 'CoreGene'}">Core Gene</a>
                    <ul class="association-menu sub-menu">
                      <li v-for="(item,index) in data.coreGeneData" v-bind:key="index"><a href="#" :class="{subActive:subActiveNum == (index+1)}" @click.prevent="clickScroll('Function','CoreGene',index+1)">{{item.geneId}}</a></li>
                    </ul>
                  </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="right-box">
          <div class="box" id="scrollId" v-if="!isLoading">
              <div class="model-group" id="Microbe">
                <div class="title">Microbe</div>
                <ul class="content" v-if="Object.keys(data.microbeData).length!=0">
                  <li v-if="data.microbeData.name"><span class="left-title">Organism</span>{{data.microbeData.name}}</li>
                  <li v-if="data.microbeData.type"><span class="left-title">Type</span>{{data.microbeData.type}}</li>
                  <li v-if="data.microbeData.ncitId"><span class="left-title">NCIT ID</span><a :href="data.microbeData.ncitUrl" target="_blank" class="green-a">{{data.microbeData.ncitId}}<i></i></a></li>
                  <li v-if="data.microbeData.taxId"><span class="left-title">Taxid</span>{{data.microbeData.taxId}}</li>
                  <li v-if="data.microbeData.phylogeny"><span class="left-title">Phylogenic tree</span>{{data.microbeData.phylogeny}}</li>
                  <li v-if="data.microbeData.annotation"><span class="left-title">Annotation</span>{{data.microbeData.annotation}}</li>
                </ul>
                <div class="no-data" v-else>
                  No Data
                </div>
              </div>
              <div class="model-group" id="Disease">
                <div class="title">Disease</div>
                <ul class="content" v-if="Object.keys(data.diseaseData).length!=0">
                  <li v-if="data.diseaseData.name"><span class="left-title">Disease</span>{{data.diseaseData.name}}</li>
                  <li v-if="data.diseaseData.efoId"><span class="left-title">EFO ID</span><a :href="data.diseaseData.efoUrl" target="_blank" class="green-a">{{data.diseaseData.efoId}}<i></i></a></li>
                  <li v-if="data.diseaseData.annotation"><span class="left-title">Annotation</span>{{data.diseaseData.annotation}}</li>
                </ul>
                <div class="no-data" v-else>
                  No Data
                </div>
              </div>
              <div class="model-group" id="Association">
                <div class="title">Association</div>
                <ul class="content" v-if="Object.keys(data.associationData).length!=0">
                  <li v-if="data.associationData.name"><span class="left-title">Association ID</span>{{data.associationData.name}}</li>
                  <li v-if="data.associationData.diseaseName"><span class="left-title">Disease</span>{{data.associationData.diseaseName}}</li>
                  <li v-if="data.associationData.microbeName"><span class="left-title">Organism</span>{{data.associationData.microbeName}}</li>
                  <li v-if="data.associationData.tendency"><span class="left-title">Tendency</span>{{data.associationData.tendency}}</li>
                  <li v-if="data.associationData.score"><span class="left-title">Score</span>{{data.associationData.score}}</li>
                  <li v-if="data.associationData.microbeType"><span class="left-title">Microbe type</span>{{data.associationData.microbeType}}</li>
                  <li v-if="data.associationData.position"><span class="left-title">Body Site</span>{{data.associationData.position}}</li>
                  <li v-if="data.pubmed&&data.pubmed.length>0"><span class="left-title">Evidences</span>
                      <ul>
                        <li v-for="(item,index) in data.pubmed" v-bind:key="index">
                          <span>{{index+1}}</span><a :href="item.link" target="_blank" class="green-a">{{item.number}}<i></i></a>
                        </li>
                      </ul>
                  </li>
                </ul>
                <div class="no-data" v-else>
                  No Data
                </div>
              </div>
              <div class="model-group" id="Function">
                <div class="title">Function <a :href="downloadUrl + '?microbeName='+data.microbeData.name" class="download-btn" v-if="tabName == 'CoreGene'&&data.coreGeneData.length!=0">Download Table</a></div>
                <ul class="tab-group">
                    <li id="VirulenceFactor" :class="{active:tabName == 'VirulenceFactor'}" @click="tabFunc('VirulenceFactor')">Virulence factor</li>
                    <li id="AntibioticResistance" :class="{active:tabName == 'AntibioticResistance'}" @click="tabFunc('AntibioticResistance')">Antibiotic resistance</li>
                    <li id="CoreGene" :class="{active:tabName == 'CoreGene'}" @click="tabFunc('CoreGene')">Core Gene</li>
                </ul>
                <div v-if="tabName == 'VirulenceFactor'">
                  <ul class="tab-result-group content" v-if="Object.keys(data.virulenceFactorData).length!=0">
                    <li v-if="data.microbeData.name"><span class="left-title">Microbe</span>{{data.microbeData.name}}</li>
                    <li v-if="data.virulenceFactorData.vfName"><span class="left-title">VF name</span>{{data.virulenceFactorData.vfName}}</li>
                    <li v-if="data.virulenceFactorData.function"><span class="left-title">Function</span>{{data.virulenceFactorData.function}}</li>
                    <li v-if="data.virulenceFactorData.characteristics"><span class="left-title">Characteristics</span>{{data.virulenceFactorData.characteristics}}</li>
                    <li v-if="data.virulenceFactorData.structure"><span class="left-title">Structure</span>{{data.virulenceFactorData.structure}}</li>
                    <li class="my-word-wrap" v-if="data.virulenceFactorData.dnaSeq"><span class="left-title">DNA sequence</span>
                      <div class="copy-box">
                        <a href="#" class="my-icon" v-on:click.prevent="copyText('copyTextId1')"></a>
                        <div class="copy-content" id="copyTextId1">{{data.virulenceFactorData.dnaSeq}}</div>
                      </div>
                    </li>
                    <li class="my-word-wrap" v-if="data.virulenceFactorData.proSeq"><span class="left-title">Protein sequence</span>
                      <div class="copy-box">
                        <a href="#" class="my-icon" v-on:click.prevent="copyText('copyTextId2')"></a>
                        <div class="copy-content" id="copyTextId2">{{data.virulenceFactorData.proSeq}}</div>
                      </div>
                    </li>
                  </ul>
                  <div class="no-data" v-else>
                    No Data
                  </div>
                </div>
                <div v-if="tabName == 'AntibioticResistance'">
                  <ul class="tab-result-group content" v-if="Object.keys(data.antibioticResistanceData).length!=0">
                    <li v-if="data.microbeData.name"><span class="left-title">Microbe</span>{{data.microbeData.name}}</li>
                    <li v-if="data.antibioticResistanceData.aroId"><span class="left-title">Antibiotic Resistance ID</span>{{data.antibioticResistanceData.aroId}}</li>
                    <li v-if="data.antibioticResistanceData.aroName"><span class="left-title">Antibiotic Resistance Name</span>{{data.antibioticResistanceData.aroName}}</li>
                    <li v-if="data.antibioticResistanceData.proteinId"><span class="left-title">Protein ID</span>{{data.antibioticResistanceData.proteinId}}</li>
                    <li v-if="data.antibioticResistanceData.dnaId"><span class="left-title">DNA ID</span>{{data.antibioticResistanceData.dnaId}}</li>
                    <li v-if="data.antibioticResistanceData.drugClass"><span class="left-title">Drug class</span>{{data.antibioticResistanceData.drugClass}}</li>
                    <li v-if="data.antibioticResistanceData.resistance"><span class="left-title">Resistance</span>{{data.antibioticResistanceData.resistance}}</li>
                    <li class="my-word-wrap" v-if="data.antibioticResistanceData.dnaSeq"><span class="left-title">DNA sequence</span>
                      <div class="copy-box">
                        <a href="#" class="my-icon" v-on:click.prevent="copyText('copyTextId3')"></a>
                        <div class="copy-content" id="copyTextId3">{{data.antibioticResistanceData.dnaSeq}}</div>
                      </div>
                    </li>
                    <li class="my-word-wrap" v-if="data.antibioticResistanceData.proteinSeq"><span class="left-title">Protein sequence</span>
                      <div class="copy-box">
                        <a href="#" class="my-icon" v-on:click.prevent="copyText('copyTextId4')"></a>
                        <div class="copy-content" id="copyTextId4">{{data.antibioticResistanceData.proteinSeq}}</div>
                      </div>
                    </li>
                  </ul>
                  <div class="no-data" v-else>
                    No Data
                  </div>
                </div>
                <div v-if="tabName == 'CoreGene'">
                  <div class="content-link-group" id="CoreGene-sub-menu" v-if="data.coreGeneData.length!=0">
                    <ul class="tab-result-group content" v-for="(item,index) in data.coreGeneData" v-bind:key="index">
                      <li class="serial-number">{{index+1}}</li>
                      <li class="my-word-wrap" v-if="item.geneId"><span class="left-title">Gene ID</span>{{item.geneId}}</li>
                      <li v-if="item.signatureAccession"><span class="left-title">Signature Accession</span>{{item.signatureAccession}}</li>
                      <li v-if="item.signatureDescription"><span class="left-title">Signature Description</span>{{item.signatureDescription}}</li>
                      <li v-if="item.go"><span class="left-title">GO</span>{{item.go}}</li>
                      <li class="my-word-wrap" v-if="item.pathways"><span class="left-title">Pathways</span>{{item.pathways}}</li>
                    </ul>
                  </div>
                  <div class="no-data" v-else>
                    No Data
                  </div>
                </div>
              </div>
          </div>
          <div class="box loading" v-else>Loading...</div>
        </div>
    </div>
</template>

<script>
import API from './config/api.js';
export default {
  name: 'Association',
  data(){
    return{
      heightAtrr:[],
      subHeightAtrr:[],
      activeName:'Microbe',
      tabName: 'VirulenceFactor',
      subActiveNum:0,
      data:{
        microbeData: {},
        diseaseData: {},
        associationData: {},
        virulenceFactorData: {},
        antibioticResistanceData: {},
        coreGeneData: {},
        pubmed: []
      },
      isLoading: true,
      downloadUrl: API.geneDownload
    }
  },
  props:['associationId','isleft'],
  created(){
    this.getData();
  },
  mounted(){
    let self = this;
    $('#scrollId .model-group').each(function(){
      self.heightAtrr.push({
        name: $(this).attr('id'),
        height: $(this).height()
      })
    })
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods:{
    getData(){
      this.$fetch(API.association, {name: this.associationId}).then((response)=>{
        this.isLoading = false;
        if(response.status == 0){
          this.data.microbeData = response.data.microbe==null?{}:response.data.microbe;

          this.data.diseaseData = response.data.disease==null?{}:response.data.disease;
          this.data.associationData = response.data.association==null?{}:response.data.association;
          this.data.virulenceFactorData = response.data.vfdb==null?{}:response.data.vfdb;
          this.data.antibioticResistanceData = response.data.card==null?{}:response.data.card;
          this.data.coreGeneData = response.data.geneAnnotations==null?[]:response.data.geneAnnotations;
          this.data.pubmed = response.data.pubmed==null?[]:response.data.pubmed;
        }
        let self = this;
        setTimeout(function(){
          $('#scrollId .model-group').each(function(){
            self.heightAtrr.push({
              name: $(this).attr('id'),
              height: $(this).height()
            })
          })
        },100);
      });
    },
    tabFunc(name){
      this.activeName = name;
      this.tabName = name;
      let self = this;
      $('#scrollId .model-group').each(function(){
        self.heightAtrr.push({
          name: $(this).attr('id'),
          height: $(this).height()
        })
      })
    },
    clickScroll(id,name,num){
      let self = this;
      window.removeEventListener('scroll', this.handleScroll,true);
      this.activeName = name;
      if(id == "Function"){
        this.tabName = name;
      }
      if(name == 'CoreGene'){
        this.subActiveNum = num;
        setTimeout(function(){
          $('#CoreGene-sub-menu .tab-result-group').each(function(){
            self.subHeightAtrr.push($(this).height()+15)
          }),100})
      }else{
        this.subActiveNum = 0;
      }
      let subHeight = 0;
      if(num){
        for(let i=0;i<this.subHeightAtrr.length;i++){
          if(i+1<=num){
            subHeight += this.subHeightAtrr[i];
          }
        }
      }
      let scrollHeight = 0;
      for(let i=0;i<this.heightAtrr.length;i++){
        if(this.heightAtrr[i].name == id){
          break;
        }else{
          scrollHeight += this.heightAtrr[i].height - 50;
        }
      }
      $('#scrollId').animate({scrollTop:scrollHeight+subHeight}, 500,function(){
        window.addEventListener('scroll', self.handleScroll, true);
      });
    },
    //顶部滚动效果
    handleScroll:function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.getElementById('scrollId'); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      let height = 0;
      for(let i=0;i<this.heightAtrr.length;i++){
        if(this.heightAtrr[i].name == 'Function'){
          height = height - this.heightAtrr[i-1].height + 50;
          break;
        }else{
          height += this.heightAtrr[i].height;
        }
      }
      if(scrollTop>=height || $('#scrollId').height()+scrollTop+50>=scrollObj.scrollHeight){
        this.activeName = this.tabName;
      }else{
        for(let i=0;i<this.heightAtrr.length;i++){
          if(scrollTop<75){
            this.activeName = this.heightAtrr[i].name;
            break;
          }else{
            scrollTop -= this.heightAtrr[i].height;
          }
        }
      }
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
  },
  watch:{
    associationId(val){
      // 这样重新赋值后，就得到了父组件动态改变的数据
      this.getData();
    }
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll,true);   //  离开页面清除（移除）滚轮滚动事件
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .association{
    width: 100%;
    height: 100%;
    position: relative;
    &.noLeftMenu{
      .left-box{
        display: none;
      }
      .right-box{
        padding-left:0;
        .box{
          padding-right:0;
        }
      }
    }
    .left-box{
      width: 260px;
      height: 100%;
      background: #F0F0F0;
      position: absolute;
      left:0;
      top:0;
      padding-top:40px;
      overflow-y: auto;
      /*滚动条样式*/
      &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          background: rgba(0,0,0,0.5);
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: rgba(0,0,0,0.1);
      }
      &>ul{
        &>li{
          .association-a{
            font-size: 16px;
            line-height: 24px;
            color:#222;
            padding:15px 10px 15px 40px;
            display: block;
            text-decoration: none;
            &:not(.none-hover):hover,&.active{
              color:#0A897C;
              background: #ffffff;
              border-right: 4px solid #0A897C;
            }
          }
          .association-menu{
            li{
              a{
                font-size: 14px;
                line-height: 24px;
                color:#757575;
                padding:15px 10px 15px 60px;
                display: block;
                text-decoration: none;
                &:hover,&.active{
                  color:#0A897C;
                  background: #ffffff;
                  border-right: 4px solid #0A897C;
                }
              }
            }
            &.sub-menu{
              padding-bottom: 20px;
              li{
                a{
                  font-size: 12px;
                  padding:8px 10px 8px 80px;
                  line-height: 18px;
                  word-wrap: break-word;
                  word-break: normal;
                  &:hover,&.subActive{
                    color:#0A897C;
                    font-weight: bold;
                    background: none;
                    border-right: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
    .right-box{
      width: 100%;
      height: 100%;
      padding-left:300px;
      padding-top:40px;
      .loading{
        text-align: center;
        padding-top:80px;
      }
      .box{
        height: 100%;
        padding-right:20px;
        padding-bottom: 50px;
        overflow-y: auto;
        /*滚动条样式*/
        &::-webkit-scrollbar {/*滚动条整体样式*/
            width: 16px;     /*高宽分别对应横竖滚动条的尺寸*/
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 0;
            background: #e6e6e6;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
            border-radius: 0;
            background: #fff;
        }
        .model-group{
          margin-bottom: 20px;
          .title{
            font-size: 20px;
            line-height: 24px;
            font-weight: bold;
            color:#0A897C;
            padding:10px 0;
            border-bottom: 1px solid #0A897C;
            margin-bottom:20px;
            position:relative;
            .download-btn{
              display:block;
              font-size:18px;
              color:#fff;
              line-height:20px;
              padding:6px 20px;
              background-image: linear-gradient(-96deg, #18BEB3 5%, #0A897C 99%);
              border-radius: 24px;
              position:absolute;
              top:7px;
              right:5px;
            }
          }
          .tab-group{
            overflow: hidden;
            margin-bottom:20px;
            li{
              width: 33.333%;
              min-height: 24px;
              float:left;
              font-size: 20px;
              line-height: 24px;
              padding:10px;
              text-align: center;
              background: #F9F9F9;
              cursor: pointer;
              &.active{
                color:#007C6F;
                background: #E9F5F3;
              }
            }
          }
          .no-data{
            font-size: 16px;
            line-height: 24px;
          }
          .content-link-group{
            .tab-result-group{
              border-bottom: 1px solid #ddd;
              padding-bottom:10px;
              padding-top:15px;
              position: relative;
              &:last-child{
                border-bottom: 0;
              }
              &:first-child{
                padding-top: 0;
              }
              .serial-number{
                width: 32px;
                height: 32px;
                font-size: 24px;
                padding:0;
                color:#007C6F;
                line-height: 32px;
                position: absolute;
                left:0;
                top:50%;
                margin-top:-24px;
                margin-bottom: 0;
                text-align: center;
              }
            }
          }
          .content{
            padding-right:15px;
            &>li{
              padding-left:250px;
              width: 100%;
              font-size: 16px;
              line-height: 24px;
              margin-bottom: 6px;
              position: relative;
              &.my-word-wrap{
                word-wrap: break-word;
                word-break: normal;
              }
              .copy-box{
                 border: 1px solid #979797;
                 padding: 2px;
                 position: relative;
                 .my-icon{
                  width:65px;
                  height:34px;
                  display:block;
                  background: url('~@/assets/images/icon.png') no-repeat center center;
                  position:absolute;
                  top:0;
                  right:0;
                  opacity: 0.8;
                  &:hover{
                    opacity: 1;
                  }
                }
                .copy-content{
                  background: #F9F9F9;
                  font-size: 16px;
                  color: #0A897C;
                  padding:10px;
                }
              }
              .left-title{
                width: 250px;
                color:#757575;
                position: absolute;
                left:0;
                top:0;
                padding-right:45px;
                text-align: right;
              }
              ul{
                li{
                  span{
                    color:#0A897C;
                    margin-right:20px;
                    font-weight:bold;
                  }
                  font-size: 16px;
                  line-height: 24px;
                  margin-bottom:2px;
                }
              }
              .green-a{
                display: inline-block;
                font-size:16px;
                line-height:24px;
                color:#0A897C;
                background: #EAF4F3;
                padding:2px 10px 2px 20px;
                text-decoration:none;
                i{
                  width:24px;
                  height:24px;
                  display:inline-block;
                  background: url('~@/assets/images/network.png') no-repeat center 3px;
                  background-size: 80%;
                  vertical-align:top;
                  margin-left:30px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>

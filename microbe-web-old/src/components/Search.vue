<template>
    <div class="search" id="search">
        <div class="search-header">
          <div class="box">
            <ul class="tab-a nav nav-tab">
              <li><a href="javascript:;" v-bind:class="{'active':searchType=='microbe'}" @click="setSearchType('microbe')">Microbe</a></li>
              <li><a href="javascript:;" v-bind:class="{'active':searchType=='disease'}" @click="setSearchType('disease')">Disease</a></li>
              <li><a href="javascript:;" v-bind:class="{'active':searchType=='association'}" @click="setSearchType('association')">Association</a></li>              
            </ul>
            <ul class="tab-content">
              <li class="tab-pane active">
                <div class="search-box">
                  <!-- 微生物搜索 -->
                  <div class="search-input-btn" v-if="searchType=='microbe'">
                    <div class="search-input">
                      <div class="search-input-left">
                        <input type="text" placeholder="Input a Microbe" v-model="microbeSearchData.name" @input="toGetSuggestion(microbeSearchData.name)" @blur="closeSelect()">
                        <ul class="suggestion-box" v-if="isShowSuggestion && suggestionData.length>0">
                          <li v-for="(item,index) in suggestionData" v-bind:key="index"><a href="#" @click.prevent="selectValue(item)">{{item}}</a></li>
                        </ul>
                      </div>
                      <div class="search-input-right">
                        <select v-model="microbeSearchData.position" id="positionId">
                          <option value="">All position</option>
                          <option value="Abdominal cavity">Abdominal cavity</option>
                          <option value="Auditory meatus">Auditory meatus</option>
                          <option value="Biofilm">Biofilm</option>
                          <option value="Bloodstream">Bloodstream</option>
                          <option value="Breast">Breast</option>
                          <option value="Central nervous system">Central nervous system</option>
                          <option value="Cervix">Cervix</option>
                          <option value="Eye">Eye</option>
                          <option value="Foot">Foot</option>
                          <option value="Gallbladder">Gallbladder</option>
                          <option value="Gastrointestinal tract">Gastrointestinal tract</option>
                          <option value="Genitals">Genitals</option>
                          <option value="Lung">Lung</option>
                          <option value="Nasal cavity">Nasal cavity</option>
                          <option value="Oesophagus">Oesophagus</option>
                          <option value="Oral cavity">Oral cavity</option>
                          <option value="Placenta">Placenta</option>
                          <option value="Respiratory tract">Respiratory tract</option>
                          <option value="Skin and soft tissue">Skin and soft tissue</option>
                          <option value="Throat">Throat</option>
                          <option value="Urinary tract">Urinary tract</option>
                          <option value="Vagina">Vagina</option>
                          <option value="Other">Other</option>
                        </select>
                        <label for="positionId"></label>
                      </div>
                    </div>
                    <a href="javascript:;" class="search-btn" @click.prevent="microbeSearch()">Search<i class="icon"></i></a>
                  </div>
                  <!-- 疾病搜索 -->
                  <div class="search-input-btn" v-if="searchType=='disease'">
                    <div class="search-input">
                      <div class="search-input-left">
                        <input type="text" placeholder="Input a Disease" v-model="diseaseSearchData.name" @input="toGetSuggestion(diseaseSearchData.name)" @blur="closeSelect()">
                        <ul class="suggestion-box" v-if="isShowSuggestion && suggestionData.length>0">
                          <li v-for="(item,index) in suggestionData" v-bind:key="index"><a href="#" @click.prevent="selectValue(item)">{{item}}</a></li>
                        </ul>
                      </div>
                      <div class="search-input-right">
                        <select v-model="diseaseSearchData.microbeType" id="microbeTypeId">
                          <option value="">All type</option>
                          <option value="Bacteria">Bacteria</option>
                          <option value="Chlamydia">Chlamydia</option>
                          <option value="Ehrlichia">Ehrlichia</option>
                          <option value="Fungus">Fungus</option>
                          <option value="Mycoplasma">Mycoplasma</option>
                          <option value="other">other</option>
                          <option value="Parasite">Parasite</option>
                          <option value="Rickettsia">Rickettsia</option>
                          <option value="Virus">Virus</option>
                        </select>
                        <label for="microbeTypeId"></label>
                      </div>
                    </div>
                    <a href="javascript:;" class="search-btn" @click.prevent="diseaseSearch()">Search<i class="icon"></i></a>
                  </div>
                  <!-- association -->
                  <div class="search-input-btn" v-if="searchType=='association'">
                    <div class="search-input">
                      <div class="search-input-left resetWidth">
                        <input type="text" placeholder="Input a Association" v-model="associationName">
                      </div>
                    </div>
                    <a href="javascript:;" class="search-btn" @click="associationSearch()">search<i class="icon"></i></a>
                  </div>
                  <div class="search-tip">eg: 
                    <a href="#" @click.prevent="egSearch('Helicobacter pylori')" v-if="searchType=='microbe'">Helicobacter pylori，</a>
                    <a href="#" @click.prevent="egSearch('Herpes simplex virus')" v-if="searchType=='microbe'">Herpes simplex virus</a>
                    <a href="#" @click.prevent="egSearch('Colon cancer')" v-if="searchType=='disease'">Colon cancer，</a>
                    <a href="#" @click.prevent="egSearch('Cystic fibrosis')" v-if="searchType=='disease'">Cystic fibrosis</a>
                    <a href="#" @click.prevent="egSearch('MBP00000983')" v-if="searchType=='association'">MBP00000983，</a>
                    <a href="#" @click.prevent="egSearch('MBP00000985')" v-if="searchType=='association'">MBP00000985</a>
                  </div>                      
                </div>                
              </li>              
            </ul>
          </div>
        </div>
        <div class="content-bottom">
          <div class="box">            
            <div class="table-box" v-if="searchType!='association' && data">
              <div class="title">
                <h2 class="green">{{data.name}}</h2>
              </div>
              <ul>                
                <li v-if="data.ncitId"><span>NCIT ID</span>
                  <a :href="data.ncitUrl" class="link" target="_blank">{{data.ncitId}}<i></i></a>
                </li>
                <li v-if="data.type"><span>Type</span>{{data.type}}</li>
                <li v-if="data.phylogeny"><span>Phylogenic tree</span>{{data.phylogeny}}</li>
                <li v-if="data.annotation"><span>Annotation</span>
                    <div class="show-content-box" v-bind:class="{hideMore:fontboxHeight>72}">
                      <div class="font-box" ref="fontBoxId">
                        {{data.annotation}}
                      </div>
                      <a href="javascript:;" class="show-more-btn" @click="showMore()">view more<i></i></a>
                    </div>                    
                </li>
              </ul>              
            </div>            
            <div class="table-box" v-if="searchType=='microbe'">
              <div class="title">
                <h2>Association</h2> 
                <a :href="downloadUrl" class="download-btn" v-if="associationData.length>0">Download Table</a>               
              </div>
              <table border="0">
                <tr>
                  <th style="width: 50px;">No.</th>
                  <th style="width: 130px;">Association ID</th>
                  <th>Microbe</th>
                  <th>Disease</th>
                  <th>Position</th>                 
                  <th style="width: 180px;">Score</th>
                </tr>
                <tr v-for="(item,index) in associationData" v-bind:key="index" v-if="associationData.length>0" @click="associationFun(item.name)">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.microbeName}}</td>
                  <td>{{item.diseaseName}}</td>
                  <td>{{item.position}}</td>                  
                  <td>{{item.score}}</td>
                </tr>
                <tr v-if="associationData.length==0">
                  <td colspan="6" style="background:#eee;">No Data</td>
                </tr>
              </table>
            </div>
            <div class="table-box" v-if="searchType=='disease'">
              <div class="title">
                <h2>Association</h2> 
                <a :href="downloadUrl" class="download-btn" v-if="associationData.length>0">Download Table</a>               
              </div>
              <table border="0">
                <tr>
                  <th style="width: 50px;">No.</th>
                  <th style="width: 130px;">Association ID</th>
                  <th>Microbe</th>
                  <th>Disease</th>
                  <th style="width: 120px;">Type</th>
                  <th style="width: 180px;">Score</th>
                </tr>
                <tr v-for="(item,index) in associationData" v-bind:key="index" v-if="associationData.length>0" @click="associationFun(item.name)">
                  <td>{{index+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.microbeName}}</td>
                  <td>{{item.diseaseName}}</td>
                  <td>{{item.microbeType}}</td>
                  <td>{{item.score}}</td>
                </tr>
                <tr v-if="associationData.length==0">
                  <td colspan="6" style="background:#eee;">No Data</td>
                </tr>
              </table>
            </div>
            <div class="table-box" v-if="searchType=='association'&&searchAssociationId">
              <association :isleft="0" :associationId="searchAssociationId"></association>
            </div>
          </div>
        </div>
        <div class="association-popup" v-if="isShowPopup" @click="closePopup()">
          <div class="box" @click.stop="openPopup()">
            <association :isleft="1" :associationId="associationId"></association>
            <a href="#" class="close-btn" @click.prevent="closePopup()"></a>
          </div>
        </div>       
    </div>
</template>

<script>
import API from './config/api.js';
import qs from 'qs';
import Association from './Association.vue';
export default {
  name: 'browser',
  data(){
    return{
      data: null,
      associationData:[],
      downloadUrl: '',
      searchType: 'microbe',
      microbeSearchData:{
        name: '',
        position: ''
      },
      diseaseSearchData:{
        name: '',
        microbeType: ''
      },
      associationName:'',
      suggestionData:[],
      isShowSuggestion:false,
      fontboxHeight:80,
      associationId:'',
      searchAssociationId:'',
      isShowPopup: false
    }
  },
  created(){ 
    if(this.$route.params.searchType == 'microbe'){      
      this.searchType = this.$route.params.searchType;
      this.microbeSearchData = this.$route.params.microbeSearchData;
      this.microbeSearch();
    }else if(this.$route.params.searchType == 'disease'){
      this.searchType = this.$route.params.searchType;
      this.diseaseSearchData = this.$route.params.diseaseSearchData;
      this.diseaseSearch();
    }else if(this.$route.params.searchType == 'association'){
      this.searchType = this.$route.params.searchType;
      this.associationName = this.$route.params.associationName;
      this.associationSearch();
    }
  },  
  mounted(){
    //window.addEventListener('scroll', this.handleScroll, true);    
  },
  methods:{
    microbeSearch(){
      if (this.microbeSearchData.name) {         
        this.$fetch(API.associationMicrobe, this.microbeSearchData).then((response)=>{
          if(response.status == 0){
            this.data = response.data.microbe;
            this.associationData = response.data.associations;
            this.$alertify.success('success');
            let self = this;
            if(response.data.microbe){
              if(response.data.microbe.annotation){
                setTimeout(function(){
                  self.fontboxHeight = self.$refs.fontBoxId.scrollHeight;
                },100)
              }
            }
          }
        });        
        this.downloadUrl = API.associationMicrobeDownload+"?"+qs.stringify(this.microbeSearchData, { indices: false });
      }else{
        this.$alertify.error('Name cannot be empty');
      }
    },
    diseaseSearch(){
      if(this.diseaseSearchData.name){
        this.$fetch(API.associationDisease, this.diseaseSearchData).then((response)=>{
          if(response.status == 0){
            this.data = response.data.disease;
            this.associationData = response.data.associations;
            this.$alertify.success('success');
            let self = this;
            if(response.data.disease){
              if(response.data.disease.annotation){
                setTimeout(function(){
                  self.fontboxHeight = self.$refs.fontBoxId.scrollHeight;
                },100)
              }
            }
          }
        });
        this.downloadUrl = API.associationDiseaseDownload+"?"+qs.stringify(this.diseaseSearchData, { indices: false });
      }else{
        this.$alertify.error('Name cannot be empty');
      }
    },
    associationSearch(){
      if(this.associationName){
        this.searchAssociationId = this.associationName;
      }else{
        this.$alertify.error('Name cannot be empty');
      }
    },
    setSearchType(searchType){
      this.data = null;
      this.microbeData = [];
      this.diseaseData = [];
      this.associationData = [];
      this.downloadUrl = '';
      this.searchType = searchType;
      this.microbeSearchData = {name: '', position: ''};
      this.diseaseSearchData = {name: '', microbeType: ''};
      this.associationName = '';
    },
    selectValue(name){           
      if(this.searchType == 'microbe'){
        this.microbeSearchData.name = name;
      }else{
        this.diseaseSearchData.name = name;
      }
      this.isShowSuggestion = false;      
    },
    egSearch(name){
      if(this.searchType == 'microbe'){
        this.microbeSearchData.name = name;
        this.microbeSearch();
      }else if(this.searchType == 'disease'){
        this.diseaseSearchData.name = name;
        this.diseaseSearch();
      }else{
        this.associationName = name;
        this.associationSearch();
      }
    },
    toGetSuggestion(name){
      if(this.searchType == 'microbe'){
        this.$fetch(API.microbeSuggestion+'?name='+name).then((response)=>{
          if(response.status == 0){
            this.suggestionData = response.data;
            this.isShowSuggestion = true;
          }
        });
      }else{
        this.$fetch(API.diseaseSuggestion+'?name='+name).then((response)=>{
          if(response.status == 0){
            this.suggestionData = response.data;
            this.isShowSuggestion = true;
          }
        });
      }  
    },
    closeSelect(){
      let self = this;
      setTimeout(function () {
        self.isShowSuggestion = false;
      },300);//延迟300ms      
    },
    //顶部滚动效果
    handleScroll:function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;  
      // 设备/屏幕高度
      let scrollObj = document.getElementById('search'); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // div 到头部的距离
      if(scrollTop>80){
        $('.search-header').addClass('active');
      }else{
        $('.search-header').removeClass('active');
      }
    },
    associationFun(name){
      this.isShowPopup = true;
      this.associationId = name;
    },
    openPopup(){

    },
    closePopup(){
      this.isShowPopup = false;
    },
    showMore(){
      this.fontboxHeight = 0;
    }   
  },
  components:{
    'association': Association
  },
  destroyed: function () {
    //window.removeEventListener('scroll', this.handleScroll,true);   //  离开页面清除（移除）滚轮滚动事件
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search{
    width: 100%;   
    margin:0 auto;
    height:-moz-calc(100vh - 56px);	
    height:-webkit-calc(100vh - 56px);	
    height:calc(100vh - 56px);          
    overflow-x: auto;
    position:relative;
    .search-header{
      width: 100%;
      height:150px;
      background:#fff url('~@/assets/images/search_bg.png') no-repeat bottom center;
      background-size: 100% 100%;
      &.active{
        position: fixed;
        left:0;
        top:56px;
        height: 60px;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.05);
        z-index: 999;
        .box{
          padding-top:8px;          
          .tab-a{
            display: none;
          }
        }
      }
      .box{
        width: 60%;        
        min-width: 960px;
        margin: 0 auto;
        padding-top:25px;
        .tab-a{
          margin-bottom:18px;
          li{
            padding-right:15px;
            margin-right:15px;
            border-right:1px solid #fff;
            &:last-child{
              padding-right:0;
              margin-right:0;
              border-right:0;
            }
            a{
              font-size:22px;
              line-height: 20px;
              color:rgba(255,255,255,.54);
              text-decoration:none;
              &.active{
                color:#fff;
                font-weight: bold;               
              }
            }
          }
        }
        .tab-content{
          padding:0;
          li{
            .search-box{
              margin-bottom:35px;
              .search-input-btn{
                margin-bottom:5px;
                padding-right:150px;
                position: relative;
                .search-input{
                  width: 100%;
                  height: 42px;
                  display:inline-block;                    
                  background:#fff;
                  border-radius:24px;
                  box-shadow: 0 2px 4px 0 rgba(80,80,80,0.53);
                  padding:8px 15px;
                  vertical-align: middle;
                  position:relative;
                  .search-input-left{
                    width: 50%;
                    float:left;                      
                    position: relative;
                    &.resetWidth{
                        width: 100%;
                        input{
                          padding-right:0;
                        }                        
                    }
                    input{
                      width: 100%;
                      border:0;
                      font-size:16px;
                      line-height:24px;
                      outline:0;
                      padding:0;
                      vertical-align: middle;
                      padding-right: 20px;                      
                    }
                    .suggestion-box{
                      min-width: 100%;
                      background: #fff;
                      position: absolute;
                      top:30px;
                      left:0;
                      border:1px solid #819dd4;
                      max-height: 442px;
                      overflow-y:auto;
                      z-index: 999;
                      li{
                        a{
                          display: block;
                          text-decoration: none;
                          padding:2px 20px;
                          color: #222;
                          line-height: 18px;
                          &:hover{
                            background: #3d91ff;
                            color:#fff;
                          }
                        }
                      }
                    }    
                  }
                  .search-input-right{
                    width: 50%;
                    float:left;                      
                    padding-right:10px;
                    position: relative;                  
                    label{
                      display: block;
                      width: 24px;
                      height: 24px;
                      background:#fff url('~@/assets/images/down.1.svg') no-repeat center center;
                      position:absolute;
                      right:10px;
                      top:2px;
                    }
                    select{
                      height:24px;
                      border:0;
                      padding-left:20px;
                      font-size:16px;
                      width:100%;
                      outline:0;
                      appearance:none;
                      -moz-appearance:none;
                      -webkit-appearance:none;
                      z-index:9;
                      position:relative;
                      vertical-align: middle;
                      background: none;
                      border-left:1px solid #3B3B3B;
                      border-radius: 0;
                      &::-ms-expand{ 
                        display: none; 
                      }
                    }
                  }
                }
                .search-btn{
                  display:block;
                  padding:8px 15px 8px 25px;
                  font-size:18px;
                  line-height: 24px;
                  color: #757575;
                  border-radius:24px;
                  background:#fff;
                  box-shadow: 0 2px 4px 0 rgba(80,80,80,0.53);                  
                  text-decoration:none;
                  position: absolute;
                  right:0;
                  top:0;
                  .icon{
                    display: inline-block;                      
                    width:20px;
                    height:20px;
                    background: url('~@/assets/images/sousuo.svg') no-repeat left center;
                    vertical-align: top;
                    margin-left:10px;
                    margin-top:2px;
                  }
                }
              }
              .search-tip{
                  font-size:14px;
                  color: rgba(255,255,255,0.78);                  
                  a{
                    font-size:14px;
                    color: rgba(255,255,255,0.78);
                  }
                }
            }
          }
        }
      }      
    }   
    .content-bottom{
      width:100%;            
      background:#fff;
      padding-bottom:30px;
      .box{
        padding-top:20px;
        width: 60%;
        min-width: 960px;
        margin: 0 auto;
        .crumbs{
          overflow:hidden;
          margin-bottom:35px;
          li{
            font-size:18px;
            line-height:24px;
            float:left;
            padding-right:40px;
            position: relative;
            i{
              width:20px;
              height:20px;
              display:block;
              position: absolute;
              background: url('~@/assets/images/down.1.svg') no-repeat center center;
              transform: rotate(-90deg);
              top:4px;
              right:10px;
            }                        
          }
        }
        .table-box{
          margin-bottom:20px;          
          .title{
            width: 100%;
            overflow:hidden;
            margin-bottom:10px;
            h2{
              font-size:24px;
              line-height:32px;
              margin:0;
              float:left;
              &.green{
                color:#0A897C;
              }
            }
            .download-btn{
              float:right;
              display:block;              
              font-size:18px;
              color:#fff;
              line-height:20px;
              padding:6px 20px;
              background-image: linear-gradient(-96deg, #18BEB3 5%, #0A897C 99%);
              border-radius: 24px;
            }
          }
          ul{
            li{
              width:100%;
              font-size:18px;
              line-height:24px;
              margin-bottom:5px;
              padding-left:180px;
              position:relative;
              span{
                width:140px;
                text-align:right;
                display:block;
                color:#757575;
                margin-right:40px;
                position:absolute;
                left:0;
                top:0;
              }
              .link{
                font-size:18px;
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
              .show-content-box{
                position:relative; 
                padding-bottom:20px;               
                &.hideMore{
                  padding-bottom:30px;
                  .font-box{
                    height: 70px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;  //这里是在第二行有省略号
                    overflow: hidden;
                    &:after{
                      width:100%;
                      height:70px;
                      display:block;
                      content:'';
                      background: -webkit-linear-gradient(bottom,rgba(255,255,255,0), rgba(255,255,255,0.9)); /* Safari 5.1 - 6.0 */
                      background: -o-linear-gradient(bottom,rgba(255,255,255,0), rgba(255,255,255,0.9)); /* Opera 11.1 - 12.0 */
                      background: -moz-linear-gradient(bottom,rgba(255,255,255,0), rgba(255,255,255,0.9)); /* Firefox 3.6 - 15 */
                      background: linear-gradient(to bottom,rgba(255,255,255,0), rgba(255,255,255,0.9));
                      position:absolute;
                      bottom:0;
                      left:0;
                    }
                  }
                  .show-more-btn{
                    display:block;
                  } 
                }
                .font-box{ 
                  height: auto;                 
                  position:relative;                  
                }
                .show-more-btn{
                  display:none;
                  font-size:18px;
                  line-height:24px;
                  width:200px;
                  color:#0A897C;
                  text-align:center;
                  position:absolute;
                  text-decoration:none;
                  left:50%;
                  margin-left:-100px;
                  bottom:0;
                  i{
                    width:24px;
                    height:24px;
                    display:inline-block;
                    background: url('~@/assets/images/right.svg') no-repeat 10px center;
                    background-size:35%;
                    vertical-align:top;
                    margin-left:15px;
                    transform:rotate(90deg);
                    -ms-transform:rotate(90deg); 	/* IE 9 */
                    -moz-transform:rotate(90deg); 	/* Firefox */
                    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
                    -o-transform:rotate(90deg); 	/* Opera */
                  }
                }
              }
            }
          }
          table{
            width:100%;
            table-layout: fixed;
            tr{
              cursor:pointer;
              th{
                background:#F9F9F9;
                border: 1px solid #979797;
                text-align:center;
                font-size:16px;
                padding:8px;
              }
              &:hover{
                background: #E9F5F3;                
              }
              td{
                border: 1px solid #979797;
                text-align:center;
                font-size:16px;
                padding:6px 8px;                
              }
            }
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
        width: 90%;
        max-width: 1200px;
        height: 100%;
        margin:0 auto;
        background: #FFFFFF;
        border-radius: 12px;
        overflow: hidden;        
        position: relative;
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
      }
    }
  }
</style>

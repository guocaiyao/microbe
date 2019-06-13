<template>
    <div class="browser">
        <div class="left-menu">
          <ul class="firstMenu">
            <li class="firstLi" v-for="(item, index) in menuData" v-bind:key="'one'+index">
              <a href="javascript:;" class="dropA one"><span v-bind:class="item.name"></span>{{item.name}}<i v-bind:class="{'down':item.type=='disease'}" v-if="item.child.length>0"></i></a>
              <ul class="dropMenu" v-bind:class="{'hide':item.type!='disease'}">
                <li v-for="(item2, index) in item.child" v-bind:key="'two'+index">
                  <a href="javascript:;" class="dropA two" v-bind:class="{'active':activeName==item2.name&&item2.child.length==0}" @click.prevent="searchFun(item.type,item2.name,item2.child.length,[item.name,item2.name])">{{item2.name}}<i v-if="item2.child.length>0"></i></a>
                  <ul class="dropMenu hide">
                    <li v-for="(item3, index) in item2.child" v-bind:key="'three'+index">
                      <a href="javascript:;" class="dropA three" v-bind:class="{'active':activeName==item3.name&&item3.child.length==0}" @click.prevent="searchFun(item.type,item3.name,item3.child.length,[item.name,item2.name,item3.name])">{{item3.name}}<i v-if="item3.child.length>0"></i></a>
                      <ul class="dropMenu hide">
                        <li v-for="(item4, index) in item3.child" v-bind:key="'four'+index">
                          <a href="#" class="dropA four" v-bind:class="{'active':activeName==item4.name&&item4.child.length==0}" @click.prevent="searchFun(item.type,item4.name,item4.child.length,[item.name,item2.name,item3.name,item4.name])">{{item4.name}}<i v-if="item4.child.length>0"></i></a>
                          <ul class="dropMenu hide">
                            <li v-for="(item5, index) in item4.child" v-bind:key="'five'+index">
                              <a href="#" class="dropA five" v-bind:class="{'active':activeName==item5.name&&item5.child.length==0}" @click.prevent="searchFun(item.type,item5.name,item5.child.length,[item.name,item2.name,item3.name,item4.name,item5.name])">{{item5.name}}<i v-if="item5.child.length>0"></i></a>
                              <ul class="dropMenu hide">
                                <li v-for="(item6, index) in item5.child" v-bind:key="'six'+index">
                                  <a href="#" class="dropA six" v-bind:class="{'active':activeName==item6.name&&item6.child.length==0}" @click.prevent="searchFun(item.type,item6.name,item6.child.length,[item.name,item2.name,item3.name,item4.name,item5.name,item6.name])">{{item6.name}}<i v-if="item6.child.length>0"></i></a>
                                  <ul class="dropMenu hide">
                                    <li v-for="(item7, index) in item6.child" v-bind:key="'seven'+index">
                                      <a href="#" class="dropA seven" v-bind:class="{'active':activeName==item7.name&&item7.child.length==0}" @click.prevent="searchFun(item.type,item7.name,item7.child.length,[item.name,item2.name,item3.name,item4.name,item5.name,item6.name,item7.name])">{{item7.name}}<i v-if="item7.child.length>0"></i></a>
                                      <ul class="dropMenu hide">
                                        <li v-for="(item8, index) in item7.child" v-bind:key="'eight'+index">
                                          <a href="#" class="dropA eight" v-bind:class="{'active':activeName==item8.name&&item8.child.length==0}" @click.prevent="searchFun(item.type,item8.name,item8.child.length,[item.name,item2.name,item3.name,item4.name,item5.name,item6.name,item7.name,item8.name])">{{item8.name}}<i v-if="item8.child.length>0"></i></a>
                                          <ul class="dropMenu hide">
                                            <li v-for="(item9, index) in item8.child" v-bind:key="'nine'+index">
                                              <a href="#" class="dropA nine" v-bind:class="{'active':activeName==item9.name&&item9.child.length==0}" @click.prevent="searchFun(item.type,item9.name,item9.child.length,[item.name,item2.name,item3.name,item4.name,item5.name,item6.name,item7.name,item8.name,item9.name])">{{item9.name}}<i v-if="item9.child.length>0"></i></a>
                                            </li>
                                          </ul>
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>                    
                  </ul>
                </li>
              </ul>
            </li>           
          </ul>
        </div>        
        <div class="right-content">
          <div class="box">
            <ul class="crumbs">
              <li v-for="(item,index) in navigationData" v-bind:key="index">{{item}}<i></i></li>
            </ul>
            <div class="table-box" v-if="type && data">
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
            <div class="table-box" v-if="type=='microbe'">
              <div class="title">
                <h2>Association</h2> 
                <a :href="downloadUrl" class="download-btn" v-if="associationData.length>0">Download Table</a>               
              </div>
              <table border="0">
                <tr>
                  <th>No.</th>
                  <th>Association ID</th>
                  <th>Microbe</th>
                  <th>Disease</th>
                  <th>Position</th>
                  <th>Score</th>
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
            <div class="table-box" v-if="type=='disease'">
              <div class="title">
                <h2>Association</h2> 
                <a :href="downloadUrl" class="download-btn" v-if="associationData.length>0">Download Table</a>               
              </div>
              <table border="0">
                <tr>
                  <th>No.</th>
                  <th>Association ID</th>
                  <th>Microbe</th>
                  <th>Disease</th>
                  <th>Type</th>
                  <th>Score</th>
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
      menuData: [],
      data: null,
      associationData:[],
      type:'',
      listData:[],
      navigationData:[],
      activeName:'',
      downloadUrl: '',
      fontboxHeight:80,      
      associationId:'',
      isShowPopup: false
    }
  },
  created(){
      this.downloadUrl = API.downloadUrl;
      this.getMenu();
      this.searchFun('disease','Streptococcal pharyngitis',0,['Disease','Streptococcal pharyngitis']);
  },
  methods:{
    getMenu(){
      this.$fetch(API.browserMenu).then((response)=>{
        if(response.status == 0){
          this.menuData = response.data;
        }
      })
    },
    searchFun(type,name,num,navigationData){      
      if(num==0){
        this.activeName = name;
        this.type = type;    
          
        this.navigationData = navigationData;
        let params = {name: name};
        if(type == 'microbe'){    
          this.$fetch(API.associationMicrobe, params).then((response)=>{
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
          this.downloadUrl = API.associationMicrobeDownload+"?"+qs.stringify(params, { indices: false });
        }else{
          this.$fetch(API.associationDisease, params).then((response)=>{
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
          this.downloadUrl = API.associationDiseaseDownload+"?"+qs.stringify(params, { indices: false });
        }
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .browser{
    width: 100%;
    height:-moz-calc(100vh - 56px);	
	  height:-webkit-calc(100vh - 56px);	
	  height:calc(100vh - 56px);
    margin:0 auto;
    position:relative;
    .left-menu{
      padding:10px 0;
      width:260px;      
      height:100%;
      background:#0A897C;
      position:absolute;
      left:0;
      top:0; 
      overflow-y:auto;  
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
      .firstMenu{
        li{                    
          .dropA{
            font-size:14px;
            color:#fff;
            line-height:20px;
            padding:10px 15px;
            display:block;
            position:relative;
            span{
              width:20px;
              height:20px;
              display:inline-block;  
              vertical-align: top;
              margin-right: 5px;
              &.Disease{
                background: url('~@/assets/images/disease_copy.svg') no-repeat center center;
                background-size:100% auto;
              }
              &.Microbe{
                background: url('~@/assets/images/microbe_copy.svg') no-repeat center center;
                background-size:auto 100%;
              }
            }
            &:hover,&.active{
              background:#fff;
              text-decoration:none;
              color:#222;
              span.Disease{
                background: url('~@/assets/images/disease_copy_2.svg') no-repeat center center;
                background-size:100% auto;
              }
              span.Microbe{
                background: url('~@/assets/images/microbe_copy_2.svg') no-repeat center center;
                background-size:auto 100%;
              }
              .down{
                background-image: url('~@/assets/images/down.1.svg');                
              }
            }
            &.one{
              font-size:16px;
            }
            &.two{
              padding-left:20px;
            }
            &.three{
              padding-left:25px;
            }
            &.four{
              padding-left:30px;
            }
            &.five{
              padding-left:35px;
            }
            &.six{
              padding-left:40px;
            }
            &.seven{
              padding-left:45px;
            }
            &.eight{
              padding-left:50px;
            }
            &.nine{
              padding-left:55px;
            }
            i{
              width:20px;
              height:20px;
              display:block;
              background: url('~@/assets/images/down.svg') no-repeat center center;
              background-size:60%;
              position:absolute;
              top:10px;
              right:10px;
              transform:rotate(-90deg);
              -ms-transform:rotate(-90deg); 	/* IE 9 */
              -moz-transform:rotate(-90deg); 	/* Firefox */
              -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
              -o-transform:rotate(-90deg); 
              &.down{
                transform:rotate(0deg);
                -ms-transform:rotate(0deg); 	/* IE 9 */
                -moz-transform:rotate(0deg); 	/* Firefox */
                -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
                -o-transform:rotate(0deg); 
              }
            }
          }
          .dropMenu{
            background:rgba(0,0,0,0.2);
            box-shadow: inset 4px 3px 10px 0 rgba(0,0,0,0.10);            
          }
        }
      }
    }    
    .right-content{
      width:100%;
      height:100%;
      padding-left:260px;
      background:#fff;
      height:-moz-calc(100vh - 56px);	
      height:-webkit-calc(100vh - 56px);	
      height:calc(100vh - 56px);
      overflow-x: auto;
      .box{
        padding:30px 40px;
        .crumbs{
          overflow:hidden;
          margin-bottom:30px;
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
            &:last-child{
              i{
                display: none;
              }
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
              line-height:36px;
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
                margin-right:40px;
                color:#757575;
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
                &.init{                  
                  .font-box{
                    height: 70px;
                    overflow: hidden;
                  }
                }               
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

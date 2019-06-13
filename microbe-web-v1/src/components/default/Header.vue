<template>
    <div class="header-box">
      <div class="logo-box">
        <router-link to="/home" class="logo">logo</router-link>
      </div>
      <div class="menu-box">
        <ul>
          <li v-bind:class="{ active: currentRouter.indexOf('/home')!=-1 }"><router-link to="/home"><i class="home-icon"></i>Home</router-link></li>          
          <li v-bind:class="{ active: currentRouter.indexOf('/browser')!=-1 }"><router-link to="/browser"><i class="browser-icon"></i>Browser</router-link></li>
          <li v-bind:class="{ active: currentRouter.indexOf('/search')!=-1 }"><router-link to="/search"><i class="search-icon"></i>Search</router-link></li>
          <li v-bind:class="{ active: currentRouter.indexOf('/tool')!=-1 }"><router-link to="/tool"><i class="tool-icon"></i>Tool</router-link></li>
          <li v-bind:class="{ active: currentRouter.indexOf('/submission')!=-1 }"><router-link to="/submission"><i class="submission-icon"></i>Submission</router-link></li>
          <li>
            <a href="javascript:;" class="my-dropdown-a"><i class="documents-icon"></i>Documents</a>
            <ul class="my-dropdown-menu">
              <li><router-link to="/introduction">Introduction</router-link></li>
              <li><router-link to="/services">API Services</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>  
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      currentRouter:''
    }
  },
  created(){
      this.currentRouter = this.$route.path;
  },
  methods:{
    
  },
  watch:{
    //监听路由变化
    $route(to,from){
      this.currentRouter = to.path;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-box{
  width:100%;
  height:56px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12);
  padding-left:20px;
  position: relative;
  z-index: 10;
  .logo-box{
    float: left;
    width: 100px;
    height:56px;
    .logo{
      font-size:0;
      width: 180px;
      height: 28px;
      display: block;
      background: url('~@/assets/images/logo.svg') no-repeat center center;
      background-size: 100%;
      margin-top: 14px;
    }
  }
  .menu-box{
    float:right;
    &>ul{
      padding:0;
      float:right;
      margin: 0;
      &>li{        
        float:left;
        list-style: none;
        position:relative;
        .my-dropdown-menu{
          width:calc(100% - 40px);
          top:53px;
          left:20px;
          position:absolute;
          background:#fff;
          box-shadow: 0 2px 3px 0 rgba(0,0,0,0.12); 
          padding-bottom:10px;
          padding-top:3px;
          display:none;
          li{
            text-align:center;
            a{
              font-size:14px;
              line-height: 38px;
              color:#222222;
              text-decoration:none;
              display:block;
              &:hover{
                color:#0A897C; 
                background: #EAF4F3;           
              }
            }
          }
        }
        &:hover{
          .my-dropdown-menu{
            display:block;
          }
        }        
        &>a{
          font-size:16px;
          line-height: 53px;
          color:#222222;
          display: inline-block;
          margin:0 20px;
          padding:0 2px;
          i{
            font-size:0;
            width:20px;
            height:20px;
            display:inline-block; 
            vertical-align: top;
            margin-top: 16px;
            margin-right: 5px;          
            &.home-icon{
              background: url('~@/assets/images/Home.svg') no-repeat center center;  
              background-size: 80% auto;            
            }
            &.search-icon{
              background: url('~@/assets/images/Search-icon.svg') no-repeat center center;  
              background-size: 80% auto;
            }
            &.browser-icon{
              background: url('~@/assets/images/Browser.svg') no-repeat center center; 
              background-size: 80% auto;              
            }
            &.services-icon{
              background: url('~@/assets/images/Services.svg') no-repeat center center;
              background-size: auto 80%;
            }
            &.tool-icon{
                background: url('~@/assets/images/tool.svg') no-repeat center center; 
                background-size: auto 80%;             
              }
            &.submission-icon{
              background: url('~@/assets/images/submission.svg') no-repeat center center;
              background-size: auto 80%;
            }
            &.documents-icon{
              background: url('~@/assets/images/Documents.svg') no-repeat center center;
              background-size: auto 80%;
            }
          }
          &.my-dropdown-a:hover{
            border-bottom:0;
          }
          &:hover{
            text-decoration: none;
            color: #0A897C;
            border-bottom:3px solid #0A897C;
            i{
              &.home-icon{
                background: url('~@/assets/images/Home2.svg') no-repeat center center; 
                background-size: 80% auto;             
              }
              &.search-icon{
                background: url('~@/assets/images/Search-icon2.svg') no-repeat center center;  
                background-size: 80% auto;
              }
              &.browser-icon{
                background: url('~@/assets/images/Browser2.svg') no-repeat center center;
                background-size: 80% auto;              
              }
              &.services-icon{
                background: url('~@/assets/images/Services2.svg') no-repeat center center;
                background-size: auto 80%;              
              }
              &.tool-icon{
                background: url('~@/assets/images/tool2.svg') no-repeat center center; 
                background-size: auto 80%;             
              }
              &.submission-icon{
                background: url('~@/assets/images/submission2.svg') no-repeat center center; 
                background-size: auto 80%;             
              }
              &.documents-icon{
                background: url('~@/assets/images/Documents2.svg') no-repeat center center;
                background-size: auto 80%;              
              }              
            }
          }
        }
        &.active{          
          &>a{
            color: #0A897C;
            border-bottom:3px solid #0A897C;
            font-weight: bold;
            &.my-dropdown-a:hover{
              border-bottom:0;
            }
            i{
              &.home-icon{
                background: url('~@/assets/images/Home2.svg') no-repeat center center; 
                background-size: 80% auto;             
              }
              &.search-icon{
                background: url('~@/assets/images/Search-icon2.svg') no-repeat center center;  
                background-size: 80% auto;
              }
              &.browser-icon{
                background: url('~@/assets/images/Browser2.svg') no-repeat center center;
                background-size: 80% auto;              
              }
              &.services-icon{
                background: url('~@/assets/images/Services2.svg') no-repeat center center; 
                background-size: auto 80%;             
              }
              &.tool-icon{
                background: url('~@/assets/images/tool2.svg') no-repeat center center; 
                background-size: auto 80%;             
              }
              &.submission-icon{
                background: url('~@/assets/images/submission2.svg') no-repeat center center; 
                background-size: auto 80%;             
              }
              &.documents-icon{
                background: url('~@/assets/images/Documents2.svg') no-repeat center center;
                background-size: auto 80%;              
              }
            }
          }
        }       
      }
    }
  }
}
</style>

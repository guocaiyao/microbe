<template>
    <div class="page-model" v-if="totalPage!=0">
      <div class="left-box">
        共<span>{{amount}}</span>条记录
      </div>
      <div class="right-box">
        <ul>
          <li class="prev" v-bind:class="{ disabled: currentPage == 1 }"><a href="#" v-on:click.prevent="prev()">上一页</a></li>
          <li class="point" v-if="this.pageArr[0] >1">...</li>
          <li class="num" v-for="(item,index) in pageArr" v-bind:key="index">
            <a href="#" v-bind:class="{ active: currentPage == item }" v-on:click.prevent="go('click',item)">{{item}}</a>
          </li>
          <li class="point" v-if="this.pageArr[this.pageArr.length-1] < totalPage">...</li>
          <li class="next" v-bind:class="{ disabled: currentPage == totalPage }"><a href="#" v-on:click.prevent="next()">下一页</a></li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Page',
  data () {
    return {
      currentPage: 1,
      pageArr:[]
    }
  },
  props:['totalPage','amount'],
  methods:{
    prev:function(){
      if(this.currentPage > 1){
        let page = this.currentPage - 1;
        this.go('click',page);
      }
    },
    go:function(type,page){   
      this.currentPage = page; 
      this.pageArr = [];      
      if(page>=3){        
        if(this.totalPage - page>=2){          
          for(let i=page-1;i <= page+2;i++){
            this.pageArr.push(i);
          }  
        }else{          
          for(let i=this.totalPage-2;i <= this.totalPage;i++){
            this.pageArr.push(i);
          } 
        }
      }else{        
        if(this.totalPage <= 4){          
          for(let i=1;i <= this.totalPage;i++){
            this.pageArr.push(i);
          }    
        }else{          
          for(let i=1;i <= 4;i++){
            this.pageArr.push(i);
          }  
        }
      }
      if(type=="click"){  
        this.$emit('changepage', this.currentPage); 
      } 
    },
    next:function(){
      if(this.currentPage < this.totalPage){
        let page = this.currentPage + 1;
        this.go('click',page);
      }
    }  
  },
  watch:{      
      totalPage(val){
        // 这样重新赋值后，就得到了父组件动态改变的数据
        this.go('init',1);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page-model{
  width: 100%;
  overflow: hidden;
  padding:15px 0;
  .left-box{
    float:left;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0;
    line-height:36px;
    span{
      color: #003300;
      padding:0 4px;
    }
  }
  .right-box{
    float:right;
    ul{
      text-align: right;
      margin:0;
      font-size: 0;
      li{
        display: inline-block;
        vertical-align: top;
        margin:0 2px;
        list-style: none;
        &:active{
          top:1px;
          position:relative;
        }
        &.prev{
          a{
            background: #ffffff;
            border: 1px solid #EEEEEE;
            border-radius: 6px;
            padding:9px 15px;            
            font-size: 0;
            line-height: 0;
            display: block;
            &:after{
              width: 16px;
              height: 16px;
              content: '';
              display: block;
              background: url('~@/assets/images/prev.svg') no-repeat center center;
            }
            &:hover{
              border: 1px solid #478FD7;
              &:after{
                background: url('~@/assets/images/prev.1.svg') no-repeat center center;
              }
            }
          }
          &.disabled{
            a{
              background: #EEEEEE;
              border: 1px solid #EEEEEE;
              cursor: default;
              &:after{
                background: url('~@/assets/images/prev.svg') no-repeat center center;
              }
            }
            &:active{
              top:0px;
              position:relative;
            }
          }
        }
        &.next{
          a{
            background: #ffffff;
            border: 1px solid #EEEEEE;
            border-radius: 6px;
            padding:9px 15px;
            font-size: 0;
            line-height: 0;
            display: block;
            &:after{
              width: 16px;
              height: 16px;
              content: '';
              display: block;
              background: url('~@/assets/images/next.svg') no-repeat center center;
            }
            &:hover{              
              border: 1px solid #478FD7;
              &:after{
                background: url('~@/assets/images/next.1.svg') no-repeat center center;
              }
            }
          }          
          &.disabled{
            a{
              background: #EEEEEE;
              border: 1px solid #EEEEEE;
              cursor: default;
              &::after{
                background: url('~@/assets/images/next.svg') no-repeat center center;
              }
            }
            &:active{
              top:0px;
              position:relative;
            }
          }
        }
        &.num{
          a{
            width: 36px;
            height: 36px;
            font-size: 14px;
            line-height: 35px; 
            color: #4A4A4A;           
            border-radius: 6px;
            display: block;
            text-decoration: none;
            background: #FFFFFF;
            border: 1px solid #EEEEEE;
            text-align: center;
            &:hover{
              color: #478FD7;
              border: 1px solid #478FD7;
            }
            &.active{
              color:#fff;
              background: #5177CB;
              border: 1px solid #5177CB;
              box-shadow: 0 2px 4px 0 rgba(74,144,226,0.40);
              &:hover{
                color:#fff;
                border: 1px solid #5177CB;
              }
            }
          }
        }
        &.point{
          width: 36px;
          height: 36px;
          font-size: 14px;
          line-height: 35px; 
          color: #4A4A4A;           
          border-radius: 6px;         
          text-decoration: none;
          background: #FFFFFF;
          border: 1px solid #EEEEEE;
          text-align: center;
          cursor: default;
        }
      }
    }
  }
}
</style>

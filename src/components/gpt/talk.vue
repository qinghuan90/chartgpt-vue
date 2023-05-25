<template>
  <div class="main">
    <el-container style="height: 100vh;padding: 0px;">
      <el-aside style="width: 20%;height:100vh;background-color: rgb(46, 45, 44);">
           <spen class="aside-style"><img src="../../assets/img/reboot2.png" style="width: 50px;height: 50px;vertical-align: middle;" /> 悠悠GPT</spen>
           <el-divider></el-divider>
           <div v-for="data in messages" class="question-list">
            <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);border: 1px solid rgb(72, 71, 73);">
            <i class="el-icon-collection-tag"></i>
            <span> {{data.issue}}</span>
            </div>
           </div>
           <div style="color: azure;margin-top: 150px;margin-left: 5%;">
            PF<el-divider direction="vertical"></el-divider>仅供学习使用
          </div>
      </el-aside>
    <el-container style="height: 100vh;width: 100%;">
      <el-main id="talks">
         <div v-for="data in messages"  class="talk">         
          <div class="talk-question">
            <el-row  type="flex" class="talkrow">
              <el-col :span="2"><img src="../../assets/img/issue.png" style="width: 40px;height: 40px;vertical-align: middle;" /></el-col>
              <el-col :span="22">{{data.issue}}</el-col>
            </el-row>
          </div>
          <div class="talk-answer">
            <el-row type="flex" class="talkrow" style="margin-top:2px;">
              <el-col :span="2"><img src="../../assets/img/reboot.png" style="width: 45px;height: 45px;vertical-align: middle;" /></el-col>
              <el-col :span="22" class="answercol"  v-if="data.answer !=''">
                <mavon-editor defaultOpen="preview" :subfield="false" :toolbarsFlag="false"  scrollStyle=false
                :ishljs="true" boxShadow=false codeStyle="atom-one-dark" style="width:80%;min-height:5%;" v-model="data.answer"/>
              </el-col>
              <el-col :span="22" v-else-if="status=='loading'" ><i class="el-icon-loading"></i></el-col>
              <el-col :span="22" v-else="status=='error'" >请求失败,请重试</el-col>
            </el-row>
          </div>
         </div>
      </el-main>
    <el-footer style="margin-bottom: 5%;">
      <el-row class="footer" >
        <el-col style="width: 90%;"><el-input v-model="issue" class="paperview-input-text" @keyup.enter.native="ask" placeholder="请输入问题"></el-input> </el-col>
        <el-col style="width: 5%;margin-left:2%"> <el-button type="primary" :loading="loading"  @click="ask">发送</el-button> </el-col>
      </el-row>
    </el-footer>
    </el-container>
  </el-container>

  </div>
</template>
<script>
// 导入组件
import { askGPT } from '../../api/talk';
import Markdown from 'vue-meditor'

export default {
  name: 'talk',
  data() {
    return {
      loading:false,
      status:"success",
      issue: "",
      messages: []
    }
  },
  components: {
    Markdown
  },
  methods: {
    autoscrollfooter(){
    //新增时滚动到div的最下面
    this.$nextTick(() => {
        var container = this.$el.querySelector('#talks');
        container.scrollTop = container.scrollHeight;
       })
    },
    ask(){
      this.loading =true
      let message = {}
      message.issue=this.issue
      message.answer=""
      message.content = this.issue
      // push一条临时数据
      this.messages.push(message);
      this.autoscrollfooter()

      this.status = "loading"
      askGPT(this.messages).then(res => {
           this.loading =false
           if(res.code==200){
            this.status = "success"
            this.messages.splice(this.messages.length-1,1) //删除一条数据
            console.log(res.data.content)
            message.answer = res.data.content
            this.messages.push(message);
            this.issue = ""
            this.autoscrollfooter()

           } else {
            this.status = "error"
           }
      })

    }

  }
}
</script>
<style >
.question-list{
  color: #faf7f7;
  display: block;
  margin-left: 2%;
  margin-right: 5%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(41, 42, 41);
  line-height: 40px;
  text-indent: 1em;
  border-radius: 4px;
  height:calc(100vh - 300px);
  overflow-y: auto; 
}
.question-list > span{
  margin-left: 2%;
}

.aside-style{
  color: #faf7f7;
  margin-left: 10%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: block;
  margin-top: 5%;
}

.main{
  width: 100%;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
}

.footer{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 2px;
  width: 60%;
  margin-top: 2%;
  margin-left: 20%;
}
.el-main{
  font-size: 1rem;
  height:calc(100vh - 300px); 
  overflow-y: auto; 
  padding: 0px;
  margin: 0px;
}

.el-main::-webkit-scrollbar {
  display: none;
}

.talk{
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.talkrow {
   line-height: 40px;
   margin-left: 20%;
   padding: 20px;
}
.answercol {
   line-height: 30px;
}

.talk-question{
  border-bottom:1px solid #aeb1b1;
  border-top:1px solid #b9bbbb9b;
}
.talk-answer {
  background-color: #d5d8db;
  border-bottom:1px solid #aeb1b1;
  border-top:1px solid #b9bbbb9b;
}

#talks{
  height: 100%;
  width: 100%;
}
#talks > .el-main{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100%;
  width: 100%;
  padding: 0px;
}
</style>

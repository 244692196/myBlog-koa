<template>
  <div class="details">
    <h3>{{detail.title}}</h3>
    <div class="content" v-html="detail.text"></div>
    <el-button v-if="loginUser" type="primary" icon="el-icon-edit" circle class="btn-art" @click="edit"></el-button>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import {mapState} from "vuex"
export default {
  components:{
Nav
  },
  data() {
    return {
      detail: ""
    };
  },
  computed:{
    ...mapState(["loginUser"])
  },
  methods: {
    edit(){
      this.$router.push({path:`/edit/${this.$route.params.id}`})
    }
  },
  created() {
    this.$axios.get(`http://ddiyy.cn:3000/article/${this.$route.params.id}`).then(res => {
      this.detail = res.data;
    });
    this.screenH = window.screen.height;
  }
};
</script>

<style>
.details{
  width: 65%;
  min-height: 85%;
  padding:20px 60px 0;
  background-color: #fff;
  margin: auto;
  box-shadow: 0px 10px 20px #ccc;
}
.details h3 {
  width: 100%;
  height: 40px;
  font: 20px/2 "微软雅黑";
  font-weight: bold;
  text-align: center;
}
.btn-art {
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 40px;
}
.content{
  font: 16px/1.5 "微软雅黑"
}
</style>
<template>
  <div class="add">
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="detail.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" :rows="10" v-model="detail.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onChange">更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: ""
    };
  },
  methods: {
    onChange() {
      this.$axios.post("http://ddiyy.cn:3000/article/edit", { 
          newDetail:this.detail
          }).then((msg)=>{
            msg.data.code === 0 &&
              this.$message({
                showClose: true,
                message: "更改成功",
                type: "success"
              }) &&
              this.$router.push({ path: `/article/${this.$route.params.id}` });
          })
    
    }
  },
  created() {
    this.$axios.get(`http://ddiyy.cn:3000/article/${this.$route.params.id}`).then(res => {
      this.detail = res.data;
    });
  }
};
</script>
<style scoped>
.add {
  width: 700px;
  height: 350px;
  padding: 50px 50px;
  margin: 50px auto;
}
</style>
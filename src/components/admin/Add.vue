<template>
  <div class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文章标题">
        <el-input placeholder="请输入标题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        textarea: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.textarea && this.form.title) {
        this.$axios
          .post("http://ddiyy.cn:3000/article/add", {
            title: this.form.title,
            text: this.form.textarea,
            author: this.$store.state.loginUser
          })
          .then(msg => {
            msg.data.code === 0 &&
              this.$message({
                showClose: true,
                message: "发布成功",
                type: "success"
              }) &&
              this.$router.push({ path: "/" });
            msg.data.code === 1 &&
              this.$message({
                showClose: true,
                message: "请先登录",
                type: "error"
              });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请填写标题或内容",
          type: "error"
        });
      }
    }
  },
  // created() {
  //   this.$axios //获取当前登录用户id值
  //     .post("/api/userOne", { username: this.$store.state.loginUser })
  //     .then(res => {
  //       this.form.author = res.data;
  //     });
  // }
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
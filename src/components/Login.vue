<template>
  <div class="login">
    <h1 class="header">登录</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //所有校验规则都成立，触发
        if (valid) {
          this.$axios
            .post("http://ddiyy.cn:4000/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password
            })
            .then(msg => {
              if (msg.data.code === 2) {
                this.$message({
                  showClose: true,
                  message: "登录失败",
                  type: "error"
                });
              } else if (msg.data.code === 1) {
                this.$message({
                  showClose: true,
                  message: "该用户不存在",
                  type: "error"
                });
              } else if (msg.data.code === 3) {
                this.$message({
                  showClose: true,
                  message: "密码错误",
                  type: "error"
                });
              } else if (msg.data.code === 0) {
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success"
                });
                this.$router.push({ path: "/" });
                this.$store.commit("saveLogin", this.ruleForm.username);
                this.$store.commit("savePhoto", msg.data.data);
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push({ path: "/reg" });
    }
  }
};
</script>
<style scoped>
.login {
  width: 500px;
  height: 200px;
  margin: 150px auto;
  padding: 0 30px 50px 0;
  background-color: #fff;
  border-radius: 10px;
}

.header {
  width: 100%;
  height: 50px;
  font: 25px/50px "微软雅黑";
  text-align: center;
}
@media screen and (max-width: 600px) {
  .login {
    width: 90%;
  }
}
</style>
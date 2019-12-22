<template>
  <div class="card">
    <h2>我的名片</h2>
    <p>网名：肠肠鱼</p>
    <p>职业：Web前端工程师</p>
    <p>现居：天津市</p>
    <p>Email：244692196@qq.com</p>
    <p>个人爱好：健身</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.card {
  float: right;
  width: 33%;
  height: 320px;
  color: rgb(227, 227, 227);
  animation: move 15s linear infinite;
  border-radius: 10px;
  box-shadow: 0 0 10px #000;
}
@keyframes move {
  0% {
    background: url(../../../static/img/bg-6.jpg) no-repeat center/cover;
  }
  30% {
    background: url(../../../static/img/bg-6.jpg) no-repeat center/cover;
  }
  40% {
    background: url(../../../static/img/bg-2.jpg) no-repeat center/cover;
  }
  60% {
    background: url(../../../static/img/bg-2.jpg) no-repeat center/cover;
  }
  70% {
    background: url(../../../static/img/bg-3.jpg) no-repeat center/cover;
  }
  90% {
    background: url(../../../static/img/bg-3.jpg) no-repeat center/cover;
  }
  100% {
    background: url(../../../static/img/bg-6.jpg) no-repeat center/cover;
  }
}
.card h2 {
  width: 100%;
  height: 15%;
  font-family: "楷体";
  padding-top: 10px;
  text-indent: 20px;
}
.card p {
  font: 18px/1.5 "楷体";
  text-indent: 40px;
}
</style>
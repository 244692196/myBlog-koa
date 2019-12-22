<template>
  <div class="chat">
    <ul id="messages">
      <li v-for="(item,index) in msgList" :key="index">{{item}}</li>
    </ul>
    <form class="chat-form" action="javascript:;">
      <input id="m" autocomplete="off" v-model="msg" />
      <button @click="sendMsg">发送</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      msg: "",
      socket: "",
      msgList: []
    };
  },
  methods: {
    sendMsg() {
      this.$socket.emit('chat message"', this.msg);
      this.msg = "";
    }
  },
  sockets: {
    // connect() {
    //   this.id = this.$socket.id;

    //   this.$socket.emit("chat message", loginId); //监听connect事件
    // },

    message(data) {
      //监听message事件，方法是后台定义和提供的

      console.log(data);
    }
  },
  mounted() {
    this.sockets.subscribe("chat message", data => {
      console.log(data);
    });
    // this.$socket.on("chat message", msg => {
    //   this.msgList.push(msg);
    //   console.log(this.msgList);
    // });
  }
};
</script>

<style>
.chat-form {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.chat-form input {
  border: 0;
  padding: 10px;
  width: 85%;
}

.chat-form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages li {
  padding: 5px 10px;
}

#messages li:nth-child(odd) {
  background: #eee;
}
</style>
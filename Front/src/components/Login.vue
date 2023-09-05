<template>
  <div class="flex justify-center bg-[#39B4E7] p-20 gap-8">
    <input 
      class="p-2 w-72 h-14 rounded" 
      type="email" 
      placeholder="Email"
      v-model="loginData.email"
      name="email"
      id="email"
      required
      />
    <input 
      class="p-2 w-72 h-14 rounded" 
      type="password" 
      placeholder="Senha"
      v-model="loginData.password"
      name="password"
      id="password"
      required
      />
    <button @click="postLoginMethod();" class="w-32 h-14 rounded border-2 border-white text-white">Entrar</button>
    <button  @click="goToRegister();" class="w-32 h-14 rounded border-2 border-white text-white">Cadastrar</button>
  </div>
</template>
  
<script>
  import axios from "axios";
  import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {

  name: 'LoginComponent',
  data(){
    return{
      loginData:{
        email:"",
        password:"",
      }
    };
  },
  methods: {
    notifyError(msg){
      toast.error(msg, {
            autoClose: 1000,
          });
    },
    postLoginMethod() {
      console.log("entrou");
      axios.post("http://localhost:3001/user/login", this.loginData).then((res) => {
          console.log(res.data);
          console.log(res);
          localStorage.setItem('access_token', res.data.token)
          localStorage.setItem('userId', res.data.user.id)
          if(res.status === 200) {
            this.$router.push('/project')
          } else {
            console.log(res.data.error)
          }

        })
        .catch((error) => {
          this.notifyError(error.response.data.error)
        });
    },
    goToRegister(){
      this.$router.push('/register')
    }
  }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
  
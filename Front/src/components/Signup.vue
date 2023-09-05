<template>
  <div class="flex justify-center bg-[#39B4E7] p-20 gap-8">
    <input class="p-2 w-72 h-14 rounded" type="string" placeholder="Nome de usuario" v-model="signupData.username"
      name="username" id="username" required />
    <input class="p-2 w-72 h-14 rounded" type="email" placeholder="Email" v-model="signupData.email" name="email"
      id="email" required />
    <input class="p-2 w-72 h-14 rounded" type="string" placeholder="Nome do projeto" v-model="signupData.projectName"
      name="projectName" id="projectName" required />
    <input class="p-2 w-72 h-14 rounded" type="password" placeholder="Senha" v-model="signupData.password" name="password"
      id="password" required />
    <button @click="postSignupMethod();" class="w-32 h-14 rounded border-2 border-white text-white">Criar conta</button>
    <button @click="goToHome();" class="w-32 h-14 rounded border-2 border-white text-white">Voltar</button>
  </div>
</template>
    
<script>
import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {

  name: 'SignupComponent',
  data() {
    return {
      signupData: {
        username: "",
        email: "",
        password: "",
        projectName: ""
      }
    };
  },
  methods: {
    notifyError(msg){
      toast.error(msg, {
            autoClose: 1000,
          });
    },

    postSignupMethod() {
      axios.post("http://localhost:3001/user/signup", this.signupData).then((res) => {
        console.log(res.data);
        console.log(res);
        if (res.status === 200) {
          this.$router.push('/')
        }
        

      })
        .catch((error) => {
          this.notifyError(error.response.data.error)
        });
    },
    goToHome() {
      this.$router.push('/')
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
    
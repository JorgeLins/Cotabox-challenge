<template>
  <div class="flex justify-center bg-[#39B4E7] p-20 gap-8">
    <input 
      class="p-2 w-72 h-14 rounded" 
      type="string" 
      placeholder="Nome"
      v-model="participantsData.firstName"
      name="firstName"
      id="firstName"
      required
      />
    <input 
      class="p-2 w-72 h-14 rounded" 
      type="string" 
      placeholder="Sobrenome"
      v-model="participantsData.lastName"
      name="lastName"
      id="lastName"
      required
      />
      <input 
      class="p-2 w-72 h-14 rounded" 
      type="number" 
      placeholder="Participação(%)"
      v-model="participantsData.participation"
      name="participation"
      id="participation"
      required
      />
    <button @click="createParticipant();" class="w-32 h-14 rounded border-2 border-white text-white">Cadastrar</button>
    <button @click="logout();" class="w-32 h-14 rounded border-2 border-white text-white">Sair</button>
  </div>
</template>

<script>

import axios from "axios";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'HeaderComponent',
  data() {
    return {

      token:"",
      participantsData: {
        firstName: "",
        lastName: "",
        participation: null,
        ownerId: localStorage.getItem('userId')
      }
    }
  },
  mounted() {
        this.token = localStorage.getItem('access_token')
        this.ownerId = localStorage.getItem('userId')
        console.log(this.ownerId)
    },
  methods: {
    notifyError(msg){
      toast.error(msg, {
            autoClose: 1000,
          });
    },
    createParticipant() {

      axios.post("http://localhost:3001/participant", this.participantsData, {headers: {Authorization: `Bearer ${this.token}`}}).then((res) => {
          console.log(res.data);
          console.log(res);
          if(res.status === 200) {
            window.location.reload()
          } else {
            console.log(res.data.error)
          }

        })
        .catch((error) => {
          this.notifyError(error.response.data.error)
        });
    },
    logout(){
      axios.post("http://localhost:3001/user/logout").then((res) => {
        if(res.data.sucess === true){
          localStorage.clear('access_token')
          localStorage.clear('userId')
          this.$router.push('/')
        }
      })
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
}</style>

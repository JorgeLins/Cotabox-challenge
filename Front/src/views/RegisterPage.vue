<template>
    <div>
      <SignupComponent/>
      <div class="flex flex-col items-center justify-center p-20">
        <img :src="require('@/assets/Logotipo_cotabox_SemFundo.png')" width="720" height="720" alt="">
        <h1 class="text-xl font-bold">Desafio full stack da Cotabox feito por <a class="text-[#39B4E7]" href="https://github.com/JorgeLins">Jorge Lins</a></h1>

      </div>
    </div>
  </template>
  
  <script>
  import SignupComponent from '../components/Signup.vue'
  
  export default {
    name: 'RegisterPage',
    components: {
      SignupComponent
    }
  }
  </script>
  
  <style>
  </style>
  
<template>
  <div class="flex justify-center bg-[#38bdf8] p-20 gap-8">
      <input class="p-2 w-72 h-14 rounded" type="text" placeholder="First Name">  
      <input class="p-2 w-72 h-14 rounded" type="text" placeholder="Last Name">
      <input class="p-2 w-72 h-14 rounded" type="text" placeholder="Participation(%)">
      <button class="w-32 h-14 rounded border-2 border-white text-white">Send</button>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    msg: String
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

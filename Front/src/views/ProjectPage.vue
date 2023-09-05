<template>
    <div>
        <HeaderComponent />
        <div class="flex flex-col items-center p-3">
            <h1 class="text-6xl font-bold">{{ this.projectName }}</h1>
            <h1 class="text-xl font-bold">Aqui será listado os participantes desse projeto e sua distribuição de participação</h1>
            <div v-if="allParticipants.length > 0" class="flex gap-96 items-center ">
                <div>
                    <div class="flex flex-col h-auto border-2 rounded-b-md rounded-t-md border-black ">
                        <div class="flex items-left border-y-2 border-black ">
                            <h1 class="border-x-2 border-black w-16"></h1>
                            <h1 class="border-x-2 border-black w-36">Nome</h1>
                            <h1 class="border-x-2 border-black w-36">Sobrenome</h1>
                            <h1 class="border-x-2 border-black w-36">Participação(%)</h1>
                            <h1 class="border-x-2 border-black w-28"></h1>
                        </div>
                        <div class="flex border-y-2  border-black" v-for="(obj, index) in allParticipants" :key="obj.id">
                            <h1 class="border-x-2 border-black w-16">{{ index + 1 }}</h1>
                            <h1 class="border-x-2 border-black w-36">{{ obj.firstName }}</h1>
                            <h1 class="border-x-2 border-black w-36">{{ obj.lastName }}</h1>
                            <h1 class="border-x-2 border-black w-36">{{ obj.participation }}%</h1>
                            <button v-on:click="this.deleteMethod(obj.id)" class="border-x-2 border-black w-28">Deletar</button>
                        </div>
                    </div>

                </div>
                <div>
                    <ChartComponent></ChartComponent>
                </div>
            </div>
            <div v-else>
                <h1 class="text-xl font-bold">Nenhum participante cadastrado ainda</h1>
            </div>
        </div>
    </div>
</template>

<script>

import HeaderComponent from '../components/Header.vue'
import axios from "axios";
import ChartComponent from '../components/ChartComponent.vue';

export default {
    name: 'ProjectPage',
    components: {
        HeaderComponent,
        ChartComponent
    },
    data() {
        return {
            id: "",

            projectName: "",
            allParticipants: [{}],
        }

    },
    mounted() {
        this.id = localStorage.getItem('userId')
        console.log(this.id)
        this.getProjectName()
        this.getAllParticipants()

    },
    methods: {

        getProjectName() {
            axios
                .get(`http://localhost:3001/user/${this.id}`)
                .then((res) => {
                    console.log(res.data.projectName);
                    this.projectName = res.data.projectName;
                    console.log(this.projectName);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getAllParticipants() {
            axios
                .get(`http://localhost:3001/participant/${this.id}`)
                .then((res) => {
                    console.log(res.data);
                    this.allParticipants = res.data
                    if(res.status == 200){
                        this.getAllParticipants()
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        deleteMethod(id){
        axios.delete(`http://localhost:3001/participant/${id}`).then((res) => {
            if(res.status === 200){
                this.getAllParticipants()
            }
        })
        window.location.reload()
    }

    },
}
</script>

<style lang="scss" scoped></style>
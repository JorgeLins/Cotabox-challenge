<template>
    <div id="data-chart">
        <Doughnut ref="chart" width="480" height="480" id="my-chart-id" :data="chartData" :key="chartKey" />
    </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import axios from "axios";


ChartJS.register(ArcElement, Tooltip, Legend)
ChartJS.defaults.plugins.legend.position = 'right'

export default {
    name: "ChartComponent",
    components: {
        Doughnut
    },
    data() {
        return {
            id: "",
            participants: [],
            chartKey: 0,
            chartData: {
                labels: [],
                datasets: [{
                    backgroundColor: [],
                    data: []
                }]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    computed: {
        totalNumOfParticipations() {
            let sum = 0

            if (this.participants.length > 0) {
                this.participants.forEach((participant) => {
                    sum += participant.participation
                })
            }

            return sum
        }
    },
    watch: {
        chartData: {
            handler() {
                this.chartKey += 1
            },
            deep: true
        },
        participants: {
            handler() {
                this.updateChartData(this.participants)
            },
            deep: true
        }
    },
    mounted() {
        this.id = localStorage.getItem('userId')
        console.log(this.id)
        this.getAllParticipants()

    },
    methods: {
        randomHexColor() {
        const color = Math.floor(Math.random() * 16777215).toString(16)
        return `#${'0'.repeat(6 - color.length)}${color.toUpperCase()}`
      },
        updateChartData(participants) {
            this.chartData.labels = participants.map(
                (participant) => `${participant.firstName} ${participant.lastName}`
            )

            this.chartData.datasets[0].data = participants.map((participant) => participant.participation)
        },
    async getAllParticipants() {
       await axios
            .get(`https://cotabox-back.onrender.com/participant/${this.id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    this.updateChartData(res.data)
                    this.participants = res.data
                    res.data.forEach(() => {
                        this.chartData.datasets[0].backgroundColor.push(this.randomHexColor())
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    },
}

}
</script>

<style></style>
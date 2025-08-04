<template>
  <div class="chart-container">
    <div id="chart1"></div>
    <div id="chart2"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Highcharts from 'highcharts'

onMounted(() => {
  //Gera os gráficos modelo
  Highcharts.chart('chart1', {
    chart: { type: 'pie' },
    title: { text: 'Horários de Login' },
    series: [
      {
        name: 'Usuários',
        colorByPoint: true,
        data: [
          { name: '00:00-06:00', y: 8 },
          { name: '06:00-12:00', y: 25 },
          { name: '12:00-18:00', y: 43 },
          { name: '18:00-00:00', y: 12 },
        ],
      },
    ],
  })

  Highcharts.chart('chart2', {
    chart: { type: 'column' },
    title: { text: 'Tipos de Usuários' },
    xAxis: { categories: ['Administradores', 'Usuários Padrão', 'Convidados'] },
    yAxis: { title: { text: 'Número de Usuários' } },
    series: [
      { name: '2024', data: [5, 16, 12] },
      { name: '2025', data: [6, 14, 19] },
    ],
  })
})

//Congifura os visuais dos gráficos

Highcharts.setOptions({
  chart: {
    backgroundColor: '#121212',
    style: {
      color: '#ffffff',
    },
  },
  title: {
    style: {
      color: '#ffffff',
      fontSize: '16px',
    },
  },
  subtitle: {
    style: {
      color: '#cccccc',
    },
  },
  xAxis: {
    gridLineColor: '#444444',
    labels: {
      style: {
        color: '#ffffff',
      },
    },
    lineColor: '#888888',
    minorGridLineColor: '#444444',
    tickColor: '#888888',
    title: {
      style: {
        color: '#ffffff',
      },
    },
  },
  yAxis: {
    gridLineColor: '#444444',
    labels: {
      style: {
        color: '#ffffff',
      },
    },
    lineColor: '#888888',
    minorGridLineColor: '#444444',
    tickColor: '#888888',
    tickWidth: 1,
    title: {
      style: {
        color: '#ffffff',
      },
    },
  },
  tooltip: {
    backgroundColor: '#222222',
    style: {
      color: '#ffffff',
    },
  },
  legend: {
    itemStyle: {
      color: '#ffffff',
    },
    itemHoverStyle: {
      color: '#cccccc',
    },
  },
})
</script>

<style scoped>
.chart-container {
  height: inherit;
  overflow-y: auto;
}
</style>

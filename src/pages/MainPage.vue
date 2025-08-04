<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <div class="title-area text-white q-ml-sm text-center">Gerenciador de Usuários</div>
        <div class="q-pa-md q-ma-sm border-box">
          <UserManager />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="title-area text-white q-ml-sm text-center">Dashboard</div>
        <div class="q-pa-md q-ma-sm border-box">
          <pie-chart />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import UserManager from 'src/components/UserManager.vue'
import PieChart from 'src/components/MultiCharts.vue'
</script>

<style scoped>
.border-box {
  height: calc(100vh - 130px);
  border: 0.5px solid gray;
  border-radius: 50px;
  background-color: transparent;
  overflow: hidden;
}
.title-area {
  font-size: 24px;
}
</style>

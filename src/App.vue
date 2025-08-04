<template>
  <router-view />
</template>

<script setup>
import { useSetSession } from 'stores/session'

//Importa a sessão guardada localmente
const session = useSetSession()
session.restoreSession()
</script>

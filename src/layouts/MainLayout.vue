<template>
  <q-layout view="lHh Lpr lFf">
     <!-- Barra de Navegação -->
    <q-header elevated>
      <q-toolbar class="top-navbar">

        <!-- Texto -->
        <q-toolbar-title>
          Olá, {{ username }}
        </q-toolbar-title>

        <!-- Logout -->
        <LogoutButton />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LogoutButton from 'src/components/LogoutButton.vue';
import { useSetSession } from 'src/stores/session';

const setSession = useSetSession()
const username = setSession.loggedData?.first_name

</script>

<style>
.top-navbar{
  background-color: black;
  border-bottom: 1px solid gray;
}
</style>

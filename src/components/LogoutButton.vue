<template>
  <q-btn
    label="Logout"
    icon="logout"
    @click= "logout"
    color="white"
    text-color="black"
    class="q-mx-sm"
    unelevated
    rounded
  />
</template>

<script setup>
import { useSetSession } from 'src/stores/session';

const setSession = useSetSession()

function logout () {
  setSession.logout()
}
</script>

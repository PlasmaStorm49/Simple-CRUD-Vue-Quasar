<template>
  <q-page class="flex flex-center text-white">
    <q-form @submit.prevent="onSubmit">
      <q-card class="q-pa-lg rounded-borders main-card">
        <q-card-section>
          <div class="text-h5 login-text">Gerenciador de Usuários</div>
        </q-card-section>

        <q-card-section>
          <q-input
            filled
            v-model="email"
            label="E-mail"
            type="email"
            :rules="[(val) => !!val || 'Este campo é necessário']"
            class="rounded-borders input-area"
          />
        </q-card-section>

        <q-card-actions>
          <q-btn
            :disable="isCooldown"
            :loading="isCooldown"
            label="Login"
            type="submit"
            class="full-width q-pa-sm rounded-borders login-button"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<script setup>
import { useSetSession } from 'stores/session'
import { Notify } from 'quasar'
import { ref } from 'vue'

const email = ref('')
const setSession = useSetSession()
const isCooldown = ref(false)

const onSubmit = async () => {
  //Verificação de login com incluindo um timer para impedir que o usuário faça muitas requests a API em um tempo muito curto
  if (isCooldown.value) return
  isCooldown.value = true

  try {
    const tryLogin = await setSession.login(email.value)
    if (!tryLogin) {
      setTimeout(() => {
        isCooldown.value = false
        Notify.create({
          type: 'info',
          message: 'E-mail Inválido',
          position: 'top',
          timeout: 1000,
          color: 'white',
          textColor: 'black',
          icon: 'warning',
        })
      }, 1000)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped>
.login-text {
  text-align: center;
  margin-bottom: 20px;
}
.main-card {
  width: 400px;
  max-width: 90vw;
}
.rounded-borders {
  border-radius: 20px;
}
.login-button {
  color: black;
  background-color: white;
}
</style>

<template>
  <div class="flex justify-center">
    <!-- Botão de Adicionar Usuário-->
    <q-btn
      label="+ CRIAR UM USUÁRIO"
      color="white"
      text-color="black"
      class="create-button"
      unelevated
      rounded
      @click="showCreateUser()"
    >
    </q-btn>
  </div>

  <!-- Lista com os Cartões-->
  <div class="userlist-container">
    <q-card
      class="q-pa-sm q-ma-md user-card row items-center justify-between no-wrap"
      v-for="user in users"
      :key="user.id"
    >
      <q-card-section class="card-wrapper">
        <div v-if="!user.isEditing">
          <div class="user-info text-caption q-mb-xs" filled dense>ID: {{ user.id }}</div>
          <div class="user-info text-caption q-mb-xs" filled dense>
            Nome: {{ user.first_name }} {{ user.last_name }}
          </div>
          <div class="user-info text-caption q-mb-xs" filled dense>E-mail: {{ user.email }}</div>
        </div>
        <!-- Formulário de Edição de Usuário-->
        <div v-else>
          <q-form @submit.prevent="saveUser(user)">
            <q-input
              v-model="user.email"
              type="email"
              label="E-mail"
              filled
              dense
              :rules="[(val) => !!val || 'Preencha o E-mail']"
            />
            <q-input
              v-model="user.first_name"
              label="Primeiro Nome"
              filled
              dense
              :rules="[(val) => !!val || 'Preencha o  Primeiro Nome']"
            />
            <q-input
              v-model="user.last_name"
              label="Último Nome"
              filled
              dense
              :rules="[(val) => !!val || 'Preencha o Último Nome']"
            />
            <q-btn label="Salvar" class="q-ma-sm" type="submit" color="positive" />
            <q-btn label="Cancelar" class="q-ma-sm" @click="cancelEdit(user)" />
          </q-form>
        </div>
      </q-card-section>

      <!-- Botões na Lateral dos Cartões-->
      <q-card-actions>
        <div v-if="!user.isEditing" class="column q-ml-sm">
          <q-btn
            icon="edit"
            color="grey-8"
            class="q-mb-xs"
            dense
            flat
            round
            @click="editUser(user)"
          />
          <q-btn
            icon="delete"
            color="grey-8"
            class="q-mb-xs"
            dense
            flat
            round
            @click="confirmDelete(user)"
          />
        </div>
      </q-card-actions>
    </q-card>

    <!-- Pop Up de Deletar Usuário-->
    <q-dialog v-model="showConfirm" @hide="deletedUserId = null">
      <q-card>
        <q-card-section class="text-h6">Tem certeza que deseja excluir?</q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" v-close-popup />
          <q-btn label="Apagar" color="negative" @click="deleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  <!-- Pop Up de Criar Usuário-->
  <q-dialog v-model="isVisibleCreateUser" @hide="createForm = {}">
    <q-card class="create-user-card q-pa-lg q-mx-auto">
      <q-card-section class="text-h6 text-center">Criar um usuário</q-card-section>
      <q-form @submit.prevent="createUser" class="column q-gutter-md">
        <q-input
          v-model="createForm.first_name"
          label="Primeiro Nome"
          type="text"
          filled
          :rules="[(val) => !!val || 'Preencha o Primeiro Nome']"
        />
        <q-input
          v-model="createForm.last_name"
          label="Último Nome"
          type="text"
          filled
          :rules="[(val) => !!val || 'Preencha o Último Nome']"
        />
        <q-input
          v-model="createForm.email"
          label="E-mail"
          type="email"
          filled
          :rules="[(val) => !!val || 'Preencha o E-mail']"
        />
        <div class="row justify-between q-pt-sm">
          <q-btn label="Criar" type="submit" color="positive" />
          <q-btn label="Cancelar" v-close-popup />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'

const users = ref([])
const lastSavedUsers = ref([])
const createForm = ref({})
const showConfirm = ref(false)
const deletedUserId = ref(null)
const isVisibleCreateUser = ref(false)

onMounted(async () => {
  try {
    const response = await api.get('/users')
    users.value = response.data.data.map((user) => ({
      ...user,
      isEditing: false,
    }))
    lastSavedUsers.value = response.data.data
  } catch (err) {
    console.log(err)
  }
})

function editUser(user) {
  user.isEditing = true
}

function cancelEdit(user) {
  const currentUser = lastSavedUsers.value.find((u) => u.id === user.id)
  if (currentUser) {
    Object.assign(user, currentUser)
  }
  user.isEditing = false
}

function saveUser(user) {
  const currentUser = lastSavedUsers.value.find((u) => u.id === user.id)
  if (currentUser) {
    Object.assign(currentUser, user)
  }
  user.isEditing = false
}

function deleteUser() {
  users.value = users.value.filter((u) => u.id !== deletedUserId.value)
  showConfirm.value = false
}

function confirmDelete(user) {
  deletedUserId.value = user.id
  showConfirm.value = true
}

function showCreateUser() {
  isVisibleCreateUser.value = true
}

function createUniqueId() {
  const ids = new Set(users.value.map((u) => u.id))

  let newId
  do {
    newId = Math.floor(Math.random() * 10000)
  } while (ids.has(newId))

  return newId
}

function createUser() {
  users.value.push({
    id: createUniqueId(),
    first_name: createForm.value.first_name,
    last_name: createForm.value.last_name,
    email: createForm.value.email,
    avatar: '',
    isEditing: false,
  })
  isVisibleCreateUser.value = false
}
</script>

<style scoped>
.card-wrapper {
  flex: 1;
}

.create-button {
  width: 80%;
}

.create-user-card {
  width: 400px;
  border-radius: 16px;
  color: white;
}

.user-card {
  border-radius: 12px;
  border: 1px solid white;
  background-color: transparent;
  transition: border-color 0.3s;
}

.user-card:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.user-info {
  font-size: 16px;
  word-break: break-word;
  white-space: normal;
  max-width: 100%;
}

.userlist-container {
  height: inherit;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 8px;
  padding-bottom: 36px;
}
</style>

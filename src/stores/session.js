import { defineStore, acceptHMRUpdate } from 'pinia'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { ref } from 'vue'

export const useSetSession = defineStore('session', () => {
  const isLoggedIn = ref(false)
  const loggedData = ref(null)
  const router = useRouter()

  //Função de login no front-end apenas para funcionalidade, para um login funcional, criar um request na API
  const restoreSession = () => {
    const localSavedUser = localStorage.getItem('loggedUser')
    if (localSavedUser) {
      console.log(JSON.parse(localSavedUser))
      loggedData.value = JSON.parse(localSavedUser)
      isLoggedIn.value = true
    }
  }

  const login = async (email) => {
    const userList = ref(null)
    const userData = ref(null)

    try {
      const response = await api.get('/users')
      userList.value = response.data.data
    } catch (err) {
      console.log(err)
      return false
    }

    userData.value = userList.value.find((u) => u.email === email)

    if (userData.value) {
      isLoggedIn.value = true
      loggedData.value = userData.value
      localStorage.setItem('loggedUser', JSON.stringify(userData.value))
      router.push('/')
      return true
    } else {
      return false
    }
  }

  const logout = () => {
    isLoggedIn.value = false
    loggedData.value = null
    localStorage.removeItem('loggedUser')
    router.push('/login')
  }

  return {
    isLoggedIn,
    loggedData,
    restoreSession,
    login,
    logout,
  }
})

//Atualiza o código parcialmente no caso de alteração
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetSession, import.meta.hot))
}

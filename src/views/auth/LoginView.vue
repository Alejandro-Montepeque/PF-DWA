<template>
  <div class="text-center mt-5">
    <h1>Login Simulado</h1>
    <button @click="loginUser" class="btn btn-primary mt-3">Iniciar Sesión</button>
  </div>
</template>

<script setup>
// import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function loginUser() {
  authStore.login()
  router.push({ name: 'Home' })
}
</script>

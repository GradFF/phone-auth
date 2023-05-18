<template>
  <div v-if="user">
    <h1>Welcome {{ user?.uid }}</h1>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <h1>Welcome {{ user }}</h1>
    <form @submit.prevent="loginWithPhoneNumber(number)">
      <input
        type="number"
        name="phone"
        id="phone"
        placeholder="+055 999999999"
        v-model="number"
      />
      <div id="recaptcha-container"></div>
      <button type="submit">Enviar</button>
    </form>
    <br />
    <hr />
    <br />
    <form @submit.prevent="verificationCode(code)">
      <input
        type="number"
        name="verificationCode"
        id="phone"
        placeholder="Enter verification codde"
        v-model="code"
      />
      <button type="submit">Confirm</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from './firebase'

const { user, loginWithPhoneNumber, verificationCode, logout } = useAuth()

const number = ref('')
const code = ref('')
</script>

<style lang="scss" scoped></style>

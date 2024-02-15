// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userAuthentication = defineStore('aunthentication', {
    state: () => ({
      isLoggedIn : false,
      token : ''
    })
  })
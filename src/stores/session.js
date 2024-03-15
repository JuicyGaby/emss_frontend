// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const userAuthentication = defineStore('aunthentication', {
    state: () => ({
      isLoggedIn : false,
      token : '',
      access_rights : {}
    }),
    actions: {
      setUserToken(token) {
        this.token = token
      },
      toggleLogIn(status) {
        this.isLoggedIn = status
      },
      setAccessRights(rights) {
        this.access_rights = rights
      },
      resetSession() {
        this.isLoggedIn = false
        this.token = ''
        this.access_rights = {}
      }
    },
    persist: true,
  })
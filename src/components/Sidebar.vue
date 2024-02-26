<template>
    <v-card class="">
      <v-layout>
        <v-navigation-drawer width="350"
        >
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg"
              :title="userFullName"
              :subtitle="props.user.email"
            ></v-list-item>
          </v-list>
  
          <v-divider></v-divider>
          <v-list density="default" nav>
            <v-list-item prepend-icon="mdi-home" to="/" title="Home" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" to="/about" title="Shared with me" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" to="/form" title="Starred" value="starred"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" to="" title="Log-out" value="log-out" @click="signOut()"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main class="sidebar"></v-main>
      </v-layout>
    </v-card>
  </template>
<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
    user: Object,
    authentication: Object
})
const router = useRouter();


const userFullName = computed(() => {
    return `${props.user.fname} ${props.user.lname}`
})

const signOut = () => {
    const isLoggedIn = false
    props.authentication.toggleLogIn(isLoggedIn);
    props.authentication.setUserToken('');
    router.push("/login");

}
</script>
<style lang="css" scoped>
    .sidebar {
        width: 200px;
        height: 100vh;
    }
</style>
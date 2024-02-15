<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { userAuthentication } from "./stores/session";

onMounted(() => {
  checkUserSession();
});

const authentication = userAuthentication()
const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  const router = useRouter();

  console.log('token' + authentication.token);
  if (!isLoggedIn) {
    router.push('/login');

  }

}


</script>

<style>
.red {
  border: 1px dashed red;
}
.blue {
  border: 1px dashed blue;
}
</style>
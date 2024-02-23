<template>
  <v-app>
    <v-main class="d-flex app-main">
      <sidebar :user="user" :authentication = "authentication" v-if="authentication.isLoggedIn" class="theSideBar"></sidebar>
      <router-view :user="user" :authentication = "authentication" class="display rb"/>
    </v-main>
  </v-app>
</template>

<script setup>

import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { userAuthentication } from "./stores/session";
import { getUserByToken } from "@/api/authentication";

// * components 
import Sidebar from './components/Sidebar.vue'


let user = ref({});
const router = useRouter();
const authentication = userAuthentication();
onMounted(async () => {
  checkUserSession();
  user.value = await getUserByToken(authentication.token);
});


const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  if (!isLoggedIn) {
    router.push("/login");
  }
};
</script>


<style scoped>
/* debug style classes */
.rb {
  border: 1px dashed red;
}
.bb {
  border: 1px dashed blue;
}
.gb {
  border: 1px dashed green;
}

.app-main {
  height: 100vh;
  width: 100%;
}
.display {
  width: 100%;
  padding: 1em;
}
</style>
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

// * components 
import Sidebar from './components/Sidebar.vue'


onMounted(() => {
  checkUserSession();
  getUserByToken();
});

let user = ref({});
const router = useRouter();
const authentication = userAuthentication();
// methods


const getUserByToken = async () => {
  // returns if does not have token
  const token = authentication.token
  if (!token) return


  const API_URL = "http://localhost:3000/userByToken"
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "authorization": token
    }
  });
  const data = await response.json()
  if (data.error) {
    console.error(error);
    return
  }
  user.value = data
};

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
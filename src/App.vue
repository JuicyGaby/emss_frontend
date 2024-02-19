<template>
  <v-app>
    <v-main class="d-flex app-main">
      <sidebar :user="user" :authentication = "authentication" v-if="authentication.isLoggedIn" class="theSideBar"></sidebar>
      <router-view :user="user" :authentication = "authentication" class="display"/>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount} from "vue";
import { useRouter } from "vue-router";
import { userAuthentication } from "./stores/session";

// * components 
import Sidebar from './components/Sidebar.vue'


onMounted(() => {
  checkUserSession();
  getUserByToken();
});

let user = ref({});
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
  console.log(user);
};

const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  const router = useRouter();
  if (!isLoggedIn) {
    router.push("/login");
    return
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
.theSideBar {
}
.display {
  width: 100%;
}
</style>
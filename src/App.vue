<template>
  <v-app>
    <v-main>
      <logout-btn :user="user" :authentication = "authentication" v-if="authentication.isLoggedIn"></logout-btn>
      <router-view :user="user" :authentication = "authentication"/>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount} from "vue";
import { useRouter } from "vue-router";
import { userAuthentication } from "./stores/session";

// * components 
import logoutBtn from './components/Logout.vue'


onMounted(() => {
  checkUserSession();
  getUserByToken();
});

let user = ref({});
const authentication = userAuthentication();
// methods



const getUserByToken = async () => {
  const token = authentication.token
  if (!token) return
  const response = await fetch("http://172.16.1.39:3014/api/get_user", {
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
  user.value = data.user
  console.log(user);
};
const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  const router = useRouter();
  // console.log("token" + authentication.token);
  if (!isLoggedIn) {
    router.push("/login");
    return
  }
  router.push("/");
};
</script>




<style>
.rb {
  border: 1px dashed red;
}
.bb {
  border: 1px dashed blue;
}
.gb {
  border: 1px dashed green;
}
</style>
<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userAuthentication } from "./stores/session";

onMounted(() => {
  // checkUserSession();
});

const authentication = userAuthentication();
// methods

const getUserByToken = async () => {
  const body = {
    token: authentication.token,
  }
  const response = await fetch("http://172.16.2.30:3014/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json()
  
};
const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  const router = useRouter();

  console.log("token" + authentication.token);
  if (!isLoggedIn) {
    router.push("/login");
  }
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
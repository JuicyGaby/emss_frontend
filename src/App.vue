<template>
  <v-app>
    <v-main class="d-flex" style="width: 100%">
      <sidebar v-if="authentication.isLoggedIn"></sidebar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { userAuthentication } from "./stores/session";
import { getUserByToken } from "@/api/authentication";

// * components
import Sidebar from "./components/Sidebar.vue";
let user = ref({});
const router = useRouter();
const authentication = userAuthentication();
watch(
  () => authentication.token,
  async (newToken) => {
    if (newToken) {
      try {
        user.value = await getUserByToken(newToken);
      } catch (error) {
        console.error("Failed to get user by token:", error);
      }
    }
  },
  { immediate: true }
);
function checkUserSession() {
  const isLoggedIn = authentication.isLoggedIn;
  if (!isLoggedIn) {
    router.push("/login");
  }
}
onMounted(() => {
  checkUserSession();
});
</script>
<style scoped>
.app-main {
  width: 100%;
}
.red-border {
  border: 1px solid red;
}
/* create a class for sticky */
</style>

<template>
  <v-app>
    <v-main class="d-flex app-main">
      <sidebar
        v-if="authentication.isLoggedIn"
        class=""
      ></sidebar>
      <router-view
        :user="user"
        :authentication="authentication"
        class="display rb"
      />
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

onMounted(checkUserSession);

function checkUserSession() {
  const isLoggedIn = authentication.isLoggedIn;
  if (!isLoggedIn) {
    router.push("/login");
  }
}
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
  width: 100%;
}
/* create a class for sticky */
.display {
  /* position: absolute; */
  /* padding-left: 21.5em; */
  width: 100%;
}
</style>

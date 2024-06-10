<template>
  <v-card class="">
    <v-layout>
      <v-navigation-drawer width="350">
        <v-list>
          <v-list-item class="">
            <v-list-item-title class="d-flex align-center ga-2">
              <v-avatar variant="elevated" size="large">
                <v-img :alt="userFullName" :src="userAvatar"></v-img>
              </v-avatar>
              {{ userFullName }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, key) in navItems"
            :prepend-icon="item.icon"
            :key="key"
            :to="item.to"
            :title="item.title"
            :value="item.title"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            to=""
            title="Log-out"
            value="log-out"
            @click="signOut()"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="sidebar"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userAuthentication } from "../stores/session";

const authentication = userAuthentication();
const router = useRouter();
const navItems = {
  dashboard: {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    to: "/",
  },
  dailyActivityReport: {
    icon: "mdi-file-document",
    title: "Daily Activity Report",
    to: "/dar",
  },
  patients: {
    icon: "mdi-account-group",
    title: "Assessment Tool",
    to: "/patients",
  },
};
const userFullName = computed(() => {
  return `${authentication.user.fname} ${authentication.user.lname}`;
});
const userAvatar = `https://api.dicebear.com/8.x/initials/svg?seed=${userFullName.value}`;

onMounted(() => {
  console.log(userFullName.value);
});
const signOut = () => {
  authentication.resetSession();
  router.push("/login");
};
</script>
<style lang="css" scoped>
.sidebar {
  min-width: 200px;
  height: 100vh;
  /* position: fixed */
}
.sticky {
  position: fixed;
  z-index: 100;
}
</style>

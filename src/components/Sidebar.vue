<template>
  <v-card class="">
    <v-layout>
      <v-navigation-drawer width="350">
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/1.jpg"
            :title="userFullName"
            :subtitle="
              props.user.department
                ? props.user.department.dept_code
                : 'No Department'
            "
          ></v-list-item>
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
import { defineProps, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from 'pinia';
import { userAuthentication } from "../stores/session";

onMounted(() => {
  console.log(user.fname);
});
const { user } = userAuthentication();

const props = defineProps({
  user: Object,
  authentication: Object,
});
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
    to: "/daily-activity-report",
  },
  patients: {
    icon: "mdi-account-group",
    title: "Patients",
    to: "/patients",
  },
};

const userFullName = computed(() => {
  return `${user.fname} ${user.lname}`;
});


const signOut = () => {
  props.authentication.resetSession();
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

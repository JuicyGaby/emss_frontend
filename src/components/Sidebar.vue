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
import { defineProps, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { employeeRights } from "@/api/authentication";

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
  shared: {
    icon: "mdi-account-multiple",
    title: "Shared",
    to: "/about",
  },
  patients: {
    icon: "mdi-account-group",
    title: "Patients",
    to: "/patients",
  },
};

const userFullName = computed(() => {
  return `${props.user.fname} ${props.user.lname}`;
});

const signOut = () => {
  const isLoggedIn = false;
  props.authentication.toggleLogIn(isLoggedIn);
  props.authentication.setUserToken("");
  props.authentication.setAccessRights({});
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
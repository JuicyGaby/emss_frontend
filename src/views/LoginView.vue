<template lang="">
    <div class="red sign-in-container d-flex align-center justify-start">
        <div class="blue login-box d-flex flex-column justify-center align-center">
            <div class="red w-100 d-flex flex-column align-center pa-5 ga-2">
                <h2>Lorem, ipsum dolor. {{ name }}</h2>
                <div class="input-field w-100">
                    <v-form ref="formLogin" class="d-flex flex-column ga-3">
                        <v-text-field
                          v-model="username"
                          name="username"
                          label="Username"
                          variant="outlined"
                          :rules="usernameRule"
                          clearable
                        ></v-text-field>
                        <v-text-field
                        v-model="password"
                          :rules="passwordRule"
                          name="password"
                          label="Password"
                          :type="showPassword ? 'text' : 'password'"
                          variant="outlined"
                          hint="Please remember your password"
                          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
                          @click:append-inner="togglePasswordVisibilty()"
                        ></v-text-field>
                        <v-btn @click="signIn()" size="large" color="secondary w-100 mt-2">Sign in</v-btn>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import router from "@/router/index.js";
import { ref, computed, onMounted } from "vue";
import { userAuthentication } from "../stores/session.js";

const authentication = userAuthentication();

const name = ref("gaby");
const username = ref("");
const password = ref("");
const formLogin = ref(null);
const showPassword = ref(false);

// input rules 

const usernameRule = [
  (v) => !!v || "Username is required",
  (v) =>
    (v && v.length >= 3 && v.length <= 20) ||
    "Username must be between 3 and 20 characters",
];

const passwordRule = [
   (v) => !!v || "Password is required"
];



onMounted(() => {
  checkUserSession();
});

const togglePasswordVisibilty = () => {
  showPassword.value = !showPassword.value;
};

// methods

const signIn = async () => {
  const form = await formLogin.value.validate()
  if (!form.valid) return
};

const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  if (isLoggedIn) {
    router.push("/");
  }
};
</script>





<style lang="css">
.sign-in-container {
  height: 100vh;
  width: 100%;
  padding: 1.5em;
}
.login-box {
  padding: 1em;
  height: 95%;
  width: 30%;
  border-radius: 15px;
  /* border: 1px solid blue; */
}
</style>
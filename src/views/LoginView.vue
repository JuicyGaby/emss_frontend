<template lang="">
    <div class="rb sign-in-container d-flex align-center justify-end">
        <div class="login-box d-flex flex-column justify-center align-center">
          <div class="w-100 alert" :class="{'visible': toggleAlert }">
              <v-alert
              variant="tonal"
              :type="isError ? 'error' : 'success'"
              :text="isError ? 'Wrong credentials. Please try again' : 'Welcome back! Your account was accessed successfully.'"
            ></v-alert>
          </div>
          <div class="w-100 d-flex flex-column align-center pa-5 ga-2">
              <h2 class="mb-10">Malasakit System Name</h2>
              <div class="input-field w-100">
                  <v-form ref="formLogin" class="d-flex flex-column ga-3">
                      <v-text-field
                        v-model="userInput.username.value"
                        name="username"
                        label="Username"
                        variant="outlined"
                        :rules="inputRules.username"
                        clearable
                      ></v-text-field>
                      <v-text-field
                      v-model="userInput.password.value"
                        :rules="inputRules.password"
                        name="password"
                        label="Password"
                        :type="showPassword ? 'text' : 'password'"
                        variant="outlined"
                        hint="Please remember your password"
                        :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
                        @click:append-inner="showPassword = !showPassword"
                      ></v-text-field>
                      <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                          <v-btn append-icon="mdi-login" @keyup.enter="signIn()" @click="signIn()" v-bind="props" size="x-large" :color="isHovering ?  'primary' : 'secondary'" color="w-100 mt-2">Sign in</v-btn>
                        </template>
                      </v-hover>
                  </v-form>
              </div>
          </div>
        </div>
    </div>
</template>
<script setup>
import router from "@/router/index.js";
import { ref, computed, onMounted } from "vue";
import { userAuthentication } from "../stores/session";

const authentication = userAuthentication();
// user input
const userInput = {
  username: ref(""),
  password: ref(""),
};

const formLogin = ref(null);
const showPassword = ref(false);
const toggleAlert = ref(false);
const isError = ref(false);

// input rules

const inputRules = {
  username: [
    (v) => !!v || "Username is required",
    (v) =>
      (v && v.length >= 3 && v.length <= 20) ||
      "Username must be between 3 and 20 characters",
  ],
  password: [(v) => !!v || "Password is required"],
};

// methods
const signIn = async () => {
  console.log('asda');
  const form = await formLogin.value.validate();
  if (!form.valid) return;

  const body = {
    username: userInput.username.value,
    password: userInput.password.value,
  };

  const response = await fetch("http://172.16.2.30:3014/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (data.error) {
    // displays the alert component
    toggleAlert.value = true;
    isError.value = true;
    password.value = "";
    return;
  }

  console.log(data);
  toggleAlert.value = true;
  isError.value = false;
  authentication.setUserToken(data.user.login_token);
  console.log(authentication.token);
};
</script>





<style lang="css">
.sign-in-container {
  background-image: url('/src/assets/signinBG.jpg');
  background-size: cover;
  
  background-position: center bottom 5%;
  
}
.alert {
  visibility: hidden;
}
.visible {
  visibility: visible;
}
.sign-in-container {
  height: 100vh;
  width: 100%;
  padding: 1.5em;
}
.login-box {
  margin-right: 2em;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: white;
  padding: 1em;
  height: 95%;
  width: 30%;
  border-radius: 15px;
  /* border: 1px solid blue; */
}

</style>
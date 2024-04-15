<template lang="" class="">
  <div class="display rb sign-in-container d-flex align-center justify-end">
    <div
      class="login-box d-flex flex-column justify-center align-center elevation-3"
    >
      <div v-if="toggleAlert" class="w-100">
        <v-alert
          variant="tonal"
          :type="isError ? 'error' : 'success'"
          :text="
            isError
              ? 'Wrong credentials. Please try again'
              : 'Welcome back! Your account was accessed successfully.'
          "
        ></v-alert>
      </div>
      <div class="w-100 d-flex flex-column align-center my-10 ga-5">
        <img src="/src/assets/vsmmc-logo.png" class="vsmmc-logo" />
        <div class="input-field w-100">
          <v-form ref="formLogin" class="d-flex flex-column ga-3">
            <v-text-field
              v-for="(item, index) in inputFields"
              :key="index"
              :label="item.label"
              variant="outlined"
              :rules="inputRules[index]"
              v-model="userInput[index]"
              :append-inner-icon="item.icon"
              :type="item.type"
              @click:append-inner="showPassword = !showPassword"
              @keyup.enter="signIn"
            ></v-text-field>
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-btn
                  class="elevation-3"
                  append-icon="mdi-login"
                  @keyup.enter="signIn"
                  @click="signIn()"
                  v-bind="props"
                  size="x-large"
                  :color="isHovering ? 'primary' : 'secondary'"
                  color="w-100 mt-2"
                  >Sign in</v-btn
                >
              </template>
            </v-hover>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userLogin, employeeRights } from "@/api/authentication";
import { userAuthentication } from "../stores/session";
const authentication = userAuthentication();
const router = useRouter();

onMounted(() => {
  checkUserSession();
});

const userInput = ref({});
const inputFields = ref({
  username: {
    label: "Usename",
    type: "text",
  },
  password: {
    label: "Password",
    type: computed(() => (showPassword.value ? "text" : "password")),
    icon: computed(() =>
      showPassword.value ? "mdi-eye-off-outline" : "mdi-eye"
    ),
  },
});
const inputRules = {
  username: [
    (v) => !!v || "Username is required",
    (v) =>
      (v && v.length >= 3 && v.length <= 20) ||
      "Username must be between 3 and 20 characters",
  ],
  password: [(v) => !!v || "Password is required"],
};
const formLogin = ref(null);
const showPassword = ref(false);
const toggleAlert = ref(false);
const isError = ref(false);

const signIn = async () => {
  const validated = await validateForm();
  if (!validated) return;
  const response = await userLogin(userInput.value);
  await validateUserData(response);
};
const validateUserData = async (data) => {
  const validated = handleAlert(data);
  if (validated) {
    handleAuthentication(data);
    return;
  }
};
const handleAlert = (data) => {
  if (data.error) {
    toggleAlert.value = true;
    isError.value = true;
    return false;
  }
  toggleAlert.value = true;
  isError.value = false;
  return true;
};
const handleAuthentication = (data) => {
  authentication.setUserToken(data.user.login_token);
  authentication.toggleLogIn(true);
  authentication.setUser(data.user);
  router.push("/");
};
const validateForm = async () => {
  const form = await formLogin.value.validate();
  if (!form.valid) return false;
  return true;
};
const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  if (isLoggedIn) {
    router.push("/");
  }
};
</script>

<style lang="css" scoped>
.sign-in-container {
  background-image: url("/src/assets/facade-perspective.jpg");
  background-size: cover;
  background-position: center bottom 5%;
}
.vsmmc-logo {
  width: 150px;
  height: 150px;
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
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  background-color: white;
  padding: 1em;
  height: 80%;
  width: 30%;
  border-radius: 15px;
  /* border: 1px solid blue; */
}
.display {
  margin-left: 0em;
  width: 100%;
  padding: 1em;
}
</style>

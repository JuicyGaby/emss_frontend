<template lang="" class="">
  <div class="sign-in-container">
    <v-container>
      <v-row style="height: 95vh" class="">
        <v-col cols="8" class="d-flex align-center px-10">
          <h1 class="system-title">
            Electronic Medical <br />Social Service System
          </h1>
        </v-col>
        <v-col cols="4" class="d-flex justify-center align-center">
          <v-card width="100%" class="pa-5">
            <v-card-text>
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
              <div class="d-flex align-center justify-center">
                <img
                  src="/src/assets/images/logo-css.png"
                  class="vsmmc-logo my-10"
                />
              </div>
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
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <snackBars :snackBarData="snackBarData" />
</template>
<script setup>
import snackBars from "@/components/dialogs/snackBars.vue";
import { handleSnackBar, validateForm } from "@/utils/constants";
import { ref, defineProps, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userLogin, getUserAccessRightsById } from "@/api/authentication";
import { userAuthentication } from "../stores/session";
const authentication = userAuthentication();
const router = useRouter();

const snackBarData = ref({});
const userInput = ref({
  system_id: 20,
});
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
  const formDataValid = await validateForm(formLogin);
  if (!formDataValid) return;

  const userResponse = await userLogin(userInput.value);
  if (userResponse) {
    await handleUserData(userResponse);
  }
};

const handleUserData = async (userData) => {
  const alertValid = await handleAlert(userData);
  if (alertValid) {
    handleAuthentication(userData);
  }
};

const handleAlert = async (userData) => {
  if (userData.error) {
    showErrorMessage();
    return false;
  }

  const canAccess = await checkUserAccess(userData);
  if (!canAccess) return false;

  showSuccessMessage();
  return true;
};

const handleAuthentication = (userData) => {
  const { user } = userData;
  authentication.setUserToken(user.login_token);
  authentication.toggleLogIn(true);
  authentication.setUser(user);
  router.push("/");
};

const checkUserSession = () => {
  if (authentication.isLoggedIn) {
    router.push("/");
  }
};

const checkUserAccess = async (userData) => {
  const { user } = userData;
  if (user.access.length !== 0) {
    const accessRightId = user.access[0].access_right;
    const accessRights = await getUserAccessRightsById(accessRightId);
    authentication.setAccessRights(accessRights);
    return true;
  }

  showNoAccessMessage();
  return false;
};

const showErrorMessage = () => {
  toggleAlert.value = true;
  isError.value = true;
};

const showSuccessMessage = () => {
  toggleAlert.value = true;
  isError.value = false;
};

const showNoAccessMessage = () => {
  snackBarData.value = handleSnackBar(
    "error",
    "You do not have access to this system. Please contact the administrator."
  );
};

onMounted(() => {
  checkUserSession();
});
</script>

<style lang="css" scoped>
.red-border {
  border: 1px dashed red;
}
.system-title {
  font-size: 4em;
  font-weight: 600;
  color: white;
  /* add text stroke */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
.sign-in-container {
  background-image: url("/src/assets/facade-perspective.jpg");
  background-size: cover;
  background-position: center bottom 5%;
  width: 100%;
  height: 100vh;
}
.vsmmc-logo {
  width: 200px;
  height: 200px;
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

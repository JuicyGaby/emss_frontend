<template lang="">
    <div class="red sign-in-container d-flex align-center justify-start">
        <div class="blue login-box d-flex flex-column justify-center align-center">
            <div class="red w-100 d-flex flex-column align-center pa-5">
                <h2>Lorem, ipsum dolor. {{ name }}</h2>
                <div class="input-field w-100">
                    <v-form>
                        <v-text-field
                           v-model="username"
                           name="username"
                           label="Username"
                           id="id"
                           variant="outlined"
                           clearable
                        ></v-text-field>
                        <v-text-field
                        v-model="password"
                           name="password"
                           label="Password"
                           id="id"
                           :type="passInputType"
                           variant="outlined"
                           hint="Please remember your password"
                           :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye'"
                           @click:append-inner="togglePasswordVisibilty()"
                        ></v-text-field>
                        <v-btn @click="printUser()" size="large" color="secondary w-100 mt-2">Sign in</v-btn>
                    </v-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";

const name = ref("gaby");
const username = ref("");


const password = ref("");
const showPassword = ref(false)

const passInputType = computed(() => (showPassword.value ? 'text' : 'password'))

const printUser = () => {
  console.log(username.value);
  console.log(password.value);
};

const togglePasswordVisibilty = () => {
   showPassword.value = !showPassword.value
}

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
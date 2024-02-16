<template lang="">
    <div>
        <v-btn color="error" @click="signOut">logout</v-btn>
        <p>{{ user }}</p>
    </div>
</template>
<script setup>
import { defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
const { authentication, user} = defineProps(['authentication', 'user'])


const router = useRouter();
// methods

const signOut = () => {
    authentication.toggleLogIn(false);
    authentication.setUserToken('');
    router.push("/login");
}

</script>
<style lang="">
    
</style>
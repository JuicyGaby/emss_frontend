import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { userAuthentication } from "../stores/session";

const authentication = userAuthentication()

export const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  const router = useRouter();

  if (isLoggedIn) {
    router.push('/');
    console.log('asdasd');
  }
}
import { useRouter } from 'vue-router';

const checkUserSession = () => {
  const isLoggedIn = authentication.isLoggedIn;
  const router = useRouter();

  if (!isLoggedIn) {
    router.push('/');
    console.log('asdasd');
  }
};

export default checkUserSession;
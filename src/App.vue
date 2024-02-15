<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style>
.red {
  border: 1px dashed red;
}
.blue {
  border: 1px dashed blue;
}
</style>
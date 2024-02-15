<template>
  <div>
    <h1>{{ counter.name }}</h1>
  </div>
</template>

<script setup>

import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore()


</script>

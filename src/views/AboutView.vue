<template>
  <ul v-auto-animate>
    <li
      v-for="item in items"
      :key="item"
      @click="removeItem(item)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
const items = ref(["😏","😐","😑","😒","😕"])
function removeItem(toRemove) {
  items.value = items.value.filter((item) => item !== toRemove)
}
</script>
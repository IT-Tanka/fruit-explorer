<script setup>
import FruitCard from '@/components/FruitCard.vue'

defineProps({
  fruits: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="grid">
    <FruitCard v-for="fruit in fruits" :key="fruit.id" :fruit="fruit"/>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  padding: 7px;
  margin: 30px auto;
}
</style>

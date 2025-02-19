<script setup lang="ts">
import { computed } from "vue";
import { useFruitStore } from "@/store/fruitStore";
import type { Fruit } from "../types/fruit";

const props = defineProps<{
  fruit: Fruit;
}>();

const store = useFruitStore();

// Вычисляемое свойство для проверки, является ли фрукт избранным
const isFavorite = computed(() => store.favoritesIds.includes(props.fruit.id));
</script>

<template>
  <div class="fruit-card">
    <button @click="store.toggleFavorite(fruit)">
      {{ isFavorite ? "❤️" : "🤍" }}
    </button>
    <h3>{{ fruit.name }}</h3>
    <p>carbohydrates: {{ fruit.nutritions.carbohydrates }}</p>
    <p>protein: {{ fruit.nutritions.protein }}</p>
    <p>fat: {{ fruit.nutritions.fat }} г</p>
    <p>calories: {{ fruit.nutritions.calories }}</p>
    <p>sugar: {{ fruit.nutritions.sugar }}</p>
    <p>
      family:
      <NuxtLink :to="`/${fruit.family}`">{{ fruit.family }}</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.fruit-card {
  background-color: #fff;
  position: relative;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  max-width: 400px;
  width: 90%;
  margin: 0 auto;
}

.fruit-card button {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: #fff;
  cursor: pointer;
  border-radius: 10px;
  font-size: 20px;
}
h3{
  text-align: center;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #225824 ;
}

a:hover {
  color: pink;
  transition: color 0.3s ease;
}
</style>

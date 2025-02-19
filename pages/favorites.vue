<script setup>
import { useFruitStore } from "@/store/fruitStore";
import FruitGrid from "@/components/FruitGrid.vue";

const store = useFruitStore();
store.loadFavorites();
store.fetchFruits('favorites');

</script>

<template>
  <div>
    <FruitGrid :fruits="store.filteredFruits"/>
  </div>
</template>

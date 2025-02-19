<script setup>
import { onMounted } from "vue";
import { useFruitStore } from "@/store/fruitStore";
import FruitGrid from "@/components/FruitGrid.vue";

const store = useFruitStore();
onMounted(()=>{
  store.fetchFruits();
  store.loadFavorites();
});


</script>

<template>
  <div>
    <FruitGrid :fruits="store.filteredFruits" favorites:="false" />
  </div>
</template>

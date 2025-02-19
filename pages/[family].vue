<script setup>
import { useFruitStore } from '@/store/fruitStore'
import { onMounted, watch } from 'vue'
import FruitGrid from '@/components/FruitGrid.vue'
import { useRoute } from "vue-router";

const store = useFruitStore();
const route = useRoute(); 

onMounted(() => {
  store.fetchFruits(route.params.family);
});

// Следим за изменением параметра family и загружаем новые фрукты
watch(() => route.params.family, (newFamily) => {
  store.fetchFruits(newFamily);
});
</script>


<template>
  <div>
    <h2>{{route.params.family}}</h2>
    <FruitGrid  :fruits="store.filteredFruits"/>
  </div>
</template>
<style scoped>
h2{
  text-align: center;
}
</style>

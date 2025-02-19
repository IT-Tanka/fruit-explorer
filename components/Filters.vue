<script setup>
import { useFruitStore } from "@/store/fruitStore";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import FilterRange from "@/components/FilterRange.vue";
import FilterSelect from "@/components/FilterSelect.vue";

const store = useFruitStore();
const route = useRoute();

// Фильтры с диапазонами
const filtersConfig = ref({
  carbohydrates: [0, 10],
  protein: [0, 10],
  fat: [0, 10],
  calories: [0, 500],
  sugar: [0, 50],
});

let unwatch = null;

// Функция для обновления фильтров
function setupFiltersWatcher() {
  if (unwatch) unwatch(); // Отключаем предыдущий watch, если он был

  unwatch = watch(
    () => store.fruits.length,
    (newVal) => {
      if (newVal > 0) {
        for (const key in filtersConfig.value) {
          if (store.filters[key]) {
            filtersConfig.value[key][0] = store.filters[key][0]; // min
            filtersConfig.value[key][1] = store.filters[key][1]; // max
          }
        }
        unwatch(); // Отключаем слежение после первого срабатывания
      }
    },
    { immediate: true }
  );
}

// Запускаем `watch` при первой загрузке
setupFiltersWatcher();

// Следим за изменением маршрута и пересоздаем `watch`
watch(() => route.fullPath, () => {
  store.filters.family = "";
  store.filters.genus = "";
  store.filters.order = "";
  setupFiltersWatcher();
});


// Обновляем фильтр в store
function updateFilter(filterKey, type, value) {
  store.filters[filterKey][type === "min" ? 0 : 1] = value;
}
</script>

<template>
  <div class="filters-container">
    <!-- Фильтры диапазонов -->
    <FilterRange v-for="(range, key) in filtersConfig" :key="key" :label="key.charAt(0).toUpperCase() + key.slice(1)"
      :min="range[0]" :max="range[1]" :minValue="store.filters[key][0]" :maxValue="store.filters[key][1]"
      @update:minValue="(value) => updateFilter(key, 'min', value)"
      @update:maxValue="(value) => updateFilter(key, 'max', value)" />

    <!-- Фильтры select -->
    <FilterSelect label="family" filterKey="family" :options="store.options.family" />
    <FilterSelect label="genus" filterKey="genus" :options="store.options.genus" />
    <FilterSelect label="order" filterKey="order" :options="store.options.order" />
  </div>
</template>

<style scoped>
.filters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 7px;
  margin: 30px auto;
}

@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
}
</style>

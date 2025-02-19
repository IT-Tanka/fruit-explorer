<script setup>
import { ref, watch } from "vue";
import { useFruitStore } from "@/store/fruitStore";

const props = defineProps({
    label: String, // Название фильтра (семейство, род, порядок)
    options: Array, // Массив доступных значений
    filterKey: String, // Ключ для обновления в store.filters
});

const store = useFruitStore();
const selectedValue = ref(store.filters[props.filterKey] || ""); // Текущее значение фильтра

// Следим за изменением выбранного значения и обновляем store
watch(selectedValue, (newValue) => {
    store.filters[props.filterKey] = newValue;

});
// обновляем `selectedValue`, если `store.filters` изменился извне
watch(() => store.filters[props.filterKey], (newValue) => {
    selectedValue.value = newValue;
});
</script>

<template>
    <div class="filter-select" v-if="options.length > 1">
        <label :for="filterKey">{{ label }}</label>
        <select v-model="selectedValue" :id="filterKey">
            <option value="" selected>all</option>
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.filter-select {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

label {
    font-weight: bold;
    font-size: 14px;
}
</style>

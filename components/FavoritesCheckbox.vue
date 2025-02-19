<script setup>
import { ref } from "vue";

const showFavorites = ref(false);

defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const toggleFavorites = () => {
  emit("update:modelValue", !showFavorites.value);
  showFavorites.value = !showFavorites.value;
};
</script>

<template>
  <label>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="toggleFavorites"
      
    />
    <span>Favorites</span>
  </label>
</template>

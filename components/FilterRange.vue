<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  label: String,
  min: Number,
  max: Number,
  minValue: Number,
  maxValue: Number,
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

// Локальные реактивные переменные
const minRange = ref(props.minValue);
const maxRange = ref(props.maxValue);

// Следим за изменением пропсов (синхронизация значений)
watch(() => props.minValue, (newVal) => { minRange.value = newVal; });
watch(() => props.maxValue, (newVal) => { maxRange.value = newVal; });

// Вычисляем динамический шаг
const step = computed(() => {
  // Проверка на дробные значения
  const precision = Math.max(
    (props.min.toString().split('.')[1]?.length || 0),
    (props.max.toString().split('.')[1]?.length || 0)
  );

  // Устанавливаем шаг, учитывая количество знаков после запятой
  const calculatedStep = (props.max - props.min) / 50;
  return precision > 0 ? Math.max(calculatedStep, 0.01) : Math.max(calculatedStep, 1);
});

// Обновление минимального значения
const updateMin = (event) => {
  const value = Number(event.target.value);
  if (value < maxRange.value) {
    minRange.value = value;
    emit('update:minValue', value);
  }
};

// Обновление максимального значения
const updateMax = (event) => {
  const value = Number(event.target.value);
  if (value > minRange.value) {
    maxRange.value = value;
    emit('update:maxValue', value);
  }
};

// Динамический стиль градиента для ползунка
const rangeStyle = computed(() => {
  const minPercent = ((minRange.value - props.min) / (props.max - props.min)) * 100;
  const maxPercent = ((maxRange.value - props.min) / (props.max - props.min)) * 100;
  return `background: linear-gradient(to right, #ddd ${minPercent}%, #4caf50 ${minPercent}%, #4caf50 ${maxPercent}%, #ddd ${maxPercent}%);`;
});
</script>

<template>
  <div class="filter" v-if="max!==min">
    <div class="filter-range">
      <label>{{ label }}</label>
      <div class="range-values">
        <span>{{ min }}</span>
        <span>{{ max }}</span>
      </div>
      <div class="slider-container">
        <input 
          type="range" 
          :min="min" 
          :max="max" 
          :step="step" 
          :value="minRange" 
          @input="updateMin" 
          class="slider"
          :style="rangeStyle"
        />
        <input 
          type="range" 
          :min="min" 
          :max="max" 
          :step="step" 
          :value="maxRange" 
          @input="updateMax" 
          class="slider"
          :style="rangeStyle"
        />
      </div>
      <div class="current-values">
        <span>{{ minRange }}</span>
        <span>{{ maxRange }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.filter-range {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.current-values {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.slider-container {
  position: relative;
  height: 30px;
}

.slider {
  position: absolute;
  width: 100%;
  appearance: none;
  pointer-events: none;
  background: none;
}

.slider:nth-child(2) {
  z-index: 1;
}

.slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  border-radius: 3px;
}

.slider::-webkit-slider-thumb {
  position: relative;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #4caf50;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  margin-top: -5px;
  transition: 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider::-moz-range-track {
  width: 100%;
  height: 6px;
  border-radius: 3px;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #4caf50;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}
</style>

<!-- <script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  label: String,
  min: Number,
  max: Number,
  minValue: Number,
  maxValue: Number,
});

const emit = defineEmits(['update:minValue', 'update:maxValue']);

// Локальные реактивные переменные
const minRange = ref(props.minValue);
const maxRange = ref(props.maxValue);

// Следим за изменением пропсов (чтобы синхронизировать значения)
watch(() => props.minValue, (newVal) => { minRange.value = newVal });
watch(() => props.maxValue, (newVal) => { maxRange.value = newVal });

// Обновление минимального значения
const updateMin = (event) => {
  const value = Number(event.target.value);
  if (value < maxRange.value) {
    minRange.value = value;
    emit('update:minValue', value);
  }
};

// Обновление максимального значения
const updateMax = (event) => {
  const value = Number(event.target.value);
  if (value > minRange.value) {
    maxRange.value = value;
    emit('update:maxValue', value);
  }
};

// Динамический стиль градиента для ползунка
const rangeStyle = computed(() => {
  const minPercent = ((minRange.value - props.min) / (props.max - props.min)) * 100;
  const maxPercent = ((maxRange.value - props.min) / (props.max - props.min)) * 100;
  return `background: linear-gradient(to right, #ddd ${minPercent}%, #4caf50 ${minPercent}%, #4caf50 ${maxPercent}%, #ddd ${maxPercent}%);`;
});
</script>

<template>
  <div class="filter" v-if="max!==min">
  <div class="filter-range">
    <label>{{ label }}</label>
    <div class="range-values">
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>
    <div class="slider-container">
      <input 
        type="range" 
        :min="min" 
        :max="max" 
        :value="minRange" 
        @input="updateMin" 
        class="slider"
        :style="rangeStyle"
      />
      <input 
        type="range" 
        :min="min" 
        :max="max" 
        :value="maxRange" 
        @input="updateMax" 
        class="slider"
        :style="rangeStyle"
      />
    </div>
    <div class="current-values">
      <span>{{ minRange }}</span>
      <span>{{ maxRange }}</span>
    </div>
  </div>
</div>
</template>

<style scoped>

.filter-range {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.current-values {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.slider-container {
  position: relative;
  height: 30px;
}

.slider {
  position: absolute;
  width: 100%;
  appearance: none;
  pointer-events: none;
  background: none;
}
.slider:nth-child(2) {
  z-index: 1;
}
.slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  border-radius: 3px;
}

.slider::-webkit-slider-thumb {
  position: relative;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #4caf50;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  margin-top: -5px;
  transition: 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.slider::-moz-range-track {
  width: 100%;
  height: 6px;
  border-radius: 3px;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #4caf50;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}
</style> -->

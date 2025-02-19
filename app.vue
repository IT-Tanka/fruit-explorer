<script setup lang="ts">
import Filters from '@/components/Filters.vue'
import Header from '@/components/Header.vue';
</script>

<template>
  <div class="app">
    <main>
      <Header />
      <div class="container">
        <Filters />
        <NuxtPage />
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

main {
  flex-grow: 1;
  padding: 20px;
  background-color: rgba(245, 245, 220, 0.294);
}
.container{
  max-width: 1480px;
  padding: 15px;
  margin: auto;
}
</style>

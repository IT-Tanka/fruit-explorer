<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <nav class="header">
        <ul class="nav-list">
            <li>
                <NuxtLink to="/" :class="{ active: route.path === '/' }">Home</NuxtLink>
            </li>
            <span>|</span>
            <li>
                <NuxtLink to="/favorites" :class="{ active: route.path === '/favorites' }">Favorites</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.header {
    background: #225824 ;
    padding: 15px 0;
}

.nav-list {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;
    justify-content: center;
}

.nav-list li {
    display: inline;
}

.nav-list a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    padding: 10px;
    border-radius: 5px;
    transition: background 0.3s;
}

.nav-list a:hover {
    background: #4caf50 ;
}

.nav-list .active {
    color: #e72c6e;
}
</style>

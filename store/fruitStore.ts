
import { defineStore } from "pinia";
import type { Fruit } from "../types/fruit";
import type { Nutrition } from "../types/nutrition";
import { API_ENDPOINTS } from "../utils/api";

export const useFruitStore = defineStore("fruit", {
    state: () => ({
        fruits: [] as Fruit[],
        favoritesIds: [] as number[], // Храним только ID избранных
        filters: {
            carbohydrates: [0, 100],
            protein: [0, 10],
            fat: [0, 10],
            calories: [0, 500],
            sugar: [0, 50],
            family: "",
            genus: "",
            order: "",
        },
        options: {
            family: [] as string[],
            genus: [] as string[],
            order: [] as string[],
        }
    }),

    actions: {
        async fetchFruits(route: string = "index") {
            const path =
                route === "index" || route === "favorites"
                    ? API_ENDPOINTS.ALL_FRUITS
                    : API_ENDPOINTS.FAMILY(route);
        
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error("Ошибка загрузки данных");
        
                this.fruits = await response.json();
        
                if (route === "favorites") this.filterByFavorites();
                this.initializeFilters();
            } catch (error) {
                console.error("Ошибка загрузки фруктов:", error);
            }
        },
        
        filterByFavorites() {
            this.fruits = this.fruits.filter(fruit => this.favoritesIds.includes(fruit.id));
        },
        initializeFilters() {
            if (!this.fruits.length) return;

            // Определяем минимальные и максимальные значения для каждого числового параметра
            const numericFields: (keyof Nutrition)[] = ["carbohydrates", "protein", "fat", "calories", "sugar"];
            numericFields.forEach(field => {
                const values = this.fruits.map(fruit => fruit.nutritions[field]);
                this.filters[field] = [Math.min(...values), Math.max(...values)];
            });

            // Заполняем списки уникальных значений для select
            this.options.family = [...new Set(this.fruits.map(f => f.family))];
            this.options.genus = [...new Set(this.fruits.map(f => f.genus))];
            this.options.order = [...new Set(this.fruits.map(f => f.order))];
        },
        loadFavorites() {
            if (typeof window !== "undefined") {
                const data = localStorage.getItem("favorites");
                this.favoritesIds = data ? JSON.parse(data) : [];
            }
        },

        toggleFavorite(fruit: Fruit) {
            const index = this.favoritesIds.indexOf(fruit.id);
            if (index === -1) {
                this.favoritesIds.push(fruit.id);
            } else {
                this.favoritesIds.splice(index, 1);
            }
            if (typeof window !== "undefined") {
                localStorage.setItem("favorites", JSON.stringify(this.favoritesIds));
            }

        },

    },

    getters: {
        filteredFruits(): Fruit[] {
            return this.fruits.filter((fruit) =>
                // Фильтруем по числовым диапазонам
                Object.entries(this.filters).every(([key, value]) => {
                    if (Array.isArray(value) && fruit.nutritions[key as keyof Nutrition] !== undefined) {
                        const fieldValue = fruit.nutritions[key as keyof Nutrition];
                        return fieldValue >= value[0] && fieldValue <= value[1];
                    }
                    return true;
                }) &&
                // Фильтруем по выбранным значениям в селектах
                (!this.filters.family || fruit.family === this.filters.family) &&
                (!this.filters.genus || fruit.genus === this.filters.genus) &&
                (!this.filters.order || fruit.order === this.filters.order)
            );
        },
    },
});



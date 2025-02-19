import type { Nutrition } from "./nutrition";

export interface Fruit {
    genus: string;
    name: string;
    id: number;
    family: string;
    order: string;
    nutritions: Nutrition;
}

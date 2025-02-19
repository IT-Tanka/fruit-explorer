export default defineEventHandler(async (event) => {
    try {
        const response = await fetch("https://www.fruityvice.com/api/fruit/all", {
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка загрузки фруктов");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка на сервере:", error);
        return { error: "Ошибка загрузки данных" };
    }
});

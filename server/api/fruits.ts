export default defineEventHandler(async (event) => {
    try {
        const { family } = getQuery(event);
        let url = "https://www.fruityvice.com/api/fruit/all";

        if (family) {
            url = `https://www.fruityvice.com/api/fruit/family/${family}`;
        }

        console.log("Запрос к API:", url);

        const response = await fetch(url, {
            headers: {
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Ошибка загрузки фруктов");
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка на сервере:", error);
        return { error: "Ошибка загрузки данных" };
    }
});

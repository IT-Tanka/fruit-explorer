export const API_BASE = "/api/fruits";

export const API_ENDPOINTS = {
    ALL_FRUITS: API_BASE,
    FAMILY: (family: string) => `${API_BASE}?family=${family}`,
};

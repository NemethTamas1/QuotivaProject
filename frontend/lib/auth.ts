import http from "./http";

export async function whoAmI() {
    await http.get(`/sanctum/csrf-cookie`);

    const res = await http.get(`/api/me`);
    
    return res.data;
}
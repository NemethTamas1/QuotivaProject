export async function whoAmI() {
    const api = process.env.NEXT_PUBLIC_API_URL;
    await fetch(`${api}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
    });

    const res = await fetch(`${api}/api/me`, {
        method: 'GET',
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error("Unauthenticated");
    }

    return res.json();
}
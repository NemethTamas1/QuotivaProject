export async function whoAmI(){
    const api = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${api}/api/me`, {
        credentials: "include"
    });

    if(!res.ok) throw new Error("Unauthenticated");

    return res.json();
}
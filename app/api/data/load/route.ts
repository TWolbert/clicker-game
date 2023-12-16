export async function POST(request: Request) {
    const encryptedSaveData = await request.text();
    const saveData = JSON.parse(atob(encryptedSaveData));

    return new Response(JSON.stringify(saveData), {
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    });
}
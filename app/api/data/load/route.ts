import { decrypt } from "../_functions/encrypt";

export async function POST(request: Request) {
    const encryptedSaveData = await request.text();
    let saveData = decrypt(encryptedSaveData);

    return new Response(saveData, {
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    });
}
import { PlayerData } from "@/app/upgrades";

export async function POST(request:Request) {
    let saveData: PlayerData = await request.json();
    let encryptedSaveData = btoa(JSON.stringify(saveData));

    return new Response(encryptedSaveData, {
        headers: {
            "content-type": "text/plain;charset=UTF-8"
        }
    });
}   
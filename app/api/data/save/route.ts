import { PlayerData } from "@/app/upgrades";
import { encrypt } from "../_functions/encrypt";

export async function POST(request:Request) {
    let saveData: PlayerData = await request.json();
    let encryptedSaveData = encrypt(JSON.stringify(saveData));

    return new Response(encryptedSaveData, {
        headers: {
            "content-type": "text/plain;charset=UTF-8"
        }
    });
}   
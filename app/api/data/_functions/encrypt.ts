const key = "1£M2zFJ4B$nTv1OfR£W<_V9?O106-h";
import CryptoJS from "crypto-js";

export function encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, key).toString();
}

export function decrypt(data: string): string {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8)
}

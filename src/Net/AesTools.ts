import * as CryptoJS from "./aes.js"

export default class Aes_ZMDGJ_Tools
{
    private static readonly _ZMDGJ_KEY_ZMDGJ_ = 'b#63fFJ6AvkK3YT*';
    private static readonly _ZMDGJ_IV_ZMDGJ_ = 'J$f4DU%sNL73M&Go';

    //加密
    public static en_ZMDGJ_crypt(str: string) {
        var key = CryptoJS.enc.Utf8.parse(Aes_ZMDGJ_Tools._ZMDGJ_KEY_ZMDGJ_);// 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_ZMDGJ_Tools._ZMDGJ_IV_ZMDGJ_);//向量iv
        var encrypted = CryptoJS.AES.encrypt(str, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
    }

    //解密
    public static de_ZMDGJ_crypt(str: string) {
        var key = CryptoJS.enc.Utf8.parse(Aes_ZMDGJ_Tools._ZMDGJ_KEY_ZMDGJ_);// 秘钥
        var iv = CryptoJS.enc.Utf8.parse(Aes_ZMDGJ_Tools._ZMDGJ_IV_ZMDGJ_);//向量iv
        var decrypted = CryptoJS.AES.decrypt(str, key, { iv: iv, padding: CryptoJS.pad.Pkcs7 });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    
    
}
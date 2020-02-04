import {
    Pack, Block, Literal, Type, Dict
} from "dalkak";

declare var TextEncoder: any;
declare var crypto: any;

export default new Pack({
    name: "hash",
    blocks: {
        generateHash: new Block({
            name: "generateHash",
            template: "((data)로 Hash 생성하기)",
            func: async (param, project, platform) => {
                const message = param.data;
                const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
                const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
                return hashHex;
            }
        })
    }
});
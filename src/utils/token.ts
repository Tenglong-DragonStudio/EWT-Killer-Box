export function getUserToken() {
    let cookie = document.cookie.split(";");
    let result:{[key:string]:string} = {};
    for(let i = 0;i < cookie.length;i++) {
        let k = cookie[i].split("=")[0].substring(1);
        result[k] = cookie[i].split("=")[1];
    }
    return result["token"];
}
import { log } from "@/main";
import { coursetagsreflection } from "./constants";
import CryptoJS from "crypto-js"

export function randomString() {
    let randomStringChars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8, t = randomStringChars.length, r = "", n = 0; n < e; n++)
        r += randomStringChars.charAt(Math.floor(Math.random() * t));
    return r
}

export function getDateFromStamp(day:string) {
    return new Date(parseInt(day)).toLocaleDateString()
}

export function getPapers(array:Array<any>) {
    let ret = [];
    for(let c of array) {
        if(c.studyTest != null || c.contentTypeName == "试卷")
            ret.push(c)
    }
    return ret;
}

export function getCourses(array:Array<any>) {
    let ret = [];
    for(let c of array)
        if(c.contentTypeName in coursetagsreflection)
            ret.push(c)
    return ret;
}

export function UUID() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export function getUUIDs(array:Array<any>) {
    let s = ""
    for(const i of array) {
        s += (i.extra.uuid + (i == array[array.length -1] ? "" : ",")) 
    }
    return s;
}

export function getCourseSignature(logc:{[key:string]:any} | Array<Object> | Object) {
    let param = "log={log}&key=eo^nye1j#!wt2%v)"
    let rp = param.replace("{log}",JSON.stringify(logc))
    return CryptoJS.MD5(rp).toString();
}
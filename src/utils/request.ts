import { log, user } from "@/main";
import { headers } from "./constants";
import {SGM_xmlhttpRequest} from "@/utils/function";

export function validateReturn(Value:string) : Object {

    let json = JSON.parse(Value);

    if(json["success"] != true)
        log.info("用户"+(user == undefined ? undefined : user.id)+"访问接口失败,原因在于:"+json.msg+",代码为:"+json.code);
    return json["data"];
}

export function request(method:"GET" | "HEAD" | "POST" | undefined,
    url:string,
    headers?:{[key:string]:any},
    data?:any) 
{
    return new Promise(resolve => {SGM_xmlhttpRequest({
        method: method,
        url: url,
        data: data,
        headers: headers,
        //@ts-ignore
        beforeSend: function (xhr) {
            //@ts-ignore
                xhr.withCredentials = true
            },
        onload: (res) => {
            resolve(res)
        }})
    });
}

export function requestJson(method:"GET" | "POST" | "HEAD" | undefined,
    url:string,
    headers:{[key:string]:string},
    data:{[key:string]:string} | Object) {

    headers["Content-Type"]="application/json";
    return new Promise(resolve => {SGM_xmlhttpRequest({
        method: method,
        url: url,
        data: JSON.stringify(data),
        headers: headers,
        //@ts-ignore
        beforeSend: function (xhr) {
                        //@ts-ignore
                xhr.withCredentials = true
            },
        onload: (res) => {
            resolve(res)
        }})
    });
}

export function getUrlInfo(url?:string) {
    let urlc = url || window.location.href
    let urlInfos = urlc.split("?")[urlc.split("?").length-1];
    let urlArgs = urlInfos.split("&");
    let result:{[key:string]:string} = {};
    for(let i = 0;i < urlArgs.length;i++) {
        let k = urlArgs[i].split("=")[0];
        let v = urlArgs[i].split("=")[1];
        result[k] = v;
    }
    return result;
}

export async function getStdTime() {
    let res:any = await request("GET","https://f.m.suning.com/api/ct.do",headers.CommonHeader,null)
    let time = JSON.parse(res.responseText).currentTime
    return time
}
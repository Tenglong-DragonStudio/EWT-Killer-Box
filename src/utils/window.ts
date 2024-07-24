//不太清楚js的特性然后踩了坑,写了屎山代码,懒得改了

import { LogSystem } from "@/pojo/logsystem";
import $ from "jquery"
import {version} from "@/main";
import {getBlueFBtn, getTitleV2Text} from '@/utils/jquery_component';
import {first_read_text} from "@/utils/constants";
import {UserModel} from "@/pojo/user";
import {SGM_setValue} from "@/utils/function";
import {mstyle, wait_style} from "@/utils/style_manager";
import config from "@/config";

export function isInMainFrame() {
    let navFunctions = [$(".right-31MZp"),$(".navs-5oieR")];
    let hasNav = false
    navFunctions.forEach(element => {
        if(element.length != 0) {
            hasNav = true
        }
    });
    let hasCourseLstEle = $("[class^='page-wrapper']").length == 0 && $("[class^='course_package_container']").length == 0
    return !hasCourseLstEle && hasNav;
}

export function  isOnPractisePage() {
    let navFunction = $(".ewt-common-header-nav");
    let navFunction2 = $(".mst-ewt-common-header")
    let c = $(".report-page");
    return (navFunction.length!=0 || navFunction2.length != 0) || c.length != 0;
}

export function renderBackground() {
    let rootE = $(document.body)
    let bg = $("<div id='"+mstyle.windowBg+"'></div>");

    let loading = $(`<div class='${wait_style.loading}'></div>`);
    let loading_c = $(`<div class='${wait_style.loadingC}'></div>`);

    let elements:JQuery<HTMLElement>[] = []
    let pos = 0
    loading_c.click(()=>{
        setInterval(()=>{
            elements[pos].addClass(wait_style.loadingSingleL)
            elements[pos == 0 ? elements.length - 1 : pos-1].removeClass(wait_style.loadingSingleL)
            pos += 1
            if(pos >= elements.length) pos = 0
        },200)
    })
    for(let i=0;i<6;i++) {
        let p = $(`<div class='${wait_style.loadingSingleContainer}'></div>`)
        p.css("transform",`rotate(${i*60}deg)`)
        let c = $(`<div class='${wait_style.loadingSingle}'></div>`);
        p.append(c)
        elements.push(c)
        loading_c.append(p)
    }
    loading.append(loading_c)
    loading.append($(`<div class='${wait_style.loadingText}'>加载中,请等待</div>`))
    bg.append(loading)

    rootE.prepend(bg)
    loading.animate({opacity:1,marginBottom: "-=100px"},config.animate.window_surface);
    loading_c.click()
    return loading;
}
export function closeWindow() {
    let bg = $("#"+mstyle.windowBg);
    let wm = $("#"+mstyle.windowMain);
    wm.animate({opacity:0,marginBottom: "+=100px"},config.animate.window_surface);
    setTimeout(()=>{
        wm.css("display","none");
        bg.remove();
    },220);
}

export function leftComponent(userInfo:UserModel) {
    let root = $("<div class='"+mstyle.leftComponent+"'></div>")

    let rcontainer = $("<div style='line-height: 17px;display: flex;align-items: center;flex-direction: column'></div>")
    let foot = $(`<div class='`+mstyle.leftFooter+`'></div> `)

    if(userInfo.id == undefined) {
        let btn = getBlueFBtn("登陆",()=>{
            location.reload()
            window.location.href="https://web.ewt360.com/register/#/login"
        })
        btn.css("marginTop","50px")
        rcontainer.append(btn)
    } else {
        let tx = $("<img class='"+mstyle.headImage+"' src='"+userInfo.photoUrl+"'/>")
        let uname = $(`<div class="`+mstyle.userName+`">`+userInfo.name+`</div>`)
        let uid = $(`<div class="`+mstyle.userId+`">`+userInfo.id+`</div>`)
        rcontainer.append(uname)
        rcontainer.append(uid)
        root.append(tx)
    }
    foot.append($("<div class='"+mstyle.leftFooterElement+"'>测试版本.不代表最终品质.<br>Version: "+version+"</div>"))
    root.append(rcontainer)
    root.append(foot)
    return root
}

export function renderWindow(
    leftComponent:JQuery<HTMLElement> | undefined,
    bodyComponent:JQuery<HTMLElement> | undefined,
    hasCloseToggle:boolean
) {
    let windowMain = $("<div id='"+mstyle.windowMain+"''></div>");
    let bg = $("#"+mstyle.windowBg)

    if(leftComponent != null) windowMain.append(leftComponent);
    let kewtWindowBody = $("<div class='"+mstyle.kewtWindowBody+"'></div>");
    if(bodyComponent != null) kewtWindowBody.append(bodyComponent);
    windowMain.append(kewtWindowBody)

    if(hasCloseToggle) {
        let closeBtn = $(`<div id='`+mstyle.closeBtn+`'>
            <label class='`+mstyle.closeBtnLabel+`'>C</label>
        </div>`)
        closeBtn.mouseup(()=>{
            closeWindow();
        });
        windowMain.append(closeBtn)
    }

    $("#"+mstyle.windowBg).empty();
    bg.prepend(windowMain);
    windowMain.animate({opacity:1,marginBottom: "-=100px"},config.animate.window_surface);
}

export function renderWindowMenu(btns:Array<JQuery<HTMLElement>>) {
    let body = $(document.body)
    let mask = $("<div class='"+mstyle.wMask+"'></div>")
    let menu = $("<div class='"+mstyle.menu+"'></div>")
    let btncontainer = $("<div class='"+mstyle.wBtnContainer+"'></div>")
    for(let i of btns)
        btncontainer.append(i)
    menu.append(btncontainer)
    mask.append(menu)
    body.append(mask)
}

export function isInCoursePage() {
    return ($("[class^='course_package_container']").length != 0)
}

export function isInTaskPage() {
    return $("[class^='page-wrapper']").length != 0;
}

export function FirstWindow(btnclick:Function) {
    let windowRoot = $("<div class='window-root'>")
    windowRoot.append(getTitleV2Text("前言"))
    let element = $(`
            <div class='`+mstyle.firstView+`'>
            `+first_read_text+`
            </div>
        `)
    let container = $("<div class='"+mstyle.textContainer+"'></div>")

    let btn = $("<div class='"+mstyle.fvcBtn+"'>确认</div>")
    let ipt = $("<input type='text' class='"+mstyle.fvText+"'/>")
    container.append(ipt)
    container.append(btn)
    windowRoot.append(element)
    let text = "我已经看完了前言,以后会认真学习并且合理使用这款插件";
    let tip = $("<div style='margin-top: 5px;font-size: 12px;color: black;font-weight: lighter;'>请在下面的横线上输入'<span style='font-weight: bolder;'><i>"+text+"</i></span>'以继续:</div>");
    windowRoot.append(tip)
    windowRoot.append(container)

    btn.click(()=>{
        if(ipt.val() == text) {
            const expire = new Date();
            expire.setTime(expire.getTime() + (10*365 * 24 * 60 * 60 * 1000));
            SGM_setValue("first","true")
            tip.css("color","black")
            tip.text("填写成功!希望你能信守诺言!本窗口将会在1s后关闭...")
            setTimeout(()=>{
                btnclick();
            },1000)
        }
        else {
            tip.css("color","red")
            ipt.css("border-bottom","1px solid red")
        }

    })
    return windowRoot
}

export function isInHolidayFrame() {
    return $(".marT20-2nwoE").length != 0 && $(".holiday-student-1_5JF").length != 0;
}

export function NoPage() {
    let root = $("<div style='line-height: 25px;'></div>")


    let c:{[p:string]:JQuery<HTMLElement>} = {
        "去任务列表选任务":getBlueFBtn("<span style='font-weight: bolder;color: white'>-> GO!</span>",()=>{
            location.reload();
            window.location.href="https://teacher.ewt360.com/ewtbend/bend/index/index.html#/student/homework"}),
        "去假期页面":getBlueFBtn("<span style='font-weight: bolder;color: white'>-> GO!</span>",()=>{
            location.reload();
            window.location.href="https://teacher.ewt360.com/ewtbend/bend/index/index.html#/holiday/student/entry"}),
    }
    root.append($("<h1 style='font-size: 32px;font-weight: bolder'>菜单</h1>"))
    root.append($("<div style='font-size: 12px;margin-top: 5px'>你现在没有打开任何页面,从下面的列表选一项以继续:</div>"))
    let container = $("<div class='"+mstyle.nopageContainer+"'></div>")
    for(let d in c) {
        let ele = $("<div class='"+mstyle.nopageLst+"'><span class='"+mstyle.nopageLstTitle+"'>"+d+"</span></div>")
        c[d].css("margin-left",'auto')
        c[d].css("margin-right",'0')
        ele.append(c[d])
        container.append(ele)
    }
    root.append(container)
    return root
}

export function UpdatePage(content:String) {
    let root = $("<div class='window-root'></div>")

    console.log(version)
    // @ts-ignore
    root.append(getTitleV2Text("更新日志 - "+version.split("-")[0]))
    let ele = $("<div class='"+mstyle.firstView+"'>"+content+"</div>")
    let btn = $(`<div style='width: 100%;display: flex;'>
    <div class="`+mstyle.fvcBtn+`" style='margin-left: auto;margin-right: 0;'>我知道了!(点击关闭)</div>
        </div>`)
    btn.click(()=>{
        closeWindow()
        // @ts-ignore
        SGM_setValue((version.split("-")[0].trim())+"-update","true")
    })
    root.append(ele)
    root.append(btn)

    return root;
}
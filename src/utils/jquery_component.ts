import $ from "jquery";
//@ts-ignore
import style from '@/css/index.css';
import {circle_styles} from "@/utils/style_manager";
export function getTitleText(text:string) {
    return $("<div class='"+style.kewtCourseText+"'>"+text+"</div>");
}

export function getTitleV2Text(text:string) {
    return $("<div class='"+style.kewtTitlev2Text+"'>"+text+"</div>")
}

export function getTitleUpText(text:string) {
    return $("<div class='"+style["kewt-homework-text"]+style["kewt-homework-top"]+"'>"+text+"</div>")
}

export function getBtn(color:string,text:string,click:()=>{}) {
    //@ts-ignore
    let btn = $("<div class='"+style["kewt-common-btn"]+" "+style["btn-"+color]+"' id='fh-btn'><label>"+text+"</label></div>")
    btn.click(click)
    return btn;
}

export function getMenuBtn(color:string,imgelement:JQuery<HTMLElement>,text:string,click:()=>{}) {
    // @ts-ignore
    let main = $(`<div class="${style["menu-window-btn"]} ${circle_styles["btn" + color[0].toUpperCase() + color.substring(1)].toString()}"></div>`)
    main.append(imgelement)
    let texte = $('<div class="'+style.menuBtnText+'"></div>')
    texte.append(text)
    let btne = $(`<div class="`+style.menuBtnContainer+`"></div>`)
    btne.append(main)
    btne.append(texte)
    btne.click(click)
    return btne;
}

export function getBlueFBtn(text:String, click:Function) {
    let btn = $("<div class='"+style["blue-f-btn"]+"'>"+text+"</div>")
    btn.click(()=>{
        click()
    })
    return btn
}
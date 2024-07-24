import $ from "jquery";
import { UserModel } from '@/pojo/user';
import { LogSystem } from '@/pojo/logsystem';
import {UserInfoInterface} from "@/userinfos/UserInfoDao";
import {getUserToken} from "@/utils/token";
import {getMenuBtn} from "@/utils/jquery_component";
import {
    isInCoursePage,
    isInTaskPage,
    isOnPractisePage,
    leftComponent,
    NoPage,
    renderBackground,
    renderWindow,
    renderWindowMenu,
    UpdatePage
} from "./utils/window";

import {update_log} from "./utils/constants";
import {SGM_getValue} from "./utils/function";
import {HomeworkView} from "@/views/homework_view";
import {donate_img, log_img, open_img, setting_img, statisticsbtn_img} from "@/utils/resources";
import {getUrlInfo} from "@/utils/request";
import { TaskView } from "./views/task_view";
import {CourseView} from "@/views/course_view";

export let {version} = GM_info.script
export const log = new LogSystem();
export let user:UserModel;


let open = getMenuBtn("red",$(open_img),"打开工具箱",async ()=>{
    renderBackground();
    let attr = getUrlInfo()
    if(isOnPractisePage()) {

        // @ts-ignore
        renderWindow(leftComponent(user),await (new HomeworkView(
            attr["paperId"],
            attr["bizCode"],
            attr["homeworkId"],
            attr["platform"]
        )).surfaceComponent(),true)
    } else if(isInTaskPage()) {
        renderWindow(leftComponent(user),await (new TaskView(
            attr["homeworkId"]
        )).surfaceComponent(),true)
    } else if(isInCoursePage()) {
        renderWindow(leftComponent(user),await (new CourseView()).surfaceComponent(),true)
    } else {
        renderWindow(leftComponent(user),NoPage(),true)
    }
})

let donate = getMenuBtn("yellow",$(donate_img),"捐助",async ()=>{})

let logbtn = getMenuBtn("green",$(log_img),"程序日志记录",async ()=>{})

let statisticsbtn = getMenuBtn("purple",$(statisticsbtn_img),"统计",async ()=>{})
async function getUser() {
    let userInterface = new UserInfoInterface();
    let dat1 = await userInterface.getSchoolInfo()
    let dat0 = await userInterface.getBasicUserInfo();
    if(dat0 != null && dat1 != null) {
        return new UserModel(
            (<{[key:string]:string}>dat0)["userId"],
            (<{[key:string]:string}>dat0)["realName"],
            (<{[key:string]:string}>dat0)["photoUrl"],
            dat1.schoolId,
            getUserToken())
    } else {
        return new UserModel(undefined,undefined,undefined,undefined,undefined)
    }
}

$(async ()=>{
    user = await getUser()
    renderWindowMenu([open,donate,logbtn,statisticsbtn]);
    if(await SGM_getValue((version || "").split("-")[0].trim()+"-update") == null) {
        renderBackground();
        renderWindow(undefined,UpdatePage(update_log),false)
    }
})
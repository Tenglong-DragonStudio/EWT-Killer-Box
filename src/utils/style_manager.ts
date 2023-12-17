import * as mcss from "@/css/index.css"
import * as homeworkcss from '@/css/homeworkview.css'
import * as progress_bar from "@/css/progress_bar.css"
import * as circle from "@/css/circles.css"
import * as wait from "@/css/wait.css"
import * as ms_style from "@/css/multiselection.css"
import * as t_style from "@/css/task_view.css"
import * as c_style from "@/css/course_view.css"
import {SGM_addStyle} from "@/utils/function";

export const mstyle = mcss //提前声明css语句块,避免后续出现很大的幺蛾子
export const homework_style = homeworkcss
export const progress_style = progress_bar
export const circle_styles = circle
export const wait_style = wait
export const multiselection_style = ms_style
export const task_style = t_style
export const course_style = c_style

interface tempstylesheet {
    stylesheet:string
}
export function addStyle() {
    SGM_addStyle((<tempstylesheet><unknown>mstyle).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>homework_style).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>progress_style).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>circle_styles).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>wait_style).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>t_style).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>c_style).stylesheet)
    SGM_addStyle((<tempstylesheet><unknown>ms_style).stylesheet)
}
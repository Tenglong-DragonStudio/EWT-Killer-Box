import { ProgressBar } from "@/component_classes/progress_bar";
import { user } from "@/main";
import { MissionService } from "@/missions/ms_service";
import {getUrlInfo} from "@/utils/request";
import { getDateFromStamp } from "@/utils/stringutil";
import { mstyle, task_style } from "@/utils/style_manager";
import {View} from "@/views/pub_view";
import {MultiSelectionComponent} from "@/component_classes/multi_selection";

export class TaskView extends View {
    loading: boolean;
    prog?:ProgressBar
    mission: MissionService

    constructor(homeworkId:string) {
        super();
        this.loading = false;
        this.prog = undefined
        this.mission = new MissionService(homeworkId,user)
    }

    async surfaceComponent(): Promise<JQuery<HTMLElement>> {
        let data = await this.mission.getMissionInfo()
        let prog = await this.mission.getMissionProgress()

        let root = $(`<div></div>`);
        root.append(this.HeadComponent(data.homeworkTitle,data.startDate,data.endDate,prog))

        let date_comp = $(`<div></div>`)
        let subject_comp = $(`<div></div>`)

        
        let selection_comp = new MultiSelectionComponent({
            "日期": {
                container: date_comp,
                clickable: () => {
                    return true
                }
            },
            "科目": {
                container: subject_comp,
                clickable: () => {
                    return true
                }
            }
        },{
            height: "200px",
            width: "100%"
        })

        root.append(selection_comp.getPage())
        return root
    }

    private HeadComponent(title: string,timestamp_start:number,timestamp_end:number,prog:number) {
        let datestartstr = getDateFromStamp(timestamp_start.toString())
        let dateendstr = getDateFromStamp(timestamp_end.toString())
        this.prog = new ProgressBar(prog)

        let head = $(`<div class='${task_style.taskHeadComponent}'></div>`)
        head.append($(`<div class='${task_style.taskTitle}'>${title}</div>`))
        head.append($(`<div class='${task_style.taskDate}'>${datestartstr}-${dateendstr}</div>`))

        let prog_comp = $(`<div class='${task_style.taskProgCC}'></div>`)
        prog_comp.append($(`<div class='${task_style.taskProgC}'>
                                <div class='${task_style.taskProgL}'>
                                    进度
                                </div>
                                <div class='${task_style.taskProgR}'>
                                    ${Math.round(this.prog.value * 100)}%
                                </div>
                                </div>`
        ))
        prog_comp.append(this.prog.show())
        head.append(prog_comp)

        this.prog.slideFromZero()
        console.log(head)
        return head
        
    }
}
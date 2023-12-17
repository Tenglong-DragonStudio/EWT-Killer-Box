import {View} from "@/views/pub_view";
import {FinishCourseAbstractService} from "@/jumpclasses/jmpcls_service_abstract";
import {FinishCourseService} from "@/jumpclasses/jmpcls_course_service";
import {getUrlInfo} from "@/utils/request";
import {Course, GenCourseImpl} from "@/pojo/course";
export class CourseView extends View {
    coursedao:FinishCourseAbstractService
    homeworkid:string
    courseid:string
    lessonid:string

    constructor() {
        super();
        let info = getUrlInfo(document.location.href)
        this.lessonid=info["lessonId"]
        this.courseid=info["courseId"]
        this.homeworkid=info["homeworkId"]
        this.coursedao = new FinishCourseService(
            [new GenCourseImpl(
                this.lessonid,
                this.courseid,
                this.homeworkid,
                -1
            )]
        )
    }
    async surfaceComponent(): Promise<JQuery<HTMLElement>> {
        console.log(await this.coursedao.getCourseInfo(0))
        let root = $(`
            <div></div>
        `)


        return root;
    }

}
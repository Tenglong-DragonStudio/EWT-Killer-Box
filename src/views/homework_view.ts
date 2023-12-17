import {View} from "@/views/pub_view";
import {ExamPaperHomeworkService} from "@/finishhomeworks/fih_homework_service";
import {IHomeworkService} from "@/finishhomeworks/fih_service";
import {circle_styles, homework_style, mstyle} from "@/utils/style_manager";
import {ProgressBar} from "@/component_classes/progress_bar";
import {IQuestion, Option, OptionQuestion} from "@/pojo/option";
import {exam_img} from "@/utils/resources";
import {IPaper} from "@/pojo/fih_objects";
import {QuestionComponentDesc } from "@/pojo/QuestionCompont";
import config from "@/config";

export class HomeworkView extends View {
    private homeworkService : IHomeworkService;
    private allQues : number;
    private ques : number;

    private progress_s?: ProgressBar;
    private progress_text_f? : JQuery<HTMLElement>
    private progress_text_p? : JQuery<HTMLElement>

    private quesMainComponent : JQuery<HTMLElement>= $();
    private quesSideComponent : JQuery<HTMLElement>=$();
    private quesGroup : Array<QuestionComponentDesc>;
    private first_question_btn : JQuery<HTMLElement> = $();//第一道题目的序号

    private selected_question_btn : JQuery<HTMLElement> = $(); //选中的按钮 

    constructor(paperid:string | number,bizcode:string | number,homeworkid: string | number,platform:string | number) {
        super();
        this.homeworkService = new ExamPaperHomeworkService(
            <string>paperid,
            <string>bizcode,
            <string>platform
        );
        this.allQues = 0
        this.ques = 0
        this.progress_s = undefined
        this.progress_text_f = undefined
        this.progress_text_p = undefined
        this.quesGroup = new Array();
    }

    public async surfaceComponent(): Promise<JQuery<HTMLElement>> {
        let root = $(`<div></div>`)

        await this.homeworkService.getPaperInfo()
        let paper = await this.homeworkService.getPaper()
        let head = this.getHeadComponent(paper)

        let body = this.getBodyComponent();

        this.getComponentGroup(paper.questions)
        this.surfaceQuestionsComponent()
        this.first_question_btn.click()

        root.append(head)
        root.append(body)
        root.append(this.getFuncBtns(paper))
        return root;
    }

    private getFuncBtns(paper:IPaper) {
        let foot_func = $(`<div class='${homework_style.footFunc}'></div>'`)
        let left = $(`<div class='${homework_style.footFuncLeft}'></div>`)
        let right= $(`<div class='${homework_style.footFuncRight}'></div>`)

        let fill_choice_btn =  $(`<div class='${homework_style.homeworkSubmitBtn}'><label>填充所有题目...</label></div>`)
        let submit =  $(`<div class='${homework_style.homeworkSubmitBtn}'><label>一键交卷</label></div>`)
        left.append(fill_choice_btn)
        right.append(submit)
        foot_func.append(left)
        foot_func.append(right)

        fill_choice_btn.click(async ()=>{
            if(fill_choice_btn.hasClass(`${homework_style.homeworkSubmitBtn}`)) {
                fill_choice_btn.removeClass(`${homework_style.homeworkSubmitBtn}`)
                fill_choice_btn.addClass(`${homework_style.submitUnclickable}`)
                fill_choice_btn.html("<label>请等待填充...</label>")
                let res = await this.homeworkService.FillExamPaper(1,paper)
                this.ques = this.allQues = 0
                this.getDidCount((await this.homeworkService.getPaper()).questions) //重新计算数量
                if (this.progress_s instanceof ProgressBar) {
                    this.progress_s.slideValue(this.ques / this.allQues)
                }

                fill_choice_btn.html("<label>填写成功!刷新界面以继续...</label>")
            }
        })

        submit.click(async ()=>{
            if(submit.hasClass(`${homework_style.homeworkSubmitBtn}`)) {
                submit.removeClass(`${homework_style.homeworkSubmitBtn}`)
                submit.addClass(`${homework_style.submitUnclickable}`)
                submit.html("<label>请等待交卷...</label>")
                let res = await this.homeworkService.FillExamPaper(1,paper)
                let res2 = await this.homeworkService.SubmitPaper()
                submit.html("<label>交卷成功!5秒后将自动刷新...</label>")
                setTimeout(()=>{
                    location.reload()
                },5000)
            }
        })
        return foot_func
    }

    private getBodyComponent() {
        let answerMainComponent = $(`<div class='${homework_style.bodyComponent}'></div>`)
        let questionArea = $(`<div class='${homework_style.bodyQuesAreaComponent}'></div>`)
        let questionOptionsArea = $(`<div class='${homework_style.bodyQuessComponent}'></div>`)
        answerMainComponent.append(questionArea)
        answerMainComponent.append(questionOptionsArea)

        this.quesMainComponent = questionArea;
        this.quesSideComponent = questionOptionsArea
        return answerMainComponent
    }

    private surfaceQuestionsComponent() {
        let c = 0;
        for(let i of this.quesGroup) {
            let btn = $(`
            <div class='${homework_style.bodyQuesOptionDot}'>
                <div style='transform: scale(0.75)'>${i.index}</div>
            </div>
            `)

            if(c == 0) {
                this.first_question_btn = btn
            }

            btn.click(()=>{
                if(this.selected_question_btn==btn) return;
                this.selected_question_btn.removeClass(`${homework_style.bodyQuesOptionDotClicked}`)
                this.selected_question_btn = btn
                this.selected_question_btn.addClass(`${homework_style.bodyQuesOptionDotClicked}`)
                
                this.quesMainComponent.empty()
                if(i.parentComp != null) {
                    this.quesMainComponent.append(i.parentComp)
                }
                this.quesMainComponent.append(i.comp)

                $(`.${homework_style.analyzeContainer}`).css("display","none")
                $(`.${homework_style.analyzeContainer}`).slideUp()
                $(`.${homework_style.analyzeBack}`).html("<label>展开</label>")//点击其他按钮,收回解析

            })
            this.quesSideComponent.append(btn)
            c+=1
        }
    }
    
    /**
     * 获得整张试卷的显示控件.
     * @param ques 试卷题目总数
     * @param parentComp 试卷父题目的组件(可选)
     * @param prefix 题目前缀
     */
    private getComponentGroup(ques: IQuestion[],parentComp?:JQuery<HTMLElement>,prefix?: string) {
        for(let index = 0;index < ques.length;index++) {
            let questionNo = index+1;
            let quesNoName = prefix != undefined ? prefix + questionNo :questionNo.toString()
            let comp = this.getAnswerComponent(ques[index],quesNoName)
            let qcdesc;
            if(ques[index].childQuestions.length != 0) 
                this.getComponentGroup(ques[index].childQuestions,comp,quesNoName+"-")
            else {
                if(parentComp != undefined)
                    qcdesc = new QuestionComponentDesc(comp,quesNoName,parentComp)
                else
                    qcdesc = new QuestionComponentDesc(comp,quesNoName)
                this.quesGroup.push(qcdesc)
            } 
        }
    }

    private getAnswerComponent(question:IQuestion,questionNo:string) {
        let answerComponent = $(`<div class='${homework_style.homeworkQuesComponent}' id='${questionNo}'></div>`)
        let titleComponent = $(`<div class='${homework_style.homeworkQuesTitleComponent} ${homework_style.homeworkQuesComponentEle}'></div>`)
        let number = $(`<div class='${circle_styles.quesNumberCircle}'>No.${questionNo}</div>`)
        let score = $(`<div class='${circle_styles.quesNumberCircle}'>${question.score}分</div>`)
        let title_left =  $(`<div class='${homework_style.homeworkQuesTitleLeft}'></div>`)
        title_left.append($(`<div class='${circle_styles.quesNumberCircle} ${homework_style.homeworkQuesId}'>ID:${question.id}</div>`))
        title_left.append($(`<div class='${circle_styles.quesNumberCircle} ${homework_style.homeworkQuesType}'>${question.cateName}</div>`))
        titleComponent.append(number)
        if(question.score != undefined && question.score != 0)
            titleComponent.append(score)
        titleComponent.append(title_left)

        let content = $(`<div class='${homework_style.homeworkQuesContent}'></div>`)
        content.append($(`<div>${question.questionContent}</div>`))

        answerComponent.append(titleComponent)
        answerComponent.append(content)

        if((<OptionQuestion>question).options.length != 0) {

            let optionsBox = $(`<div class='${homework_style.homeworkQuesOptions}'></div>`)
            for(let i of (<OptionQuestion>question).options) {
                optionsBox.append(this.getOptionBox(i,question.rightAnswer?.indexOf(i.choice) != -1))
            }
            answerComponent.append(optionsBox)
        } else if (question.rightAnswer.length != 0) {
            let c = $(`<div class="${homework_style.quesAnalyse}"></div>`);
            let analTitle = $(`<div class='${homework_style.quesParse}'>答案</div>`)
            let analcontent = $(`<div class='${homework_style.answerContainer}'></div>`)
            for(let i of question.rightAnswer) {
                analcontent.append("<div>"+i+"</div>")
            }
            c.append(analTitle)
            c.append(analcontent)
            answerComponent.append(c)
        }

        if(question.analyse.length != 0) {
            let c = $(`<div class="${homework_style.quesAnalyse}"></div>`);
            let analTitle = $(`<div class='${homework_style.quesParse}'>解析</div>`)
            let analyzeC = $(`<div class='${homework_style.analyzeBack}'><label>展开</label></div>`)
            let analcontent = $(`<div class='${homework_style.analyzeContainer}'>${question.analyse}</div>`)
            
            this.quesMainComponent.on("click",`.${homework_style.analyzeBack}`,()=>{
                analcontent.slideToggle(config.animate.analyze_slide_toggle,()=>{
                    if(analcontent.css("display") == "none") {
                        analyzeC.html("<label>展开</label>")
                    } else  {
                        analyzeC.html("<label>收起</label>")
                    }
                })
            })

            analTitle.append(analyzeC)
            c.append(analTitle)
            c.append(analcontent)
            answerComponent.append(c)
            analcontent.slideUp(0)
        }
        return answerComponent
    }

    private getOptionBox(optionques:Option,right:boolean) {
        let option_box_root = $(`<div class='${homework_style.homeworkOptionBox}'></div>`)

        let opt_box_left = $(`<div 
                class='${homework_style.optionBoxOptionText} 
                        ${right ? homework_style.optionBoxOptionCorrectText : homework_style.optionBoxOptionNotCorrectText}'
                        >${optionques.choice} </div>`)
        let opt_right = $(`<div class='${homework_style.optionBoxOptionContent}'>${optionques.option}</div>`)
        option_box_root.append(opt_box_left)
        option_box_root.append(opt_right)

        return option_box_root
    }

    private getHeadComponent(paperinfo: IPaper) {
        //标题栏
        let titleUp = $(`<div class='${homework_style.homeworkComponent}' style='height: 85px;align-items:center;'></div>`)

        let image = $(`<div class='${homework_style.titleUpComponentImage}'></div>`)
        image.append($(`<img style='height: 100%;width: 120px' class='${homework_style.titleUpComponentImage}' src="${exam_img}"/>`))

        let bsinfo = $(`<div class='${homework_style.titleUpBasicInfo}'></div>`)
        bsinfo.append($(`<div class='${homework_style.titleUpContent}'>${paperinfo.title}</div>`))
        bsinfo.append($(`<div class='${homework_style.titleUpId}'>id:${paperinfo.paperId}</div>`))

        let foot = $(`<div class='${homework_style.titleUpProgressDetail}'></div>`)
        this.getDidCount(paperinfo.questions)
        //计算答题数量
        let prog = Math.round(this.ques / this.allQues * 100) / 100;
        let progressc = $(`<div class='${homework_style.titleUpProgress}'>进度:</div>`)
        this.progress_s = new ProgressBar(prog,{"margin-top":"2px"})
        //布置进度条

        progressc.append(this.progress_s.show())
        foot.append(this.progress_text_f || $())
        foot.append(this.progress_text_p || $())
        bsinfo.append(progressc)
        bsinfo.append(foot)
        titleUp.append(image)
        titleUp.append(bsinfo)
        
        this.progress_s.slideFromZero()
        return titleUp;
    }

    private getDidCount(question:IQuestion[]){
        for(let i of question) {
            if(i.childQuestions.length != 0)
                this.getDidCount(i.childQuestions)
            else {
                if(i.myAnswer.length != 0)
                    this.ques += 1
                this.allQues += 1
            }
        }
        let prog = Math.round(this.ques / this.allQues * 100) / 100;
        if(this.progress_text_f != undefined)
            this.progress_text_f.text(`完成题目数量:${this.ques}/${this.allQues} (小题)`)
        else
            this.progress_text_f = $(`<div>完成题目数量:${this.ques}/${this.allQues} (小题)</div>`)
        if (this.progress_text_p != undefined)
            this.progress_text_p.text(`${prog * 100}%`)
        else
            this.progress_text_p = $(`<div class="${homework_style.titleUpProgressDetailRight}">${prog * 100}%</div>`)
    }

}
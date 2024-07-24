import {Answer, OptionAnswerPayload, NotOptionAnswerPayload} from "../pojo/fih_objects";
import {IQuestion} from "@/pojo/option";
import * as assert from "assert";


export function processQuestionAnswer(questions:IQuestion[]):Answer[] {
    let res:Array<Answer> = [];

    getQuestionAnswer(questions);
    function getQuestionAnswer(questions:IQuestion[]) {
        for(let i=0;i<questions.length;i++) {
            let obj:Answer;
            if(questions[i]["childQuestions"].length != 0)  {
                getQuestionAnswer(questions[i]["childQuestions"]);
            }
            if(questions[i].options.length != 0)
                obj = new OptionAnswerPayload(
                    questions[i]["rightAnswer"],
                    <string>questions[i]["id"],
                    questions[i]["questionNo"],
                    50,
                    questions[i]["cate"]
                )
            else
                obj = new NotOptionAnswerPayload(
                    [1],
                    [],
                    questions[i]["cate"],
                    <string>questions[i]["id"],
                    questions[i]["questionNo"],
                    50,
                    questions[i]["score"]
                )
            res.push(obj);
        }
    }
    return res;
}



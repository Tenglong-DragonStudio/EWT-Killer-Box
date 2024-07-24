import config from "@/config";
import {homework_style, mstyle, progress_style} from "@/utils/style_manager";

export class ProgressBar {
    progresso: JQuery<HTMLElement>;
    progressi: JQuery<HTMLElement>;

    value: number
    public constructor(value: number,styles?:{[key:string]:string}) {

        this.progresso = $(`<div class='${progress_style.progressBarOut}'></div>`)
        this.progressi = $(`<div class='${progress_style.progressBarIn}'></div>`)
        if(styles != undefined)
            for(let i in styles) {
                this.progresso.css(i,styles[i])
            }
        this.value = value
        this.progresso.append(this.progressi)
    }

    public setValue(value: number) {
        this.progressi.css("width",value)
        this.value = value
    }

    public show() {
        this.progressi.css("width",this.value * 100 + "%")
        return this.progresso
    }

    public slideFromZero() {
        this.progressi.css("width","0")
        this.progressi.animate({
            width: "+=" + parseInt(String(this.value * 100))+"%"
        },config.animate.scrollbar_slide_from_zero)
    }

    public slideValue(value: number) {
        let prog = Math.abs(value - this.value)
        if(value < -1 || value > 1) {
            throw new Error("Invalid value.")
        }
        this.progressi.animate({
            width: (value < this.value ? "-=" : "+=") + parseInt(String(prog * 100))+"%"
        },prog < 0.2 && prog > -0.2 ? config.animate.scrollbar_0p_to_20p : 
            prog > 0.2 && prog < 0.4 ? config.animate.scrollbar_20p_to_40p :
            prog > 0.4 && prog < 0.6  ? config.animate.scrollbar_40p_to_60p : 
            prog > 0.6 && prog < 0.8  ? config.animate.scrollbar_60p_to_80p :
            config.animate.scrollbar_80p_to_100p)
    }
}
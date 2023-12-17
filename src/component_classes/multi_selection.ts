import {multiselection_style} from "@/utils/style_manager";
import {multiView, viewOption, viewOptionClicked} from "@/css/multiselection.css";

export class MultiSelectionComponent {
    private page : {[key:string] : {
        container: JQuery<HTMLElement>,
        clickable: Function //返回值为Boolean,意味着是否可以执行切换操作
        }} //页数Dictionary
    //原先计划用自己的Dictionary Class的,但是后来发现Dictionary Class不好遍历,就直接改用{[key:<type>]:<type>}形式}
    private menu : JQuery<HTMLElement>; //菜单栏

    private root : JQuery<HTMLElement>
    private selected_element: JQuery<HTMLElement>; //选中的page对应的按钮
    private selected_content : JQuery<HTMLElement>

    public constructor(views:{[key:string] : {
            container: JQuery<HTMLElement>,
            clickable: Function
        }},css: {[key:string]:string}) {
        this.menu = $(`<div class='${multiselection_style.viewOptions}'></div>`); //菜单栏实例化
        this.page = views

        this.root = $(`<div class='${multiselection_style.multiViewBox}'></div>`)
        this.selected_element = $()
        this.selected_content = $(`<div class='${multiView}'></div>`)

        let first = true;
        for(let c in views) {
            let option = $(`<div class='${multiselection_style.viewOption}'><label>${c}</label></div>`) //选项按钮
            option.on('click', async () => {
                this.selected_content.empty()
                if (await this.page[c].clickable()) {
                    this.changePage(option, c)
                }
            })
            if (first) {
                this.changePage(option, c)
                first = false
            } //确保是第一个元素
            this.menu.append(option)
        }

        this.root.append(this.menu)
        this.root.append(this.selected_content)

        for(let i in css) {
            this.root.css(i,css[i])
        }
    }

    public addPage(key:string,page:JQuery<HTMLElement>,click: Function) {
        this.page[key].container = page
        this.page[key].clickable = click
    }

    /**
     * 将各个Components组装成一个完整的组件
     */
    public getPage() {
        return this.root
    }

    private changePage(menuElement:JQuery<HTMLElement>,key:string) {
        if(this.selected_element != undefined) {
            this.selected_element.removeClass(`${viewOptionClicked}`)
            this.selected_element.addClass(`${viewOption}`)
        }

        menuElement.addClass(`${viewOptionClicked}`)
        menuElement.removeClass(`${viewOption}`)

        this.selected_content.append(this.page[key].container) //不重新赋值，不能让变量根指针改变
        console.log(typeof this.selected_content)
        this.selected_element = menuElement
    }
}
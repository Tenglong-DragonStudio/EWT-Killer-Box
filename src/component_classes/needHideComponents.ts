export class needHideComponents {
    eventComponents: Array<{comp: JQuery<HTMLElement>,bind: Function}>
    wholeComponent: JQuery<HTMLElement>

    public constructor() {
        this.wholeComponent = $()
        this.eventComponents = new Array();
    }

    public append(jq:JQuery<HTMLElement>) {
        this.wholeComponent.append(jq)
    }

    public empty() {
        this.wholeComponent.empty()
        this.eventComponents = new Array()
    }

    public find(selector:string) {
        return this.wholeComponent.find(selector)
    }

    public appendEventComponent(jq:JQuery<HTMLElement>,fn:Function) {
        this.eventComponents.push({comp:jq,bind:fn})
        this.wholeComponent.append(jq)
    }

    public appendNhc(nhc:needHideComponents) {
        for(let c of nhc.eventComponents) {
            this.eventComponents.push(c)
        }
        this.wholeComponent.append(nhc.wholeComponent)
    }
}
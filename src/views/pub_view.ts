
export abstract class View {
    lock:boolean;
    elements:Array<JQuery<Element>>;

    constructor() {
        this.lock = false
        this.elements = new Array<JQuery<Element>>();
    }

    setStatus(lock:boolean) {
        this.lock = lock;
    }

    abstract surfaceComponent() : Promise<JQuery<HTMLElement>> | JQuery<HTMLElement>;
}
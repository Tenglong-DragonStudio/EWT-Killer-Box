import {getUrlInfo} from "@/utils/request";
import * as url from "url";
import {View} from "@/views/pub_view";

export class SceneTaskView extends View {
    sceneid:string;
    constructor(url:string) {
        super();
        let urlinfo = getUrlInfo(url)
        this.sceneid = urlinfo["sceneId"]
    }

    surfaceComponent(): JQuery<HTMLElement> {
        let root = $("<div class='window-root'></div>");

        return root
    }
}
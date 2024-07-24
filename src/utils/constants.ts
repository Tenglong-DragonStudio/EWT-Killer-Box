import { PhoneType} from "@/pojo/jmpcls_objects"
import * as style from "@/css/index.css";

export let update_log = `
本次更新为重大更新.<br>
1.刷课功能改进,现在教师端也可以同步更新看课时间,而不为0.<br>
2.取消一键填写选择题的功能,更改为一键交卷.<br>
3.修复了Safari端的样式适配问题.<br>
4.取消刷课时随机IP的功能,改为随机机型.<br>
5.修复了一些Bug.<br>
<br>
rebuild-1:<br>
迁移项目:开始界面+r2331的刷课/交卷的所有核心(不包括gui).<br>
最后更新时间:2023.08.17<br>
<span style="color: red">本程序仅供内测人员使用,严禁乱传!有很多Bug是正常的!</span><br>
<span style="color: red">自r2332起,程序由Typescript重构,所以你现在插件里面的代码都是编译混淆过的,ts源码不对外公开!</span><br>
<span style="color: blue">注意:本款插件刷课完成后有一定的数据延迟,刷课完成如果进度只加了一点是正常的,等过个大约30秒-5分钟就会自动更新到100%!</span>`

export let first_read_text = `
各位加群的同学,你们好:
    <p class='`+style.firstViewPa+`'>我是Bash,是插件的制作者.很高兴我制作的插件给你们带来了便利.但是,我现在想和你们谈谈关于学习的事情.</p>
    <p class='`+style.firstViewPa+`'>我们都知道,学习是为自己学的,而不是为了父母,老师,更不是为了欺骗ewt的那点数据.而最后上高考考场的是我们这些高中生,而不是我们的亲人.</p>
    <p class='`+style.firstViewPa+`'>当然,你也许认为我在说大道理,并且会问我,我们现阶段学的文化课,以后能用得上多少呢?曾经我也在问.直到我开始入门Unity游戏引擎,问题貌似才有了答案.</p>
    <p class='`+style.firstViewPa+`'>在Unity中也有力学,而且也是用向量来描述的.而在U3D中,力学基于三维坐标系,这意味着要学好数学的选必1第1章(人教A版).我后来又看了Unity入门书籍的目录,里面有一个章节讲述U3D的一些基础数学知识.而这个章节涉及矩阵,向量,欧拉角,四元数等.我看了后很惊讶,这叫基础吗?但是后来一回想,这确实是基础.而我要是不学文化课,意味着这些”基础”都学不会,也就是说我连最简单的3d游戏都做不了.纵然买菜用不到三角,但是在Unity中这些算是最基础的.所以文化课并非”学了没用”,以后对你的事业是很有帮助的.</p>
    <p class='`+style.firstViewPa+`'>而我有个朋友,因为中考失利被分流到了职高.他现在特别想学习,跟我说他的技术遇到了瓶颈因为没有好老师.而我们现在都是高中生,要是再摆烂的话,真的对不起他们这类人了.</p>
    <p class='`+style.firstViewPa+`'>好了,篇幅有限,就先说到这儿了.期待你们学业有成.</p>
Bash,<br>
7.15/23
`
export let headers:{[key:string]:{
    [key:string]:any
}} = {
    CommonHeader: {
        "Origin": "https://web.ewt360.com",
        "Referer": "https://web.ewt360.com/mystudy/",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0"
    },
    CourseHeader: {
        "Origin": "https://teacher.ewt360.com",
        "Referer": "https://teacher.ewt360.com/",
        "Referurl" : "https://teacher.ewt360.com/ewtbend/bend/index/index.html#/homework/play-videos",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0"
    },
    FinishCourseHeader: {
        "Host": "clog.ewt360.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "okhttp/3.12.0",
        "sn": "moses_ewt_video"
    }
}

export let coursetagsreflection = {
    "课程讲": {
        "lessonid": "lessonId",
        "courseid": "courseId",
        "videoType": 1
    },
    "校本视频": {
        "lessonid": "id",
        "courseid": "",
        "videoType": 6
    }
}

export const MODELS:PhoneType = {
    "Apple":  {
        models: [
            {
                name: "iPhone 11",
                resolution: "1792*828",
            },
            {
                name: "iPhone 12",
                resolution: "2532*1170",
            },
            {
                name: "iPhone 13 Pro Max",
                resolution: "2778*1284",
            },
            {
                name: "iPhone 14 Pro Max",
                resolution: "2796*1290",
            },
            {
                name: "iPhone XS Max",
                resolution: "2688*1442",
            }
        ],
        os: "IOS",
        os_version: "17"
    },
    "Huawei": {
        models: [
            {
                name: "Huawei Mate 50",
                resolution: "2700*1224"
            },
            {
                name: "Huawei P60",
                resolution: "3200*1440"
            },
            {
                name: "Huawei Nova 5",
                resolution: "2340*1080"
            }
        ],
        os:"Android",
        os_version: "12"
    },
    "Xiaomi": {
        models: [
            {
                name: "Redmi 8",
                resolution: "1417*720"
            },
            {
                name: "Xiaomi 12",
                resolution: "2400x1080"
            },
            {
                name: "Xiaomi 13 Ultra",
                resolution: "3200*1440"
            },
            {
                name: "Redmi K60",
                resolution: "3200*1440"
            },
            {
                name: "Redmi K50",
                resolution: "3200*1440"
            }
        ],
        os:"Android",
        os_version: "14"
    },
}
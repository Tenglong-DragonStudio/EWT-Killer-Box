import {request, validateReturn} from "../utils/request";
import {headers} from "../utils/constants"

export class UserInfoInterface {
    GET_USER_URL = "https://web.ewt360.com/api/usercenter/user/baseinfo";
    SCHOOL_URL = "https://gateway.ewt360.com/api/eteacherproduct/school/getSchoolUserInfo";

    async getBasicUserInfo() {
        let res:any= await request("GET",this.GET_USER_URL,headers["CommonHeader"],null);
        return validateReturn(res["responseText"])
    }

    async getSchoolInfo() {
        let res:any = await request("GET",this.SCHOOL_URL,headers["CourseHeader"]);
        let data:any= validateReturn(res["responseText"])
        return data;
    }

}
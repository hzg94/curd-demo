import {proxy} from 'valtio';


let ProjectSettingStatus = proxy(
    JSON.parse(localStorage.getItem('ProjectSettingStatus') as string) || {
        ProjectName: "App",
        ProjectTheme:"defaultAlgorithm",
        Swagger:false,
        Lombok:false,
        host:"localhost",
        user:"root",
        password:"root",
        database:"mysql"
    }
)

const SetProjectSettingStatus = (ProjectSettingStatusPath:string,ProjectSettingStatusValue:any) => {
    Reflect.set(ProjectSettingStatus,ProjectSettingStatusPath,ProjectSettingStatusValue)
    localStorage.setItem('ProjectSettingStatus',JSON.stringify(ProjectSettingStatus))
}


export {
    ProjectSettingStatus,
    SetProjectSettingStatus
}

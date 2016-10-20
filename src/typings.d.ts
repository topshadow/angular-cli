// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var require: any;
declare var module: any;

/**
 * 用户接口
 * 帐号 username
 * 昵称 nickname
 * 密码 password
 * 出生日期 birthday
 * 性别 gender 
 * 用户的网站 websites
 * @interface User
 */
interface User {
    username: string;
    nickname?: string;
    birthday?: Date;
    password?: string;
    gender?: string;
    websites?: any[];

}

interface Page {
    //页面的路径
    path: string;

    //导航名
    name: string;

    //也买男路径    
    parts: Part[];
}

interface Website {
    name: string;
    description: string;
    // 二级域名
    SLD: string;
    // 数字,方便比较和上传
    createDt: number;

    pages?: Page[]

    //firebase的$key,$value引用,用于update
    tag: string;
    publisher?: string;

    publishDt?: number;

    $key?: string;
    $value?: string;
    $exists?: any;

}


interface Part {
    picture: string;
    selector: string;
    content?: any;
    styles?: any;
}
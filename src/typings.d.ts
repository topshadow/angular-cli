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
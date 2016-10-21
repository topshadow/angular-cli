import { EveryPagePreview } from '../pages/every-page-preview/every-page-preview';

import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

import { Platform, MenuController, Nav, Events, NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { ViewWebsitePage } from '../pages/index';

import {
  HelloIonicPage,

  SignInPage,
  SignUpPage,
  MyWebsitePage, TemplateShop, FriendsPage
} from '../pages/index';



@Component({
  templateUrl: 'app.component.html',
  providers: [],
  styles: ['src/styles.scss']
})
export class MyApp implements OnInit, AfterViewInit {
  @ViewChild(Nav) nav: Nav;

  user: User;
  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;

  loginPages: Array<{ title: string, component: any }> = [
    { title: '模板商城', component: TemplateShop },
    { title: '我的站点', component: MyWebsitePage },
    { title: '友站', component: FriendsPage }
  ];
  docs: FirebaseListObservable<any>;
  constructor(
    public platform: Platform,
    public menuCtrl: MenuController,
    public af: AngularFire,
    public events: Events,


  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '登录界面', component: SignInPage },
      { title: '旅烨建站系统', component: HelloIonicPage },
      { title: "注册页面", component: SignUpPage }
    ];

    // 登录成功的时候,    
    this.events.subscribe('login:successfully', (user) => {
      this.user = user[0];
      this.menuCtrl.enable(true);
      this.menuCtrl.swipeEnable(true);
      this.menuCtrl.open();
    });
  }

  toPreveiwPage() {

  }

  ngAfterViewInit() {
    this.menuCtrl.enable(false, 'menu');
    this.menuCtrl.swipeEnable(false, 'menu');

    //如果path 符合  /用户名/网站二级域名,则渲染该网站
    if (/^\/\w+\/\w+/.test(location.pathname)) {
      this.menuCtrl.close();
      var parseUserRegExp = /\w+/g;
      let [username] = parseUserRegExp.exec(location.pathname);
      let [SLD] = parseUserRegExp.exec(location.pathname);

      this.nav.setRoot(EveryPagePreview, { username, SLD });

      return;
    };
  }

  openTemplateShop() {
    this.menuCtrl.close();
    this.nav.setRoot(TemplateShop);
  }

  ngOnInit() {
    // 用于测试的自动登录

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //   StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menuCtrl.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  exit() {
    location.href = location.host;
  }
}

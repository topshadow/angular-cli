
import { EveryPagePreview } from '../pages/every-page-preview/every-page-preview';
import { Component, ViewChild, OnInit } from '@angular/core';

import { Platform, MenuController, Nav, Events } from 'ionic-angular';
// import {Statub} from 'ionic-native';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {
  HelloIonicPage,

  SignInPage,
  SignUpPage,
  MyWebsitePage, TemplateShop, FriendsPage
} from '../pages/index';



@Component({
  templateUrl: 'app.component.html',
  providers: []
})
export class MyApp implements OnInit {
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
    public menu: MenuController,
    public af: AngularFire,
    public events: Events

  ) {
    this.initializeApp();
    this.menu.enable(true, "unlogin");
    this.menu.enable(false, "login");

    if (window.location.pathname.replace('/', '')) {
      this.menu.close()
      this.rootPage = EveryPagePreview;
    };


    // set our app's pages
    this.pages = [
      { title: '登录界面', component: SignInPage },
      { title: '旅烨建站系统', component: HelloIonicPage },
      { title: "注册页面", component: SignUpPage }
    ];

    // 登录成功的时候,    
    this.events.subscribe('login:successfully', (user) => {
      this.user = user[0];
      this.menu.enable(true, "login"),
        this.menu.enable(false, "unlogin")
    });
  }

  toPreveiwPage() {

  }

  openTemplateShop() {
    this.menu.close();
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
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

import { TemplateShop } from '../pages/template-shop/template-shop';
import { EveryPagePreview } from '../pages/every-page-preview/every-page-preview';
import { Component, ViewChild, OnInit } from '@angular/core';

import { Platform, MenuController, Nav, Events } from 'ionic-angular';
// import {Statub} from 'ionic-native';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { HelloIonicPage, ListPage, SignInPage, ItemDetailsPage, SignUpPage } from '../pages/index';



@Component({
  templateUrl: 'app.component.html',
  providers: []
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;
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
      { title: "list", component: ListPage },
      { title: "注册页面", component: SignUpPage }
    ];

    // 登录成功的时候,    
    this.events.subscribe('login:successfully', (userEventData) => {
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

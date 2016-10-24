
import { Page404 } from './404.page';

import { NumberDatePip, TagPipe, BackgroundImageDirective, PassTimePipe } from '../tools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import { MyApp } from './app.component';
import {
    Theme1Navbar, EditNavbarModal,
    Theme1Carousel, Theme1Features,
    Theme1RecentWorks, Theme1Service,
    Theme1Footer
} from '../themes/index';

// pc 版本

import {
    MainPage, PcMyWebsite,
    PcTemplateShop, PcFriends,
    PcNav, PcSignIn, PcSignUp, PcEditWebsite,
    PcViewMyWebsite
} from '../PC/index';

import {
    SignInPage,
    HelloIonicPage,
    SignUpPage,
    EveryPage,
    EveryPagePreview,
    TemplateShop,
    MyWebsitePage,
    NewWebsiteModal,
    ViewWebsitePage,
    EditWebsitePage,
    NewPageModal, FriendsPage,
    WebsiteListModal, PublishWebsiteModal, EditPartModal
} from '../pages/index';




export const firebaseConfig = {
    apiKey: "AIzaSyDRZod_Ur5T8K7V3kCV3rpRP9NjLGkQBAQ",
    authDomain: "topshadow-accda.firebaseapp.com",
    databaseURL: "https://topshadow-accda.firebaseio.com",
    storageBucket: "topshadow-accda.appspot.com",
    messagingSenderId: "1069236481103"
}


@NgModule({
    declarations: [
        MyApp,
        HelloIonicPage,
        SignInPage,
        SignUpPage, EveryPage, EveryPagePreview,
        TemplateShop,
        Theme1Navbar,
        MyWebsitePage,
        NewWebsiteModal,
        NumberDatePip,
        TagPipe,
        ViewWebsitePage,
        EditWebsitePage,
        BackgroundImageDirective,
        NewPageModal, FriendsPage, WebsiteListModal,
        Theme1Carousel, Theme1Features, Theme1RecentWorks, Theme1Service,
        Theme1Footer, PublishWebsiteModal, PassTimePipe, Page404,
        EditNavbarModal, EditPartModal,

        //PC
        MainPage, PcMyWebsite, PcFriends, PcTemplateShop, PcNav, PcSignIn,
        PcSignUp, PcEditWebsite, PcViewMyWebsite
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        DragulaModule,
        IonicModule.forRoot(MyApp)
    ],
    providers: [],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HelloIonicPage,
        SignInPage, SignUpPage,
        EveryPage, EveryPagePreview,
        NewWebsiteModal,
        TemplateShop, MyWebsitePage,
        ViewWebsitePage, EditWebsitePage, NewPageModal, FriendsPage,
        WebsiteListModal, Theme1Footer, PublishWebsiteModal, Page404,
        EditNavbarModal, EditPartModal,
        //
        MainPage, PcMyWebsite, PcFriends, PcTemplateShop, PcNav, PcSignIn,
        PcSignUp, PcEditWebsite, PcViewMyWebsite

    ]
})
export class AppModule { }

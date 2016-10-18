import { NumberDatePip, TagPipe, BackgroundImageDirective } from '../tools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import { MyApp } from './app.component';
import { Theme1Navbar, Theme1Carousel, Theme1Features, Theme1RecentWorks, Theme1Service } from '../themes/index';


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
    NewPageModal, FriendsPage, WebsiteListModal
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




        Theme1Navbar, Theme1Carousel, Theme1Features, Theme1RecentWorks, Theme1Service
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
        ViewWebsitePage, EditWebsitePage, NewPageModal, FriendsPage
        , WebsiteListModal
    ]
})
export class AppModule { }

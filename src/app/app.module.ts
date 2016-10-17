
import { NumberDatePip, BackgroundImageDirective } from '../tools';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';


import { MyApp } from './app.component';
import { Theme1Navbar } from '../themes/index';


import {
    SignInPage,
    ListPage,
    ItemDetailsPage,
    HelloIonicPage,
    SignUpPage,
    EveryPage,
    EveryPagePreview,
    TemplateShop,
    MyWebsitePage,
    NewWebsiteModal,
    ViewWebsitePage,
    EditWebsitePage,
    NewPageModal
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
        ListPage,
        ItemDetailsPage,
        SignInPage,
        SignUpPage, EveryPage, EveryPagePreview,
        TemplateShop,
        Theme1Navbar,
        MyWebsitePage,
        NewWebsiteModal,
        NumberDatePip,
        ViewWebsitePage,
        EditWebsitePage,
        BackgroundImageDirective,
        NewPageModal
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
        ListPage, ItemDetailsPage,
        SignInPage, SignUpPage,
        EveryPage, EveryPagePreview,
        NewWebsiteModal,
        TemplateShop, MyWebsitePage,
        ViewWebsitePage, EditWebsitePage, NewPageModal
    ]
})
export class AppModule { }




import { SignInPage, ListPage, ItemDetailsPage, HelloIonicPage, SignUpPage, EveryPage, EveryPagePreview, TemplateShop } from '../pages/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';


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
        TemplateShop
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(firebaseConfig),
        IonicModule.forRoot(MyApp)
    ],
    providers: [],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HelloIonicPage, ListPage, ItemDetailsPage, SignInPage, SignUpPage, EveryPage, EveryPagePreview, TemplateShop]
})
export class AppModule { }

import {BrowserModule }from '@angular/platform-browser'; 
import {NgModule }from '@angular/core'; 
import {FormsModule }from '@angular/forms'; 
import {HttpModule }from '@angular/http'; 

import {AngularFireModule}from 'angularfire2'; 
import {MaterialModule}from '../lib/all/index'; 

import {AppComponent }from './app.component'; 

export const firebaseConfig =  {
apiKey:"AIzaSyDRZod_Ur5T8K7V3kCV3rpRP9NjLGkQBAQ", 
authDomain:"topshadow-accda.firebaseapp.com", 
databaseURL:"https://topshadow-accda.firebaseio.com",
storageBucket:"topshadow-accda.appspot.com", 
messagingSenderId:"1069236481103"
}


@NgModule({
declarations:[
    AppComponent
  ], 
imports:[
    BrowserModule, 
FormsModule, 
HttpModule, 
AngularFireModule.initializeApp(firebaseConfig), 
MaterialModule.forRoot()
], 
providers:[], 
bootstrap:[AppComponent]
})
export class AppModule {}

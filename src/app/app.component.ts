import {Component }from '@angular/core'; 
import {AngularFire, FirebaseObjectObservable}from 'angularfire2'; 

@Component( {
selector:'app-root', 
templateUrl:'./app.component.html', 
styleUrls:['./app.component.css']
})
export class AppComponent {
docs:FirebaseObjectObservable < any > ; 
title = 'app works!'; 
constructor(af:AngularFire) {
this.docs = af.database.object('docs'); 
}
}

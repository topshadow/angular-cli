import { Component } from '@angular/core';


@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/images/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/images/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/images/ica-slidebox-img-3.png",
    }
  ];


}

/* 	<ion-slides pager>
		<ion-slide *ngFor="let slide of slides">
			<ion-toolbar>
				<ion-buttons end>
					<button ion-button>下一页</button>
				</ion-buttons>
			</ion-toolbar>
			<img [src]="slide.image" class="slide-image" />
			<h2 class="slide-title" [innerHTML]="slide.title"></h2>
			<p [innerHTML]="slide.description"></p>
		</ion-slide>
		<ion-slide>
			<ion-toolbar>
			</ion-toolbar>
			<img src="assets/images/ica-slidebox-img-4.png" class="slide-image" />
			<h2 class="slide-title">Ready to Play?</h2>
			<button ion-button large clear icon-right>
        Continue
        <ion-icon name="arrow-forward"></ion-icon>
      </button>
		</ion-slide>
	</ion-slides>
  */
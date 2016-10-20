
import { Component, ElementRef, OnInit } from '@angular/core';
import { Nav } from 'ionic-angular';
import { SignInPage, SignUpPage } from '../../pages/index';
import { Slides } from 'ionic-angular';

@Component({
  templateUrl: './hello-ionic.html',
  styleUrls: []
})
export class HelloIonicPage implements OnInit {
  signInPage = SignInPage;
  signUpPage = SignUpPage;

  constructor(private nav: Nav, private el: ElementRef) {

  }

  slides = [
    {
      title: "欢迎来到旅烨建站系统",
      description: "相应式框架,适应所有平台，更能在手机端优秀的体验方式建站",
      image: "assets/images/ica-slidebox-img-1.png",
    },
    {
      title: "所见所得,任意收藏",
      description: "花样主题任意组合搭配,海量网站一键收藏发布。",
      image: "assets/images/ica-slidebox-img-2.png",
    },
    {
      title: "云上更无忧",
      description: "海量存储空间,不限网站模板数量，随时随地,任意平台一键发布您的网站,优站更有好礼相送",
      image: "assets/images/ica-slidebox-img-3.png",
    }
  ];

  ngOnInit() {

  }

  slidesOptions =
  {
    autoplay: 1000,
    loop: false,
    initialSlide: 0,
    speed: 3000
  }


  isSlidesStop(slidesEl: Slides) {
    if (slidesEl.isEnd()) {
      slidesEl.options.loop = false;
      slidesEl.options.speed = 0;
    }
  }

  openPage(page: Component) {
    this.nav.setRoot(page);
  }

}

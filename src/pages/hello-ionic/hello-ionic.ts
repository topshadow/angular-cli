import { Component } from '@angular/core';


@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  parts: Part[] = [{ picture: 'assets/images/1.png' }];

  // 记得切换主题 themes,标签页
  optionParts: Part[] = [{ picture: 'assets/images/1.png' }, { picture: 'assets/images/2.png' }, { picture: 'assets/images/3.png' }];

  constructor() {
    // debug dragula
    window['bug'] = () => {
      console.log(this.parts);
      console.log(this.optionParts);
    };

  }
}

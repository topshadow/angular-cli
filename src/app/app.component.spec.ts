import { MyappPage } from '../../e2e/app.po';
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MyApp } from './app.component';

describe('App: Myapp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyApp
      ],
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(MyApp);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(MyappPage);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(MyApp);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
}); 

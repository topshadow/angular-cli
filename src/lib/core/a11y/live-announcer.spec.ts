import {inject, fakeAsync, tick, ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MdLiveAnnouncer, LIVE_ANNOUNCER_ELEMENT_TOKEN} from './live-announcer';


describe('MdLiveAnnouncer', () => {
  let announcer: MdLiveAnnouncer;
  let ariaLiveElement: Element;
  let fixture: ComponentFixture<TestApp>;

  describe('with default element', () => {
    beforeEach(() => TestBed.configureTestingModule({
      declarations: [TestApp],
      providers: [MdLiveAnnouncer]
    }));

    beforeEach(fakeAsync(inject([MdLiveAnnouncer], (la: MdLiveAnnouncer) => {
      announcer = la;
      ariaLiveElement = getLiveElement();
      fixture = TestBed.createComponent(TestApp);
    })));

    afterEach(() => {
      // In our tests we always remove the current live element, because otherwise we would have
      // multiple live elements due multiple service instantiations.
      ariaLiveElement.parentNode.removeChild(ariaLiveElement);
    });

    it('should correctly update the announce text', fakeAsync(() => {
      let buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      buttonElement.click();

      // This flushes our 100ms timeout for the screenreaders.
      tick(100);

      expect(ariaLiveElement.textContent).toBe('Test');
    }));

    it('should correctly update the politeness attribute', fakeAsync(() => {
      announcer.announce('Hey Google', 'assertive');

      // This flushes our 100ms timeout for the screenreaders.
      tick(100);

      expect(ariaLiveElement.textContent).toBe('Hey Google');
      expect(ariaLiveElement.getAttribute('aria-live')).toBe('assertive');
    }));

    it('should apply the aria-live value polite by default', fakeAsync(() => {
      announcer.announce('Hey Google');

      // This flushes our 100ms timeout for the screenreaders.
      tick(100);

      expect(ariaLiveElement.textContent).toBe('Hey Google');
      expect(ariaLiveElement.getAttribute('aria-live')).toBe('polite');
    }));
  });

  describe('with a custom element', () => {
    let customLiveElement: HTMLElement;

    beforeEach(() => {
      customLiveElement = document.createElement('div');

      return TestBed.configureTestingModule({
        declarations: [TestApp],
        providers: [
          {provide: LIVE_ANNOUNCER_ELEMENT_TOKEN, useValue: customLiveElement},
          MdLiveAnnouncer,
        ],
      });
    });

    beforeEach(inject([MdLiveAnnouncer], (la: MdLiveAnnouncer) => {
        announcer = la;
        ariaLiveElement = getLiveElement();
      }));


    it('should allow to use a custom live element', fakeAsync(() => {
      announcer.announce('Custom Element');

      // This flushes our 100ms timeout for the screenreaders.
      tick(100);

      expect(customLiveElement.textContent).toBe('Custom Element');
    }));
  });
});


function getLiveElement(): Element {
  return document.body.querySelector('[aria-live]');
}

@Component({template: `<button (click)="announceText('Test')">Announce</button>`})
class TestApp {
  constructor(public live: MdLiveAnnouncer) { };

  announceText(message: string) {
    this.live.announce(message);
  }
}


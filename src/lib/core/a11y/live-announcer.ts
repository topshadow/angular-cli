import {
  Injectable,
  OpaqueToken,
  Optional,
  Inject
} from '@angular/core';

export const LIVE_ANNOUNCER_ELEMENT_TOKEN  = new OpaqueToken('mdLiveAnnouncerElement');

export type AriaLivePoliteness = 'off' | 'polite' | 'assertive';

@Injectable()
export class MdLiveAnnouncer {

  private _liveElement: Element;

  constructor(@Optional() @Inject(LIVE_ANNOUNCER_ELEMENT_TOKEN) elementToken: any) {

    // We inject the live element as `any` because the constructor signature cannot reference
    // browser globals (HTMLElement) on non-browser environments, since having a class decorator
    // causes TypeScript to preserve the constructor signature types.
    this._liveElement = elementToken || this._createLiveElement();
  }

  /**
   * @param message Message to be announced to the screenreader
   * @param politeness The politeness of the announcer element.
   */
  announce(message: string, politeness: AriaLivePoliteness = 'polite'): void {
    this._liveElement.textContent = '';

    // TODO: ensure changing the politeness works on all environments we support.
    this._liveElement.setAttribute('aria-live', politeness);

    // This 100ms timeout is necessary for some browser + screen-reader combinations:
    // - Both JAWS and NVDA over IE11 will not announce anything without a non-zero timeout.
    // - With Chrome and IE11 with NVDA or JAWS, a repeated (identical) message won't be read a
    //   second time without clearing and then using a non-zero delay.
    // (using JAWS 17 at time of this writing).
    setTimeout(() => this._liveElement.textContent = message, 100);
  }

  private _createLiveElement(): Element {
    let liveEl = document.createElement('div');

    liveEl.classList.add('md-visually-hidden');
    liveEl.setAttribute('aria-atomic', 'true');
    liveEl.setAttribute('aria-live', 'polite');

    document.body.appendChild(liveEl);

    return liveEl;
  }

}

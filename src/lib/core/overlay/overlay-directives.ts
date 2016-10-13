import {
    NgModule,
    ModuleWithProviders,
    Directive,
    TemplateRef,
    ViewContainerRef,
    OnInit,
    Input,
    OnDestroy,
    ElementRef
} from '@angular/core';
import {Overlay, OVERLAY_PROVIDERS} from './overlay';
import {OverlayRef} from './overlay-ref';
import {TemplatePortal} from '../portal/portal';
import {OverlayState} from './overlay-state';
import {ConnectionPositionPair} from './position/connected-position';
import {PortalModule} from '../portal/portal-directives';


/** Default set of positions for the overlay. Follows the behavior of a dropdown. */
let defaultPositionList = [
  new ConnectionPositionPair(
      {originX: 'start', originY: 'bottom'},
      {overlayX: 'start', overlayY: 'top'}),
  new ConnectionPositionPair(
      {originX: 'start', originY: 'top'},
      {overlayX: 'start', overlayY: 'bottom'}),
];


/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
@Directive({
  selector: '[overlay-origin]',
  exportAs: 'overlayOrigin',
})
export class OverlayOrigin {
  constructor(private _elementRef: ElementRef) { }

  get elementRef() {
    return this._elementRef;
  }
}



/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
@Directive({
  selector: '[connected-overlay]'
})
export class ConnectedOverlayDirective implements OnInit, OnDestroy {
  private _overlayRef: OverlayRef;
  private _templatePortal: TemplatePortal;

  @Input() origin: OverlayOrigin;
  @Input() positions: ConnectionPositionPair[];

  // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.

  constructor(
      private _overlay: Overlay,
      templateRef: TemplateRef<any>,
      viewContainerRef: ViewContainerRef) {
    this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
  }

  get overlayRef() {
    return this._overlayRef;
  }

  /** TODO: internal */
  ngOnInit() {
    this._createOverlay();
  }

  /** TODO: internal */
  ngOnDestroy() {
    this._destroyOverlay();
  }

  /** Creates an overlay and attaches this directive's template to it. */
  private _createOverlay() {
    if (!this.positions || !this.positions.length) {
      this.positions = defaultPositionList;
    }

    let overlayConfig = new OverlayState();
    overlayConfig.positionStrategy =
        this._overlay.position().connectedTo(
            this.origin.elementRef,
            {originX: this.positions[0].overlayX, originY: this.positions[0].originY},
            {overlayX: this.positions[0].overlayX, overlayY: this.positions[0].overlayY});

    this._overlayRef = this._overlay.create(overlayConfig);
    this._overlayRef.attach(this._templatePortal);
  }

  /** Destroys the overlay created by this directive. */
  private _destroyOverlay() {
    this._overlayRef.dispose();
  }
}


@NgModule({
  imports: [PortalModule],
  exports: [ConnectedOverlayDirective, OverlayOrigin],
  declarations: [ConnectedOverlayDirective, OverlayOrigin],
})
export class OverlayModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OverlayModule,
      providers: OVERLAY_PROVIDERS,
    };
  }
}

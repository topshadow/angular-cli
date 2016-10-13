import {NgModule, ModuleWithProviders, Injector, ComponentRef, Injectable} from '@angular/core';
import {
  Overlay,
  OverlayModule,
  PortalModule,
  OverlayRef,
  OverlayState,
  ComponentPortal,
  OVERLAY_PROVIDERS,
} from '@angular2-material/core';
import {ComponentType} from '@angular2-material/core';
import {MdDialogConfig} from './dialog-config';
import {MdDialogRef} from './dialog-ref';
import {DialogInjector} from './dialog-injector';
import {MdDialogContainer} from './dialog-container';

export {MdDialogConfig} from './dialog-config';
export {MdDialogRef} from './dialog-ref';


// TODO(jelbourn): add shortcuts for `alert` and `confirm`.
// TODO(jelbourn): add support for opening with a TemplateRef
// TODO(jelbourn): add `closeAll` method
// TODO(jelbourn): add backdrop
// TODO(jelbourn): default dialog config
// TODO(jelbourn): focus trapping
// TODO(jelbourn): potentially change API from accepting component constructor to component factory.



/**
 * Service to open Material Design modal dialogs.
 */
@Injectable()
export class MdDialog {
  constructor(private _overlay: Overlay, private _injector: Injector) { }

  /**
   * Opens a modal dialog containing the given component.
   * @param component Type of the component to load into the load.
   * @param config
   */
  open<T>(component: ComponentType<T>, config: MdDialogConfig): MdDialogRef<T> {
    let overlayRef = this._createOverlay(config);
    let dialogContainer = this._attachDialogContainer(overlayRef, config);

    return this._attachDialogContent(component, dialogContainer, overlayRef);
  }

  /**
   * Creates the overlay into which the dialog will be loaded.
   * @param dialogConfig The dialog configuration.
   * @returns A promise resolving to the OverlayRef for the created overlay.
   */
  private _createOverlay(dialogConfig: MdDialogConfig): OverlayRef {
    let overlayState = this._getOverlayState(dialogConfig);
    return this._overlay.create(overlayState);
  }

  /**
   * Attaches an MdDialogContainer to a dialog's already-created overlay.
   * @param overlay Reference to the dialog's underlying overlay.
   * @param config The dialog configuration.
   * @returns A promise resolving to a ComponentRef for the attached container.
   */
  private _attachDialogContainer(overlay: OverlayRef, config: MdDialogConfig): MdDialogContainer {
    let containerPortal = new ComponentPortal(MdDialogContainer, config.viewContainerRef);

    let containerRef: ComponentRef<MdDialogContainer> = overlay.attach(containerPortal);
    containerRef.instance.dialogConfig = config;

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created MdDialogContainer.
   * @param component The type of component being loaded into the dialog.
   * @param dialogContainer Reference to the wrapping MdDialogContainer.
   * @param overlayRef Reference to the overlay in which the dialog resides.
   * @returns A promise resolving to the MdDialogRef that should be returned to the user.
   */
  private _attachDialogContent<T>(
      component: ComponentType<T>,
      dialogContainer: MdDialogContainer,
      overlayRef: OverlayRef): MdDialogRef<T> {
    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    let dialogRef = <MdDialogRef<T>> new MdDialogRef(overlayRef);

    // When the dialog backdrop is clicked, we want to close it.
    overlayRef.backdropClick().subscribe(() => dialogRef.close());

    // We create an injector specifically for the component we're instantiating so that it can
    // inject the MdDialogRef. This allows a component loaded inside of a dialog to close itself
    // and, optionally, to return a value.
    let dialogInjector = new DialogInjector(dialogRef, this._injector);

    let contentPortal = new ComponentPortal(component, null, dialogInjector);

    let contentRef = dialogContainer.attachComponentPortal(contentPortal);
    dialogRef.componentInstance = contentRef.instance;

    return dialogRef;
  }

  /**
   * Creates an overlay state from a dialog config.
   * @param dialogConfig The dialog configuration.
   * @returns The overlay configuration.
   */
  private _getOverlayState(dialogConfig: MdDialogConfig): OverlayState {
    let state = new OverlayState();

    state.hasBackdrop = true;
    state.positionStrategy = this._overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();

    return state;
  }
}


@NgModule({
  imports: [OverlayModule, PortalModule],
  exports: [MdDialogContainer],
  declarations: [MdDialogContainer],
  entryComponents: [MdDialogContainer],
})
export class MdDialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdDialogModule,
      providers: [MdDialog, OVERLAY_PROVIDERS],
    };
  }
}

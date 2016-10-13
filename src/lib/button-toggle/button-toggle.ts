import {
    NgModule,
    ModuleWithProviders,
    Component,
    ContentChildren,
    Directive,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewEncapsulation,
    forwardRef,
    AfterViewInit
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormsModule,
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {BooleanFieldValue, MdUniqueSelectionDispatcher} from '@angular2-material/core';

export type ToggleType = 'checkbox' | 'radio';



/**
 * Provider Expression that allows md-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 */
export const MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdButtonToggleGroup),
  multi: true
};

var _uniqueIdCounter = 0;

/** A simple change event emitted by either MdButtonToggle or MdButtonToggleGroup. */
export class MdButtonToggleChange {
  source: MdButtonToggle;
  value: any;
}

/** Exclusive selection button toggle group that behaves like a radio-button group. */
@Directive({
  selector: 'md-button-toggle-group:not([multiple])',
  providers: [MD_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR],
  host: {
    'role': 'radiogroup',
  },
})
export class MdButtonToggleGroup implements AfterViewInit, ControlValueAccessor {
  /** The value for the button toggle group. Should match currently selected button toggle. */
  private _value: any = null;

  /** The HTML name attribute applied to toggles in this group. */
  private _name: string = `md-radio-group-${_uniqueIdCounter++}`;

  /** Disables all toggles in the group. */
  private _disabled: boolean = null;

  /** The currently selected button toggle, should match the value. */
  private _selected: MdButtonToggle = null;

  /** Whether the button toggle group is initialized or not. */
  private _isInitialized: boolean = false;

  /** The method to be called in order to update ngModel. */
  private _controlValueAccessorChangeFn: (value: any) => void = (value) => {};

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  onTouched: () => any = () => {};

  /** Event emitted when the group's value changes. */
  private _change: EventEmitter<MdButtonToggleChange> = new EventEmitter<MdButtonToggleChange>();
  @Output() get change(): Observable<MdButtonToggleChange> {
    return this._change.asObservable();
  }

  /** Child button toggle buttons. */
  @ContentChildren(forwardRef(() => MdButtonToggle))
  _buttonToggles: QueryList<MdButtonToggle> = null;

  /** TODO: internal */
  ngAfterViewInit() {
    this._isInitialized = true;
  }

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this._updateButtonToggleNames();
  }

  @Input()
  @BooleanFieldValue()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = (value != null && value !== false) ? true : null;
  }

  @Input()
  get value(): any {
    return this._value;
  }

  set value(newValue: any) {
    if (this._value != newValue) {
      this._value = newValue;

      this._updateSelectedButtonToggleFromValue();

      // Only emit a change event if the view is completely initialized.
      // We don't want to emit a change event for the initial values.
      if (this._isInitialized) {
        this._emitChangeEvent();
      }
    }
  }

  @Input()
  get selected() {
    return this._selected;
  }

  set selected(selected: MdButtonToggle) {
    this._selected = selected;
    this.value = selected ? selected.value : null;

    if (selected && !selected.checked) {
      selected.checked = true;
    }
  }

  private _updateButtonToggleNames(): void {
    if (this._buttonToggles) {
      this._buttonToggles.forEach((toggle) => {
        toggle.name = this._name;
      });
    }
  }

  // TODO: Refactor into shared code with radio.
  private _updateSelectedButtonToggleFromValue(): void {
    let isAlreadySelected = this._selected != null && this._selected.value == this._value;

    if (this._buttonToggles != null && !isAlreadySelected) {
      let matchingButtonToggle = this._buttonToggles.filter(
          buttonToggle => buttonToggle.value == this._value)[0];

      if (matchingButtonToggle) {
        this.selected = matchingButtonToggle;
      } else if (this.value == null) {
        this.selected = null;
        this._buttonToggles.forEach(buttonToggle => {
          buttonToggle.checked = false;
        });
      }
    }
  }

  /** Dispatch change event with current selection and group value. */
  private _emitChangeEvent(): void {
    let event = new MdButtonToggleChange();
    event.source = this._selected;
    event.value = this._value;
    this._controlValueAccessorChangeFn(event.value);
    this._change.emit(event);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this.value = value;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}

/** Multiple selection button-toggle group. */
@Directive({
  selector: 'md-button-toggle-group[multiple]',
})
export class MdButtonToggleGroupMultiple {
  /** Disables all toggles in the group. */
  private _disabled: boolean = null;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = (value != null && value !== false) ? true : null;
  }
}

@Component({
  moduleId: module.id,
  selector: 'md-button-toggle',
  templateUrl: 'button-toggle.html',
  styleUrls: ['button-toggle.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MdButtonToggle implements OnInit {
  /** Whether or not this button toggle is checked. */
  private _checked: boolean = false;

  /** Type of the button toggle. Either 'radio' or 'checkbox'. */
  _type: ToggleType;

  /** The unique ID for this button toggle. */
  @HostBinding()
  @Input()
  id: string;

  /** HTML's 'name' attribute used to group radios for unique selection. */
  @Input()
  name: string;

  /** Whether or not this button toggle is disabled. */
  private _disabled: boolean = null;

  /** Value assigned to this button toggle. */
  private _value: any = null;

  /** Whether or not the button toggle is a single selection. */
  private _isSingleSelector: boolean = null;

  /** The parent button toggle group (exclusive selection). Optional. */
  buttonToggleGroup: MdButtonToggleGroup;

  /** The parent button toggle group (multiple selection). Optional. */
  buttonToggleGroupMultiple: MdButtonToggleGroupMultiple;

  /** Event emitted when the group value changes. */
  private _change: EventEmitter<MdButtonToggleChange> = new EventEmitter<MdButtonToggleChange>();
  @Output() get change(): Observable<MdButtonToggleChange> {
    return this._change.asObservable();
  }

  constructor(@Optional() toggleGroup: MdButtonToggleGroup,
              @Optional() toggleGroupMultiple: MdButtonToggleGroupMultiple,
              public buttonToggleDispatcher: MdUniqueSelectionDispatcher) {
    this.buttonToggleGroup = toggleGroup;

    this.buttonToggleGroupMultiple = toggleGroupMultiple;

    if (this.buttonToggleGroup) {
      buttonToggleDispatcher.listen((id: string, name: string) => {
        if (id != this.id && name == this.name) {
          this.checked = false;
        }
      });

      this._type = 'radio';
      this.name = this.buttonToggleGroup.name;
      this._isSingleSelector = true;
    } else {
      // Even if there is no group at all, treat the button toggle as a checkbox so it can be
      // toggled on or off.
      this._type = 'checkbox';
      this._isSingleSelector = false;
    }
  }

  ngOnInit() {
    if (this.id == null) {
      this.id = `md-button-toggle-${_uniqueIdCounter++}`;
    }

    if (this.buttonToggleGroup && this._value == this.buttonToggleGroup.value) {
      this._checked = true;
    }
  }

  get inputId(): string {
    return `${this.id}-input`;
  }

  @HostBinding('class.md-button-toggle-checked')
  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(newCheckedState: boolean) {
    if (this._isSingleSelector) {
      if (newCheckedState) {
        // Notify all button toggles with the same name (in the same group) to un-check.
        this.buttonToggleDispatcher.notify(this.id, this.name);
      }
    }

    this._checked = newCheckedState;

    if (newCheckedState && this._isSingleSelector && this.buttonToggleGroup.value != this.value) {
      this.buttonToggleGroup.selected = this;
    }
  }

  /** MdButtonToggleGroup reads this to assign its own value. */
  @Input()
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (this._value != value) {
      if (this.buttonToggleGroup != null && this.checked) {
        this.buttonToggleGroup.value = value;
      }
      this._value = value;
    }
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    let event = new MdButtonToggleChange();
    event.source = this;
    event.value = this._value;
    this._change.emit(event);
  }

  @HostBinding('class.md-button-toggle-disabled')
  @Input()
  get disabled(): boolean {
    return this._disabled || (this.buttonToggleGroup != null && this.buttonToggleGroup.disabled) ||
        (this.buttonToggleGroupMultiple != null && this.buttonToggleGroupMultiple.disabled);
  }

  set disabled(value: boolean) {
    this._disabled = (value != null && value !== false) ? true : null;
  }

  /** Toggle the state of the current button toggle. */
  private _toggle(): void {
    this.checked = !this.checked;
  }

  /** Checks the button toggle due to an interaction with the underlying native input. */
  _onInputChange(event: Event) {
    event.stopPropagation();

    if (this._isSingleSelector) {
      // Propagate the change one-way via the group, which will in turn mark this
      // button toggle as checked.
      this.checked = true;
      this.buttonToggleGroup.selected = this;
      this.buttonToggleGroup.onTouched();
    } else {
      this._toggle();
    }

    // Emit a change event when the native input does.
    this._emitChangeEvent();
  }

  /** TODO: internal */
  _onInputClick(event: Event) {

    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `slide-toggle` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }
}


@NgModule({
  imports: [FormsModule],
  exports: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
  declarations: [MdButtonToggleGroup, MdButtonToggleGroupMultiple, MdButtonToggle],
})
export class MdButtonToggleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MdButtonToggleModule,
      providers: [MdUniqueSelectionDispatcher]
    };
  }
}

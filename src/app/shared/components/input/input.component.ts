import { Component, Input, forwardRef } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { DisplayMessage } from 'src/app/utils/generic-validator';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rpw-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  label: string = "campo de texto";
  @Input()
  placeholder: string = 'campo de texto';
  @Input()
  type: string = 'text';
  @Input()
  required: boolean = false;
  @Input()
  name: string = 'campo';
  @Input()
  matcher: ErrorStateMatcher;
  @Input()
  displayMessage: DisplayMessage = {};

  field= "";

  onChanged: Function = () => { };
  onTouched: Function = () => { };

  // sets the value used by the ngModel of the element
  set value(val: string) {
    this.field = val
    this.onChanged(val)
    this.onTouched(val)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }

}

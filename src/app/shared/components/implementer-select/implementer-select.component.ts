import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {shareReplay, Subscription} from "rxjs";

import { MatSelectModule } from "@angular/material/select";

import { AppFacadeService } from "../../../store/state/app.facade.service";

@Component({
  selector: 'implementer-select',
  templateUrl: 'implementer-select.component.html',
  styleUrls: ['implementer-select.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ImplementerSelectComponent),
    multi: true
  }]
})
export class ImplementerSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private _isDisabled = false;
  private subControl = new Subscription();
  @Input() set disabled(value: boolean) {
    if (!value) return;
    this._isDisabled = value;
  }

  get disabled() {
    return this._isDisabled;
  }

  selectControl = new FormControl({ value: '', disabled: this.disabled });
  implementer$ = this.appFacadeService.implementer$.pipe(shareReplay());
  onChange(_: string) {}

  constructor(
    private appFacadeService: AppFacadeService
  ) {}

  ngOnInit() {
    this.subControl.add(
      this.selectControl.valueChanges.subscribe(status => {
        this.onChange(status as string);
      })
    )
  }

  ngOnDestroy() {
    if(this.subControl) this.subControl.unsubscribe();
  }

  writeValue(implementer: string) {
    this.selectControl.setValue(implementer);
  }

  registerOnChange(fn: (status: string)=>void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: ()=>void): void {}

}

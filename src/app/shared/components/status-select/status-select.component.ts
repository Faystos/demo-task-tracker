import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { shareReplay, Subscription } from "rxjs";

import { MatSelectModule } from '@angular/material/select';

import { TaskStatus } from "../../../types/task.type";
import { AppFacadeService } from "../../../store/state/app.facade.service";

@Component({
  selector: 'status-select',
  templateUrl: 'status-select.component.html',
  styleUrls: ['status-select.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StatusSelectComponent),
    multi: true
  }]
})
export class StatusSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
  status$ = this.appFacadeService.status$.pipe(shareReplay())
  onChange(_: TaskStatus) {}

  constructor(
    private appFacadeService: AppFacadeService
  ) {}

  ngOnInit() {
    this.subControl.add(
      this.selectControl.valueChanges.subscribe(status => {
        this.onChange(status as TaskStatus);
      })
    )
  }

  ngOnDestroy() {
    if(this.subControl) this.subControl.unsubscribe();
  }

  writeValue(status: TaskStatus) {
    this.selectControl.setValue(status);
  }

  registerOnChange(fn: (status: TaskStatus)=>void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: ()=>void): void {}
}

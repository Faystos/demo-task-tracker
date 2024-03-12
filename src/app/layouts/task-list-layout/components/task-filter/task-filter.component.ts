import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { shareReplay, Subscription } from "rxjs";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {
  ImplementerSelectComponent
} from "../../../../shared/components/implementer-select/implementer-select.component";
import { StatusSelectComponent } from "../../../../shared/components/status-select/status-select.component";
import { TaskFilterService } from "../../../../shared/services/task-filter.service";
import { ITask } from "../../../../types/task.type";
import { AppFacadeService } from "../../../../store/state/app.facade.service";
import {IFilterType} from "../../../../types/filter.type";

@Component({
  selector: 'task-filter',
  templateUrl: 'task-filter.component.html',
  styleUrls: ['task-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    StatusSelectComponent,
    ImplementerSelectComponent
  ]
})

export class TaskFilterComponent implements OnInit, OnDestroy {
  formFilter = new FormGroup({
    statusControl: new FormControl<string>(''),
    implementerControl: new FormControl<string>(''),
    deadline: new FormControl<Date | null>(null)
  })


  private subControls = new Subscription();
  private taskList: ITask[] = [];
  private taskList$ = this.appFacadeService.taskList$.pipe(
    shareReplay()
  );

  constructor(
    private appFacadeService: AppFacadeService,
    private taskFilterService: TaskFilterService
  ) {}

  ngOnInit() {
    this.subControls.add(
      this.taskList$.subscribe(value => {
        this.taskList = [ ...value ];
      })
    )
  }

  ngOnDestroy() {
    if (this.subControls) this.subControls.unsubscribe();
  }

  onApplyFilter() {
    this.taskFilterService.filteringTaskList(this.taskList, this.getFilterValue());
  }

  onResetFilter() {
    this.formFilter.controls.statusControl.setValue('');
    this.formFilter.controls.implementerControl.setValue('');
    this.formFilter.controls.deadline.setValue(null);
    this.taskFilterService.filteringTaskList(this.taskList, this.getFilterValue());
  }

  private getFilterValue(): IFilterType {
    const valueForm = this.formFilter.value;
    return {
      status: valueForm.statusControl as string,
      implementer: valueForm.implementerControl as string,
      deadline: valueForm.deadline as Date | null
    }
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

import { TaskComponent } from "../../shared/components/task/task.component";
import { AppFacadeService } from "../../store/state/app.facade.service";

import { ITask } from "../../types/task.type";

@Component({
  templateUrl: 'details-task.component.html',
  selector: 'details-task-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TaskComponent
  ]
})
export class DetailsTaskComponent implements OnInit {
  private taskId!: string;

  task$ = this.appFacadeService.taskList$
    .pipe(
      map((tasks: ITask[]) => tasks.filter((value) => +value.id === +this.taskId)[0])
    )

  constructor(
    private appFacadeService: AppFacadeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(value => {
      this.taskId = `${value['id']}`;
    });
  }
}

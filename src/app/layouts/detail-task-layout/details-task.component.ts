import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import { map } from "rxjs";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TaskComponent } from "../../shared/components/task/task.component";
import { AppFacadeService } from "../../store/state/app.facade.service";

import { ITask } from "../../types/task.type";

@Component({
  templateUrl: 'details-task.component.html',
  selector: 'details-task-component',
  styleUrls: ['details-task.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TaskComponent,
    MatButtonModule,
    MatIconModule
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(value => {
      this.taskId = `${value['id']}`;
    });
  }

  onBack() {
    this.router.navigate(['']);
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { AppFacadeService } from "./store/state/app.facade.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private appFacadeService: AppFacadeService) {
    this.appFacadeService.fetchTaskList();
    this.appFacadeService.userList$.subscribe(value => console.log('task', value));
  }
}

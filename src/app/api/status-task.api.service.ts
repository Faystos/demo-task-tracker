import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { IStatus } from "../types/status.type";

@Injectable({ providedIn: "root" })
export class StatusTaskApiService {
  readonly uri = 'assets/status-task.moc.json'

  constructor(
    private http: HttpClient
  ) {}

  getStatus() {
    return this.http.get<IStatus[]>(this.uri);
  }
}

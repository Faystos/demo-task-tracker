import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { IImplementer } from "../types/implementer.type";

@Injectable({ providedIn: "root" })
export class ImplementerApiService {
  readonly uri = 'assets/implementer.moc.json'

  constructor(
    private http: HttpClient
  ) {}

  getImplementer() {
    return this.http.get<IImplementer[]>(this.uri);
  }
}

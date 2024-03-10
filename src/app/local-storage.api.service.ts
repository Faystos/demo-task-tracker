import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LocalStorageApiService {
  get<T>(token: string): T[] {
    const items = localStorage.getItem(token);
    return items ? JSON.parse(items) : [];
  }

  set<T>(token: string, items: T[]) {
    localStorage.setItem(token, JSON.stringify(items));
  }

  remove(token: string) {
    localStorage.removeItem(token);
  }

  isItemStorage(token: string): boolean {
    return !!localStorage.getItem(token);
  }
}

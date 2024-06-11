import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: string) {
    localStorage.setItem(
      key,
      value
    );
    return {key: value};
  }

  async getItem(key: string) {
    return await localStorage.getItem(key) || '';
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearItems() {
    localStorage.clear();
  }
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private token: string = '';

  private _headers: Promise<Headers> = this.storage.getItem('token').then((token) => {
    const today = new Date();
    this.token = token;
    return new Headers({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': `application/json`,
      'accept': 'application/json'
    }); 
  });

  private getHeaders() {
    return new Headers(
      {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': `application/json`,
        'accept': 'application/json'
      }
    );
  }

  constructor(
    private storage: StorageService
  ) { }

  async get(endpoint: string) {
    return this._headers.then(() => {
      return fetch(environment.apiUrl + endpoint, {
        method: 'GET',
        headers: this.getHeaders(),
        mode: 'cors'
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  }

  async post(endpoint: string, data: any) {
    return this._headers.then((headers) => {
      return fetch(
        environment.apiUrl + endpoint,
        {
          method: 'POST',
          headers: this.getHeaders(),
          mode: 'cors',
          body: JSON.stringify(data)
        }
      );
    }).then((response: any) => {
      return response.json();
    }).then((data: any) => {
      return data;
    });
  }

  async put(endpoint: string, data: any) {
    return this._headers.then((headers) => {
      return fetch(environment.apiUrl + endpoint, {
        method: 'PUT',
        headers: this.getHeaders(),
        mode: 'cors',
        body: JSON.stringify(data)
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  }

  async delete(endpoint: string) {
    return this._headers.then((headers) => {
      return fetch(environment.apiUrl + endpoint, {
        method: 'DELETE',
        headers: this.getHeaders(),
        mode: 'cors'
      });
    })
    .then((response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
  }

  async clearToken() {
    this.token = '';
  }

  async setToken(token: string) {
    this.token = token;
  }

}

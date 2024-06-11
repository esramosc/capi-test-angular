import { Injectable } from '@angular/core';
import {ENDPOINTS} from '../api/api.endpoints'
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(
    private apiService: ApiService
  ) { }

  async getContacts(page: number) {
    const endpoint = `${ENDPOINTS.contacts.index}?page=${page}`;
    const response = await this.apiService.get(endpoint);
    return response;
  }

  async getContactDetails(contactId: number) {
    const endpoint = `${ENDPOINTS.contacts.show}/${contactId}`;
    const response = await this.apiService.get(endpoint);
    return response;
  }

}

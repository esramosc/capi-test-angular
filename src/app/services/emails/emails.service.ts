import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ENDPOINTS } from '../api/api.endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {

  constructor(
    private apiService: ApiService
  ) { }

  async updateEmail(params: any, emailId: number) {
    const endpoint = `${ENDPOINTS.emails.update}/${emailId}`;
    const response = await this.apiService.put(endpoint, params);
    return response;
  }
  
  async removeEmail(emailId: number) {
    const endpoint = `${ENDPOINTS.emails.delete}/${emailId}`;
    const response = await this.apiService.delete(endpoint);
    return response;
  }
}

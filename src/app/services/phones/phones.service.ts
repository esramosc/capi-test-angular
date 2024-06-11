import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ENDPOINTS } from '../api/api.endpoints';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  constructor(
    private apiService: ApiService
  ) { }

  async updatePhone(params: any, phoneId: number) {
    const endpoint = `${ENDPOINTS.phones.update}/${phoneId}`;
    const response = await this.apiService.put(endpoint, params);
    return response;
  }

  async removePhone(phoneId: number) {
    const endpoint = `${ENDPOINTS.phones.delete}/${phoneId}`;
    const response = await this.apiService.delete(endpoint);
    return response;
  }
}

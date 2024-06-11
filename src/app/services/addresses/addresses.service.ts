import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ENDPOINTS } from '../api/api.endpoints';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(
    private apiService: ApiService
  ) { }

  async updateAddress(params: any, addressId: number) {
    const endpoint = `${ENDPOINTS.addresses.update}/${addressId}`;
    const response = await this.apiService.put(endpoint, params);
    return response;
  }

  async removeAddress(addressId: number) {
    const endpoint = `${ENDPOINTS.addresses.delete}/${addressId}`;
    const response = await this.apiService.delete(endpoint);
    return response;
  }
}

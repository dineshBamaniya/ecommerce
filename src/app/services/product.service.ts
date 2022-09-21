import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.API;
  constructor(public http: HttpClient) {}
  // create(data: any) {
  //   return this.http.post(`${this.url}products`, data);
  // }
  getAllProduct() {
    return this.http.get(`${this.url}products`);
  }
  // getSingleProduct(id: number) {
  //   return this.http.get(`${this.url}products/` + id);
  // }
  // updateProduct(id: number, data: any) {
  //   return this.http.put(`${this.url}products/` + id, data);
  // }
  // deleteProduct(id: number) {
  //   return this.http.delete(`${this.url}products/` + id);
  // }
}

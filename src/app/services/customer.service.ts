import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  url = environment.API;
  constructor(private http: HttpClient) {}
  signupCustomer(data: any) {
    return this.http.post(`${this.url}customers`, data);
  }
  loginCustomer(data: any) {
    return this.http.post(`${this.url}customerlogin`, data);
  }
  addToCart(payload) {
    return this.http.post(`${this.url}customer/cart`, payload);
  }
  getItem(id: any) {
    return this.http.get(`${this.url}customer/cartitem/` + id);
  }
  removeItem(id:any,data){
    // let params=new HttpParams();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };

    return this.http.delete(`${this.url}customer/cartitem/` + id,options);
  }
  IncrementItem(data: any) {
    
    return this.http.patch(`${this.url}customer/cartitemIncre`, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isAuthenticated() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }
  getcount(id: number) {
    return this.http.get(`${this.url}customer/cartitemcount/` + id);
  }
}

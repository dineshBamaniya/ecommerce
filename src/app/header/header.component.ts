import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { CountService } from '../services/count.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  count: number;
  islogin = false;
  customer: any = [];
  cartitems: any = [];
  constructor(private cs: CustomerService, private counter: CountService) {
    if (localStorage.getItem('token')) {
      this.customer = jwt_decode(localStorage.getItem('token'))['customer'];
      //this.count=this.counter.getCount();
    }
  }
  ngOnInit() {}

  logout() {
    console.log('logout');
    localStorage.removeItem('token');
  }

  ngDoCheck() {
    if (localStorage.getItem('token')) {
      this.customer = jwt_decode(localStorage.getItem('token'))['customer'];
    }
    this.islogin = this.cs.isAuthenticated();
    this.count = this.counter.getCount();
  }
}

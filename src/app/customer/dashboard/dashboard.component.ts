import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';
import jwt_decode from 'jwt-decode';
import { NotificationService } from 'src/app/services/notification.service';
import { CountService } from 'src/app/services/count.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  count: number;
  customer: any = [];
  products: any = [];
  cartitems: any;
  constructor(
    private productservice: ProductService,
    private cs: CustomerService,
    public counter: CountService,
    private router: Router,
    private notification: NotificationService
  ) {
    if (localStorage.getItem('token')) {
      this.customer = jwt_decode(localStorage.getItem('token'))['customer'];
    }
  }

  ngOnInit() {
    this.getcartItem(this.customer['id']);
    this.allProduct();
    this.getcount();
  }

  allProduct() {
    this.productservice.getAllProduct().subscribe(
      (response) => {
        if (response) {
          this.products = response;
          if (this.cartitems && this.products) {
            this.products.map((newPro) => {
              this.cartitems.filter((carPro) => {
                if (carPro.p_id === newPro.p_id) {
                  newPro.select = true;
                }
              });
            });
          }
        }
      },
      (error) => console.log(error)
    );
  }

  getcount() {
    this.cs.getcount(this.customer['id']).subscribe((res) => {
      this.count = Object.values(res)[0];
      this.counter.setCount(this.count);
    });
  }

  getcartItem(id) {
    this.cs.getItem(id).subscribe(
      (res) => {
        this.cartitems = res;
      }
      //(err) => console.log(err)
    );
  }

  addtocart(event: any) {
    let data = {
      p_id: event.target.id,
      user_id: this.customer.id,
    };
    this.cs.addToCart(data).subscribe(
      (res) => {
        this.notification.showSuccess(res['msg'], '', {
          timeOut: 1000,
        });
        this.getcount();
        this.getcartItem(this.customer['id']);
        this.allProduct();
      },
      (error) => console.log(error)
    );
  }

  goToCart() {
    return this.router.navigate(['/customer/cart']);
  }
}

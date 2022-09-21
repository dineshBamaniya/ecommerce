import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CountService } from '../../services/count.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  count: number;
  cartitems: any = [];
  customer: any = [];
  Totalpay: number;
  constructor(
    private router: Router,
    private cs: CustomerService,
    private counter: CountService,
    private notification: NotificationService
  ) {
    if (localStorage.getItem('token')) {
      this.customer = jwt_decode(localStorage.getItem('token'))['customer'];
    }
  }
  ngOnInit(): void {
    this.getcount();
    this.getcartItem(this.customer['id']);
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
        console.log('res----', res);
        
        this.cartitems = res;
        this.Totalpay = this.cartitems.reduce(
          (accumulator, current) =>
            accumulator + current.price * current.quantity,
          0
        );
      },
      (err) => console.log(err)
    );
  }
  plushQuantity(event: any) {
    var data = {
      action: event.target.value,
      p_id: event.target.id,
      user_id: this.customer['id'],
    };
    this.cs.IncrementItem(data).subscribe(
      (res) => {
        if (res != null) {
          this.getcartItem(this.customer['id']);
        }
      },
      (err) => console.log(err)
    );
  }
  removeproduct(event) {
    var cartitemid = event.target.id;
    var obj = this.cartitems.find((x) => x.id == cartitemid);

    this.cs.removeItem(cartitemid, obj).subscribe(
      (res) => {
        if (res[0] != 0) {
          this.notification.showSuccess(
            'Product Delete from Cart Successfully',
            '',
            {
              timeOut: 1000,
            }
          );
          this.getcartItem(this.customer['id']);
          this.getcount();
        }
      },
      (err) => this.notification.showError('Product Not Delete From Cart ', '')
    );
  }

  goto() {
    this.router.navigate(['/customer/dashboard']);
  }
}

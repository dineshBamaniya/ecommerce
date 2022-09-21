import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private cs: CustomerService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get f() {
    return this.loginform.controls;
  }
  onSubmit() {
    if (this.loginform.invalid) {
      return;
    }
    this.cs.loginCustomer(this.loginform.value).subscribe(
      (res) => {
        if (res['access_token']) {
          this.notification.showSuccess("Login successfully", '', {
            timeOut: 1000,
          });
          localStorage.setItem('token', res['access_token']);
          this.router.navigate(['/customer/dashboard']);
        }
      },
      (err) =>
        this.notification.showError('Password and email are not valid', '')
    );
  }
}

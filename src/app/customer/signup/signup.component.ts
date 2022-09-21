import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MustMatch} from '../../services/helper.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupform:FormGroup

  constructor(private fb:FormBuilder,public cs:CustomerService,private notification:NotificationService,private router:Router) { 
  }
  ngOnInit(): void {
    this.signupform = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['',],
  }, 
  {
      validator: MustMatch('password', 'confirmPassword')
  }
  );
  }
  get f() { return this.signupform.controls; }
  onSubmit(){

    this.cs.signupCustomer(this.signupform.value).subscribe(
      (res)=>{
        console.log(res,'signup response');
        if(res['access_token']){
          this.notification.showSuccess("User SignUp Successfully", '', {
            timeOut: 1000,
          });
          localStorage.setItem('token',res['access_token'])
          this.router.navigate(['/customer/dashboard']);
        }
      },
      (err)=>console.log(err)
    )
  }
}

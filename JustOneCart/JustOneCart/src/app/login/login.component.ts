import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AuthenticationService } from '../services/authentication.service';
import{UserService} from '../services/user.service';
import { User } from '../models/user';
import { userLogin } from '../models/userLogin';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  users: User[];
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  validity: boolean;
  loginModel: userLogin;
  public localVar: string;
 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,

    private userService: UserService,

  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  onSubmit(): void {

    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.f.username.value + " " + this.f.password.value);
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          if (data != null && data != ""  )
          {
            
            if(data.userrole=='admin')
            {
              this.router.navigate(['/home']);
            }
            
           else
           this.router.navigate(['/home']);
          }
          else
            alert('Invalid Login credentials ! Please try again');
        },
        error => {
          this.loading = false;
        });
  }


  openDialog(id:any)
  {
    this.router.navigate(['/register']);
   }


}




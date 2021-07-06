import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser, IUserAttributes } from 'src/app/shared/interfaces/user/IUser';

import { AuthService } from '../_services/auth.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  isRequestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    public _notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.setUpLoginForm();
  }

  setUpLoginForm() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get pwd() {
    return this.loginForm.get('password');
  }

  login(form: FormGroup) {

    if(this.loginForm.invalid) {
      return;
    }

    let credentials: IUserAttributes = {
      'email': form.controls.email.value,
      'password': form.controls.password.value
    }

    this.isRequestLoading = true;

    this._authService.login(credentials).subscribe(
      (res) => {
        this.isRequestLoading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.isRequestLoading = false;
        this._notificationService.showErrorNotification('Error!', [error?.error?.error]);
        this.router.navigate(['/login']);
      }
    );

  }

}

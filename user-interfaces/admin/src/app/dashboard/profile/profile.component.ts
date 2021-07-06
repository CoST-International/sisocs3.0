import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser, IUserAttributes, IUserData } from 'src/app/shared/interfaces/user/IUser';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  isLoading: Boolean = false;
  errorMessage: string = '';

  subscription!: Subscription;
  user!: IUser;

  constructor(
    private route: ActivatedRoute,
    public _authService: AuthService,
  ) {
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.isLoading = true;
    this.subscription = this._authService.getCurrentUser().subscribe(
      (user) => {
        this.isLoading = false;
        this.user = user;
      },
      (error) => {
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


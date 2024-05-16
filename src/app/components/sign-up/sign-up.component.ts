import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  addUser() {
    if (
      this.username == '' ||
      this.password == '' ||
      this.confirmPassword == ''
    ) {
      this.toastr.error('All fields are mandatory', 'Error');
      return;
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Passwords entered are different', 'Error');
      return;
    }

    const user: User = {
      username: this.username,
      password: this.password,
    };

    this.loading = true;
    this._userService.signUp(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(
          `User ${this.username} was registered successfully`,
          'User registered'
        );
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      },
    });
  }
}

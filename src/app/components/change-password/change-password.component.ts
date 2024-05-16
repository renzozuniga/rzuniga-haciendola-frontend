import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  changePassword() {
    if (this.newPassword == '' || this.confirmPassword == '') {
      this.toastr.error('All fields are mandatory', 'Error');
      return;
    }

    this.loading = true;
    this._userService
      .changePassword(this.newPassword, this.confirmPassword)
      .subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(
            `User ${localStorage.getItem('username')} changed his password`
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

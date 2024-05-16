import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  username: string = '';
  loading: boolean = false;
  newPassword: any = null;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  recoverPassword() {
    if (this.username == '') {
      this.toastr.error('All fields are mandatory', 'Error');
      return;
    }

    this.loading = true;
    this._userService.recoverPassword(this.username).subscribe({
      next: (v) => {
        this.newPassword = v.data;
        this.loading = false;
        this.toastr.success(`User ${this.username} recovered his password`);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      },
    });
  }
}

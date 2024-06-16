import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { IUser } from '../../interface/user';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private userService: UserService) {}
  router = new Router();
  ngOnInit() {
    if (this.userService.CheckUserValid()) {
      this.router.navigate(['admin/add-product']);
    }
  }
  loginform = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(6)),
  });

  onSubmit = () => {
    this.userService.UserLogin(this.loginform.value as IUser).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('user', data?.accessToken);
        alert('Đăng nhập thành công');
        this.router.navigate(['admin']);
      },
      (error) => {
        // console.log(error);
        alert(error.error);
      }
    );
  };
  CheckUser = () => {
    console.log(this.userService.CheckUserValid());
  };
}

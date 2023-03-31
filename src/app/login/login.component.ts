import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  datausr: any;
  loginForm = this.builder.group({
    correo: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  login() {
    if (this.loginForm.valid) {
      this.service.Login(this.loginForm.value).subscribe((res) => {
        this.datausr = res;
        if (this.datausr.length > 0) {
          sessionStorage.setItem(
            'x-token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzJhMWQ3ZDgyODVhNTE3NzBiZGVmNTIiLCJpYXQiOjE2NjM3MDU2MjUsImV4cCI6MTY2MzcyMDAyNX0.CSJMib5H-68n-3Mi124LO1wP5nX504ZYi5fN5AOhiS0'
          );
          this.router.navigate(['']);
        } else {
          this.toastr.warning('Credenciales invalidas');
        }
      });
    } else {
      this.toastr.warning('Ingrese las credenciasles de acceso');
    }
  }
}

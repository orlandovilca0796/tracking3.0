import { Component, OnInit } from '@angular/core';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faMicrosoft = faMicrosoft;
  
  user: User = new User();

  constructor(private authService:AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.authService.validateUserActive();
  }

  loginMicrosoft(){
    this.loadingService.show();
    this.authService.loginMicrosoft()
    .then((result) => {
      result.user.getIdTokenResult().then(
        (result) => {
          console.log(result.token);
        }
      );
      this.loadingService.hide();
      this.router.navigate(['pages/empty']);
    })
    .catch((error) => {
      this.loadingService.hide();
      console.log(error)
    });;
  }

  login(form: NgForm) :void{
    if(form.invalid) {
      this.toastr.error('Complete todos los campos.');
      return;
    }
    this.loadingService.show();
    this.authService.loginEmailPassword(form.value.email, form.value.password)
    .then((result) => {
      this.loadingService.hide();
      this.router.navigate(['/pages/empty']);
    })
    .catch((e) => {
      this.loadingService.hide();
      console.log(e.message)
    });
  }

  getUser() {
    console.log(this.authService.getUser());
  }

}

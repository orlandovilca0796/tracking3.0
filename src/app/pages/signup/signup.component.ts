import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from 'src/app/models/NewUser';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser: NewUser = new NewUser();

  constructor(private authService : AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private loadingService:LoadingService) { }

  ngOnInit(): void {
    this.authService.validateUserActive();
  }

  signUp(form: NgForm): void {
    console.log(form);
    if(form.invalid) {
      this.toastr.error('Complete todos los campos.');
      return;
    }
    if(form.value.password != form.value.verifyPassword) {
      this.toastr.error('Las contraseñas no son iguales.');
      return;
    }
    this.loadingService.show();
    this.authService.signupEmailPassword(this.newUser.email, this.newUser.password)
    .then(() => {
      console.log('entra1');
      return this.authService.updateUser(this.newUser.name);
    })
    .then(() => {
      //console.log(this.authService.getUser());
      console.log('entra3');
      //console.log(userCredential);
      this.toastr.success('Nueva cuenta creada');
      this.loadingService.hide();
      //reload same page
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    })
    .catch((error) => {
      console.log(error);
      this.loadingService.hide();
      if(error.code == 'auth/email-already-in-use'){
        this.toastr.error('Ya existe una cuenta con ese email.');
      }else{
        this.toastr.error('ERROR: ' + error.code + ' - ' + error.message);
      }
    });
  }
}

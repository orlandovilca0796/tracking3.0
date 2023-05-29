import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { RestService } from 'src/app/services/api/rest.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit {

  responseApi ='';

  constructor(private authService : AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private restService: RestService) { }

  ngOnInit(): void {
    this.restService.getApiPrueba().then(result => {
      result.subscribe(x => {
        console.log(x);
        this.responseApi = x.message;
      });
    });
  }

  logout() {
    this.authService.logOut()
    .then(() => {
      this.router.navigate(['pages/login']);
    })
    .catch((error) => {
      this.toastr.error(error);
    });
  }

  getUser() {
    console.log(this.authService.getUser());
  }
}

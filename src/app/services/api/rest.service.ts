import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient, private authService:AuthService) { }

  async getApiPrueba() :Promise<Observable<ResponseApi>> {
    var user = this.authService.getUser();
    console.log(user?.getIdToken());
    var token = await user?.getIdTokenResult()
    .then((result) => {
      return result.token;
    });

    var name = user?.displayName ||'-';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: "Bearer " + token,
      })
    };
    return this.http
    .get<ResponseApi>("http://localhost:8081/test?name="+name,httpOptions);
  }
}

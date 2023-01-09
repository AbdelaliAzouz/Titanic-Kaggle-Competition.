import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';

  constructor(private http: HttpClient){}

  onSubmit(data:any) {
    const data2 = {
      Pclass: parseInt(data.Pclass),
      Sex: parseInt(data.Sex),
      Age: parseFloat(data.Age),
      SibSp: parseInt(data.SibSp),
      eParch: parseInt(data.eParch),
    };
    
    console.warn(data2);
    return this.http.post('http://localhost:8000/predict', data2)
    // return this.http.post('https://titanic-prediction-11081-default-rtdb.europe-west1.firebasedatabase.app/predict.json', data)
    .subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
}

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const corsReq = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
    return next.handle(corsReq);
  }
}
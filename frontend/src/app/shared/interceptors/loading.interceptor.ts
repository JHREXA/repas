import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

var pendingRequests = 0;

@Injectable()
export class loadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    pendingRequests ++;

    return next.handle(req).pipe(
        tap({
            next: (event) => {
                if(event.type === HttpEventType.Response){
                    this.handleHideLoading();
                }
            },
            error: (_) => {
                this.handleHideLoading();
            }
        })
    );
  }


  handleHideLoading(){
    pendingRequests --;
    if(pendingRequests === 0)
        this.loadingService.hideLoading();
  }
}

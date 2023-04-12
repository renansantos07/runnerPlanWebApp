import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

//INTERCEPTOR valida um resposta http ou sobescreve uma chamada http
//este AuthInterceptor inclui o token no header
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('token');

        const cloned = req.clone({
            headers: req.headers
                .set('Content-Type', 'application/json')
                .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        })

        if (token) {
            cloned.headers.set('Authorization', 'Bearer '.concat(token));
        }
        
        return next.handle(cloned)
    }

}
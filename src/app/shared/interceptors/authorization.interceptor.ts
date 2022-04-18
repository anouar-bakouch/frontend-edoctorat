import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private tkStorage: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tkStorage.getAuthToken();
    if (token) {
      const authenticatedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(authenticatedRequest);
    }
    return next.handle(request);
  }
}

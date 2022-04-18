import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

type TKRefreshResp = {
  access: string;
};

@Injectable()
export class TokenRefreshInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService,
    private tkStorage: TokenStorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        const isTOkenOld = this.tkStorage.checkIfTokenIsOld();
        if (isTOkenOld) return throwError(() => error);
        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('api/token') &&
          !request.url.includes('api/verify-is-prof') &&
          error.status === 401
        ) {
          return this.handleUnAuthroized(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  handleUnAuthroized(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      return this.authService.refreshAuthToken().pipe(
        switchMap((tkResponse) => {
          this.isRefreshing = false;
          this.tkStorage.storeTokens((tkResponse as TKRefreshResp)['access']);
          this.refreshTokenSubject.next(tkResponse);
          return next.handle(request);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          return throwError(() => err);
        })
      );
    }
    return this.refreshTokenSubject.pipe(
      filter((tk) => tk !== null),
      take(1),
      switchMap((_) => next.handle(request))
    );
  }
}

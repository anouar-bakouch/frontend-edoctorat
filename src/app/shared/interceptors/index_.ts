import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthorizationInterceptor } from "./authorization.interceptor";
import { TokenRefreshInterceptor } from "./token-refresh.interceptor";

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenRefreshInterceptor,
    multi: true
  },
];
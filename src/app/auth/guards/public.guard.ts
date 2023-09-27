import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, CanActivate, CanMatch } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  private checkAuthStatus(): Observable<boolean>{
    return this.authService.checkAuthentication().
    pipe(
      tap( isAuthtenticated => {
        if(isAuthtenticated) this.router.navigate(['./']);
      }),
      map( isAuthenticated => !isAuthenticated)
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.checkAuthStatus();
  }


}

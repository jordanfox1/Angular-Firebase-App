import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import {Store} from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import { Observable, take } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{
    constructor(private store: Store<fromRoot.State>, private router: Router, private authService: AuthService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // return this.store.select(fromRoot.getIsAuth).pipe(take(1))
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login'])
    }

    canLoad(route: Route): any {
        // return this.store.select(fromRoot.getIsAuth).pipe(take(1))
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login'])
    }
}
import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {Store} from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import { take } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private store: Store<fromRoot.State>, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1))
    }

}
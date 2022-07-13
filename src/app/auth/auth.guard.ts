import { AuthService } from 'src/app/auth/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (this.authService.isAuthenticated()) {
            return true
        }
        this.router.navigate(['/login'])
    }

}
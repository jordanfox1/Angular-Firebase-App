import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";

// service to handle authorization methods
export class AuthService {
    authChange = new Subject<boolean>()
    private user: User | null | undefined;

    signUp(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()

        }
    }

    logout() {
        this.user = null;
    }
    
    getUser() {
        return { ...this.user };
    }

    isAuthenticated() {
        if (this.user) {
            return true
        }
        return false
    }
    
}
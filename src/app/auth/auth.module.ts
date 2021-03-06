import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

// each module is standalone - imports from the app.module are not added to any other module and must be imported there also.
@NgModule({
    declarations: [SignupComponent, LoginComponent],
    imports: [SharedModule, ReactiveFormsModule, MaterialModule, AngularFireAuthModule, AuthRoutingModule, FormsModule, MatProgressSpinnerModule],
    exports: []
})
export class AuthModule {}
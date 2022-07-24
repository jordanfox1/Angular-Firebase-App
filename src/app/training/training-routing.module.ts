import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrainingComponent } from "./training.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  { path: '', component: TrainingComponent }, //we need to provide the auth guard service
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class TrainingRoutingModule {}
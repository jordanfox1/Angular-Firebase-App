import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TrainingComponent } from "./training.component";

const routes: Routes = [
  { path: '', component: TrainingComponent }, //we need to provide the auth guard service
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TrainingRoutingModule {}
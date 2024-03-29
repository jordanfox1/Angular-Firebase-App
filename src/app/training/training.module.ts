import { StoreModule } from '@ngrx/store';
import { TrainingRoutingModule } from './training-routing.module';
import { StopTrainingComponent } from './current/stop-training.component';
import { PreviousComponent } from './previous/previous.component';
import { NewComponent } from './new/new.component';
import { CurrentComponent } from './current/current.component';
import { TrainingComponent } from './training.component';
import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { trainingReducer } from './training.reducer';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentComponent,
        NewComponent,
        PreviousComponent,
        StopTrainingComponent,
    ],
    imports: [
        SharedModule,
        AngularFireAuthModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer) // ('state', reducerFunction)
    ],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
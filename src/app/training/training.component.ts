import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store'
import * as fromTraining from './training.reducer'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean> 
  exerciseSubscription = new Subscription

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State> ) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining)
  }

}

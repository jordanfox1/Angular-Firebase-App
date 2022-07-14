import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Firestore, collectionData, collection, getDocs} from '@angular/fire/firestore'
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  exc = { name: 'title', description: 'lorem ipsum' }

  @ViewChild('input')
  collection: any
  input!: ElementRef;
  // item$: Observable<any>;

  constructor(
    private trainingService: TrainingService, 
    public firestore: Firestore,

    private db: AngularFirestore
  ) {
    // collection
    // this.item$ = collectionData(this.collection)
  }
  // private collection = collection(firestore, 'items')
  // this.item$ = collectionData(collection);

  availableExercises = this.trainingService.getAvailableExercises();

  ngOnInit(): void {
    this.db.collection('availableExercise').valueChanges().subscribe((result: any) => {
      console.log(result, 'AAAAA')
    })

    const dbInstance = collection(this.firestore, '/avaliableExercises')
    getDocs(dbInstance).then(res => console.log(res.docs.map((item) => {
      return { ...item.data(), id: item.id}
    })))
  }

  onStart(f: NgForm): void {
    // console.log(f)
    this.trainingService.startExcercise(f.value.exercise)
  }

  addExercise(): void {
    this.availableExercises.push({
      name: this.input.nativeElement.value,
      id: '',
      duration: 0
    })
  }

}

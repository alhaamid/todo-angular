
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Note, GlobalsService } from '../../services/globals.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notesCollection: AngularFirestoreCollection<Note>;
  notes: Observable<Note[]>;

  title: string;
  content: string;

  constructor(private gs: GlobalsService, private as: AuthService, private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('notes');//, ref => {
      // return ref.where('hearts', '==', '6');
      // ref.orderBy, ref.where
      // });
    this.notes = this.notesCollection.valueChanges();
  }

  addNote() {
    this.afs.collection('notes').add({'title': this.title, 'content': this.content}); // auto-generates an Id
    // this.afs.collection('notes').doc('custom-id').set({'title': this.title, 'content': this.content}); // your own id
  }

  ngOnInit() {}

  ngOnDestroy() {}

}

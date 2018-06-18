import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NotesService } from './notes.service';
import { GlobalsService } from './globals.service';


@Injectable({
  providedIn: 'root'
})
export class NotesResolveService implements Resolve<any> {

  constructor(private ns: NotesService, private gs: GlobalsService) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    this.gs.log("resolving notes");
    
    return new Promise<any>((res, rej) => {
      if (this.ns.notesObservable != null) {
        res(true);
      } else {
        this.gs.log("notes-resolve: this shouldn't happen");
        res(false);

        // this.ns.notesCollection = this.ns.afs.collection('notes');
        // this.ns.notesObservable = this.ns.notesCollection.valueChanges();
        // this.notesObservable.subscribe(res => {
        //   this.allNotes = res;
        // })
        // res(true);
      }
    })
  }
}

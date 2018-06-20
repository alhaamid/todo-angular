import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public APP_NAME: string = 'Tasks';

  public LANDING_PAGE = new PageDetails('', '/', ['']);
  public LOGIN_PAGE = new PageDetails('login', '/login', ['login']);
  public REMINDERS_PAGE = new PageDetails('reminders', '/reminders', ['reminders']);
  public SETTINGS_PAGE = new PageDetails('settings', '/settings', ['settings']);
  public YOUR_ACCOUNT_PAGE = new PageDetails('your-account', '/your-account', ['your-account']);

  public USERS_COLLECTION: string = 'users';
  public NOTES_COLLECTION: string = 'notes';
  
  public DEBUG: boolean = false;

  constructor() { }

  public log(...a) {
    if (this.DEBUG) console.log(...a);
  }
}

class PageDetails {
  constructor(public STR: string, public ROUTE: string, public NAV: string[]) {}
}

interface GlobalVars {
  nextNoteIndex: number;
}

// public GLOBAL_VARS_NOTES_COLLECTION: string = 'globalVars/notes';
// private NEXT_NOTE_INDEX_OBSERVABLE: Observable<GlobalVars> = null;
// private NEXT_NOTE_INDEX: GlobalVars = null;

// subscribeNextNoteIndex(afs: AngularFirestore): Promise<boolean> {
//   return new Promise<boolean> ( (resolve, reject) => {
//     this.NEXT_NOTE_INDEX_OBSERVABLE = afs.doc<GlobalVars>(`${this.GLOBAL_VARS_NOTES_COLLECTION}`).valueChanges();
//     this.NEXT_NOTE_INDEX_OBSERVABLE.subscribe(res => {
//       this.NEXT_NOTE_INDEX = res;
//       resolve(true);
//     })
//   })
// }

// isNextNoteIndexSubscribed() {
//   return this.NEXT_NOTE_INDEX_OBSERVABLE != null;
// }

// getNextNoteIndex(afs: AngularFirestore): Promise<number> {
//   return new Promise<number> ((resolve, reject) => {
//     if (this.isNextNoteIndexSubscribed()) {
//       const data: GlobalVars = {
//         nextNoteIndex: this.NEXT_NOTE_INDEX.nextNoteIndex + 1
//       }
//       afs.doc<GlobalVars>(`${this.GLOBAL_VARS_NOTES_COLLECTION}`).set(data).then(__ => resolve(this.NEXT_NOTE_INDEX.nextNoteIndex));

//       var copy = this.getCopy(this.NEXT_NOTE_INDEX.nextNoteIndex);
//       this.updateNextNodeIndex(afs).then(__ => {
//         resolve(copy);
//       })
//     } else {
//       this.subscribeNextNoteIndex(afs).then(done => {
//         // resolve(this.NEXT_NOTE_INDEX.nextNoteIndex);
//         resolve(this.getNextNoteIndex(afs));
//       })
//     }
//   })
// }

// getCopy(obj: any) {
//   return JSON.parse(JSON.stringify(obj));
// }

// private updateNextNodeIndex(afs: AngularFirestore): Promise<number> {
//   return new Promise<number> ((resolve, reject) => {
//     const data: GlobalVars = {
//       nextNoteIndex: this.NEXT_NOTE_INDEX.nextNoteIndex + 1
//     }
//     afs.doc<GlobalVars>(`${this.GLOBAL_VARS_NOTES_COLLECTION}`).set(data).then(__ => resolve(this.NEXT_NOTE_INDEX.nextNoteIndex));
//   })
// }
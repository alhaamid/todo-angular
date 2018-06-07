import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * normalize all calls to users/ and notes collection
 */

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  public APPNAME: string = 'To Do';

  public LANDING_PAGE = new pageDetails('', '/', ['']);
  public LOGIN_PAGE = new pageDetails('login', '/login', ['login']);
  public REMINDERS_PAGE = new pageDetails('reminders', '/reminders', ['reminders']);
  public SETTINGS_PAGE = new pageDetails('settings', '/settings', ['settings']);
  public YOUR_ACCOUNT_PAGE = new pageDetails('your-account', '/your-account', ['your-account']);

  public DEBUG: boolean = false;

  constructor(private afs: AngularFirestore) { }

  getUniqueId() {
    return this.afs.createId();
  }

  getNote(
    creatorId_: string,
    title_: string,
    content_: Content,
    collaborators_?: string[],
    reminderId_?: string 
  ) {
    const note: Note = {
      noteId: this.getUniqueId(),
      creatorId: creatorId_,
      title: title_,
      content: content_,
      collaborators: collaborators_,
      reminderId: reminderId_
    }
    return note;
  }

  getContent(toDos_: ToDo[]) {
    const content: Content = {
      contentId: this.getUniqueId(),
      toDos: toDos_
    }
    return content;
  }

  getToDo(done_: boolean, task_: string, lastDoneBy_: string) {
    const toDo: ToDo = {
      toDoId: this.getUniqueId(),
      done: done_,
      task: task_,
      lastDoneBy: lastDoneBy_
    }
    return toDo;
  }

}

class pageDetails {
  constructor(public STR: string, public ROUTE: string, public NAV: string[]) {}
}

export interface FirestoreUser {
  userId: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

export interface Note {
  /**
   * creatorId: userId of creater
   * collaborators: array of userIds of all users with whom the creater has shared these notes.
   * reminderId: This will be the reminderId of the document in "Reminders" collection
   */
  noteId: string;
  creatorId: string;
  title: string;
  content: Content;
  collaborators?: string[];
  reminderId?: string;
}

export interface Content {
  contentId: string;
  toDos: ToDo[];
}

export interface ToDo {
  toDoId: string;
  done: boolean;
  task: string;
  lastDoneBy: string; // userId of the user who did this Todo last time.
}
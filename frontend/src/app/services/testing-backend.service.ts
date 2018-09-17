import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestingBackendService {
  backend_url = 'http://localhost:8000/api/cats/';

  constructor(private http: HttpClient) {}

  getAllCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.backend_url);
  }

  getCat(name: string): Observable<Cat> {
    return this.http.get<Cat>(this.backend_url + name);
  }

  insertCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(this.backend_url, cat);
  }

  updateCat(cat: Cat): Observable<void> {
    return this.http.put<void>(this.backend_url + cat.name, cat);
  }

  deleteCat(name: string) {
    return this.http.delete(this.backend_url + name);
  }
}

export interface Cat {
  name: string;
}
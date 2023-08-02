import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Note } from '../models/note';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  
  URL:string="http://localhost:3000/notes/";

  constructor(private http: HttpClient) { }
  

  getNote(id:number):Observable<Note>
  {
    return this.http.get<Note>(`${this.URL}/${id}`);
  }
  getNotes():Observable<Array<Note>>
  {
    return this.http.get<Array<Note>>(this.URL);
  }
  addNote(data:any):Observable<Note>
  {
    return this.http.post(this.URL,data);
  }
  updateNote(id:any,data:any):Observable<Note>
  {
    return this.http.put(`${this.URL}/${id}`,data);
  }
  deleteNote(id:any)
  {
    return this.http.delete(`${this.URL}/${id}`);
  }
}

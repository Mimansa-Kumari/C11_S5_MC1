import { Component } from '@angular/core';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {

  constructor(private getNotes: NoteService) { }

  items: Note[] = [];
  ngOnInit() {
    this.getNotes.getNotes().subscribe({
      next: data => { this.items = data },
      error: e => { alert(`Error`) }
    });
  }

  onSearchTextChanged(event: any) {
    if (event) {
      this.items = event;
    }
    else {
      this.items = [];
    }
  }

  onNoteAdded(event: any) {
    this.items.push(event);
  }
}
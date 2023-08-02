import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  item:Note={};
  items:Note[]=[];
  constructor(private editer : Router, private del : NoteService){}

  delete()
  {
    this.del.deleteNote(this.item.id).subscribe({
      next:p=>{alert(`Note Deleted Successfully!`)
      this.editer.navigateByUrl("note-view")
    }
  });
  }
  
}

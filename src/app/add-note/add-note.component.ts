import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  
  //readmore variable, its true than read more string will print
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = false


  //onclick toggling both
  onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }
  
  id:number=0;
  title:string="";
  content:string="";
  data?:Note;
  

  @Output()
  addingData:EventEmitter<any>=new EventEmitter<any>();
  private _snackBar: any;
  constructor(private addNotes:NoteService,
              private goToDashboard : Router){}

  addNote()
  {
      this.data={ id:this.id,
        title:this.title,
        content:this.content
      }
      this.addNotes.addNote(this.data).subscribe({
        next:d=>{alert(`Note Added`)
        this.addingData.emit(this.data)
        this.goToDashboard.navigateByUrl("dashboard")
        },
        error:e=>{alert(`Error : ${e}`)}
      });
  }

  onSubmit(feedbackForm:any)
  {
    this._snackBar.open('Note Added successfully', 'success', {​
      duration: 5000,​
      panelClass: ['mat-toolbar', 'mat-primary']​
      })
  }
 
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {
  formData!:FormGroup;
  updateData:Note={title:"",
                    content:""};

  constructor(private data : FormBuilder, private updated : NoteService,
     private activatedRoute : ActivatedRoute,
     private dash : Router){
    this.update();
  }

  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get("id")?? 0;
      this.updated.getNote(+id).subscribe(data => {
        this.updateData = data;
      })
  })
}

  update()
  {
    this.formData = this.data.group({
      title:[""],
      content:[""]
    })
  }

  onSubmit()
  {
    this.updated.updateNote(this.updateData.id,this.updateData).subscribe({
      next:p=>{alert(`Data Updated Successfully!`)
       this.dash.navigateByUrl("dashboard")}
    })
    }

    canDeactivate()
    {
      confirm(`Are you sure you want to leave the page ???`);
      return true;
    }
  }

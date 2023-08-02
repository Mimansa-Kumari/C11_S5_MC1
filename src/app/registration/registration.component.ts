import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationData!:FormGroup;
    firstName :string="";
    lastName : string="";
    email:string="";
    password:string="";
    gender:string="";
    age?:string;
    phoneNumber:string="";
    zipCode?:number;
    data?:User;
    details:User[]=[];
    flag:boolean=false;
    @Output()
    displayContent:EventEmitter<any>=new EventEmitter<any>();
  
  constructor(private fb : FormBuilder,  private _snackBar: MatSnackBar, private addUsers : UserService){
    this.setValues();
  }
  setValues()
  {
    this.registrationData=this.fb.group({
      firstNameFormControl:["",Validators.required],
      lastNameFormControl:["",[Validators.minLength(2),Validators.required]],
      emailFormControl:["",[Validators.required,this.checkIfGuestEmailsAreValid]],
      passwordFormControl:["",[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      conPasswordFormControl:["",[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      radioFormControl:[""],
      ageFormControl:["",[Validators.required,this.ageValidator]],
      phoneFormControl:["",[Validators.required,Validators.pattern(/^[789]\d{9,9}$/)]],
      addressFormControl:[""],
      address1FormControl:[""],
      address2FormControl:[""],
      zipFormControl:["",[Validators.required,this.zipValidation]]
    },{validators:[this.mustMatchValidator]})
  }
  get firstNameFormControl() { return this.registrationData.get("firstNameFormControl") }
  get lastNameFormControl() { return this.registrationData.get("lastNameFormControl") }
  get emailFormControl() { return this.registrationData.get("emailFormControl") }
  get passwordFormControl() { return this.registrationData.get("passwordFormControl") }
  get conPasswordFormControl() { return this.registrationData.get("conPasswordFormControl") }
  get radioFormControl() { return this.registrationData.get("radioFormControl") }
  get ageFormControl() { return this.registrationData.get("ageFormControl") }
  get phoneFormControl() { return this.registrationData.get("phoneFormControl") }
  get zipFormControl() { return this.registrationData.get("zipFormControl") }
  onSubmit()
  {

    this._snackBar.open('Congrats, you have submitted the form!!', 'success', {
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  checkIfGuestEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return {emailsAreValidCheck: false }
      }
    }
    return;
  }


  mustMatchValidator(fg: AbstractControl) {
    const passwordValue = fg.get("passwordFormControl")?.value;  
    
    const confirmPasswordValue = fg.get("conPasswordFormControl")?.value;
    if (passwordValue !== confirmPasswordValue) {
        return { mustMatch: false }
    }
    return ;
  }


  ageValidator(av:AbstractControl)
  {
    const ageValid = av?.value;
    if(ageValid<18)
    {
      return {ageValidCheck:false};
    }
    return ;
  }

  zipValidation(zv:AbstractControl)
  {
    const zipValid = zv?.value;
    if(zipValid<50000 || zipValid >99999)
    {
      return {zipValidCheck:false};
    }
      return ;
  }

  addUsersData()
  {
    this.data={
      firstName:this.firstNameFormControl?.value,
      lastName:this.lastNameFormControl?.value,
      email:this.emailFormControl?.value,
      password:this.passwordFormControl?.value,
      gender:this.radioFormControl?.value,
      age:this.ageFormControl?.value,
      phoneNumber:this.phoneFormControl?.value,
      zipCode:this.zipFormControl?.value
    }
    this.addUsers.addUser(this.data).subscribe({
      next:d=>{alert(`User Details Added!`);
    }
    })
  }

}

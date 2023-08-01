import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  
  constructor(private empService:EmployeeService,private builder:FormBuilder, private dialogClose:MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){

  }
  
  education: string[]=[
    'Matric',
    'diploma',
    'Intermediate',
    'UG',
    'PG'
  ]
 ngOnInit(): void {
   this.empForm.patchValue(this.data);
 }
  empForm=this.builder.group({
    firstname:'',
    lastname:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  })
  onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value);
      if(this.data){
        this.empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val:any)=>{
            alert("employee updated successfully");
            this.dialogClose.close(true);
            
           
            
  
          },
          error:(err:any)=>{
            console.error(err);
          }
        })

      }
      else{

      this.empService.addemployee(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert("employee added successfully");
          this.dialogClose.close(true);
          

        },
        error:(err:any)=>{
          console.error(err);
        }
      })
    }

    }
  }

}

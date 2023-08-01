import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {EmpAddEditComponent} from './emp-add-edit/emp-add-edit.component'
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email','dob','gender','education','company','experience','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog:MatDialog, private empService:EmployeeService){
  }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditEmp(){

    const dialogRef=this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }

    })

    
  }
 getEmployeeList(){
  this.empService.getEmployeeList().subscribe({
    next:(res)=>{
      console.log(res);
      this.dataSource= new MatTableDataSource(res);
      this.dataSource.sort= this.sort;
      this.paginator=this.paginator;

    },
    error: (err) =>{
   console.log(err);
    }
      
});

 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
deleteEmployee(id:number){
  this.empService.deleteEmployee(id).subscribe({
    next:res=>{
      alert("deleted");
      this.getEmployeeList();

    },
    error:(err)=>{
      console.log(err);
    }
    

  })

}
openEditForm(data:any){
  const dialogRef=this._dialog.open(EmpAddEditComponent,{ 
    data,

  });
  
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }

    })

  

}

}

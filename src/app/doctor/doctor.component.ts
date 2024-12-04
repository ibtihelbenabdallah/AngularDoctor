import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  

  constructor(private Ms:DoctorService ){}

dataSource:Doctor[]=[]

ngOnInit(){
  this.Ms.GetAll().subscribe((result)=>{
    this.dataSource=result
  })
}
displayedColumns: string[] = [
  'Id', 'Name', 'Gender',  
  'Email', 'Mobile'
];




}

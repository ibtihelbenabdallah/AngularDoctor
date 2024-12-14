import { Departement } from "./departement";

export interface Doctor {
    id?: string;
    //idDoctor?: string;
    Name: string;
    Gender: string;
    Text: string;
    DepartmentId: number;
    Color: string;
    Education: string;
    Specialization: string;
    Experience: string;
    Designation: string;
    DutyTiming: string;
    Email: string;
    Mobile: string;
    Availability: string;
    StartHour: string;
    EndHour: string;
    AvailableDays: number[];
    departementId: string; 
    Department?: Departement;

  
}
export interface Consultation {
    id?: string; // Optional for new consultations
    PatientID: string;
    DoctorID: string;
    Date: string; // ISO format
    Reason: string;
    Notes: string;
  }
  
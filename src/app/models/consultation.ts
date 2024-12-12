export interface Consultation {
    id?: string; // Optional for new consultations
    PatientName: string;
    DoctorName: string;
    Date: string; // ISO format
    Reason: string;
    Notes: string;
  }
  
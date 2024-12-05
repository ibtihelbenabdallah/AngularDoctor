export interface Patient {
    id?: string;
    Name: string;
    Text: string;
    DOB: string;  // Format: ISO 8601, par exemple "1980-09-03T00:00:00.000Z"
    Mobile: string;
    Email: string;
    Address: string;
    Disease: string;
    DepartmentName: string;
    BloodGroup: string;
    Gender: 'Male' | 'Female';  // Peut être étendu selon le besoin
    Symptoms: string;
  }
  
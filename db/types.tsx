// Subject type
export interface Subject {
    id: number;
    name: string;
    attendedClasses: number;
    totalClasses: number;
  }
  
  // Attendance type
  export interface Attendance {
    id: number;
    subjectId: number;
    date: string; // ISO string format
  }
  
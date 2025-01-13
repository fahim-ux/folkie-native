// Subject type
export  interface Subject {
    id: number;
    name: string;
    code: string;
  }
  
  // Attendance type
export default interface Attendance {
    id: number;
    subjectId: number;
    date: string; // ISO string format
  }
  
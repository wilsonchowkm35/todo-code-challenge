export interface Task {
  id?: string;
  title: string;
  description: string;
  color: string;
  x?: number;
  y?: number;
  createdBy?: string;
  createdAt?: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface Transform {
  transform: string;
}

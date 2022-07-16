interface Request {
  endPointId: string;
  requestId: string;
  endPointPath: string;
  statusCode: number;
  device: string;
  location: RequestLocation;
  requestObject: any;
  responseObject: string;
  responseSize: string;
  loadTime: number;
  problem: RequestProblem | null;
  hasProblem: boolean;
}

interface RequestLocation {
  city: string;
  region: string;
  country: string;
}

interface RequestProblem {
  severity: string;
  type: string;
  filePath: string;
  line: number;
  occurences: number;
  errorMessage: string;
  resolved: boolean;
  timeOccured: number;
}

export type { Request };

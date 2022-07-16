interface ProjectScore {
  performace: number;
  security: number;
  quality: number;
  total: number;
  performanceStats: PerformanceStats;
  securityStats: SecurityStats;
  qualityStats: QualityStats;
}

interface PerformanceStats {
  gZipSupport: number;
  http2Support: number;
  responseSize: number;
  loadTime: number;
}

interface SecurityStats {
  httpSupport: number;
  authentication: number;
}

interface QualityStats {
  jsonResponse: number;
  problems: number;
  versionSupport: number;
}

export type { ProjectScore };

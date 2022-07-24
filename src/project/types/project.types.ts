import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PerformanceStats {
  @Field()
  gZipSupport: number;
  @Field()
  http2Support: number;
  @Field()
  responseSize: number;
  @Field()
  loadTime: number;
}
@ObjectType()
export class SecurityStats {
  @Field()
  httpSupport: number;
  @Field()
  authentication: number;
}
@ObjectType()
export class QualityStats {
  @Field()
  jsonResponse: number;
  @Field()
  problems: number;
  @Field()
  versionSupport: number;
}

@ObjectType()
export class ProjectScore {
  @Field()
  performace: number;
  @Field()
  security: number;
  @Field()
  quality: number;
  @Field()
  total: number;
  @Field()
  performanceStats: PerformanceStats;
  securityStats: SecurityStats;
  qualityStats: QualityStats;
}

import { Module } from '@nestjs/common';
import { EndpointsService } from './endpoints.service';
import { EndpointsResolver } from './endpoints.resolver';

@Module({
  providers: [EndpointsService, EndpointsResolver]
})
export class EndpointsModule {}

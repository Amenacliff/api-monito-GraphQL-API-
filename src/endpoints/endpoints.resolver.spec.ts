import { Test, TestingModule } from '@nestjs/testing';
import { EndpointsResolver } from './endpoints.resolver';

describe('EndpointsResolver', () => {
  let resolver: EndpointsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndpointsResolver],
    }).compile();

    resolver = module.get<EndpointsResolver>(EndpointsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

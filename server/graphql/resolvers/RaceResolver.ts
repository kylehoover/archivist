import { Arg, ID, Query, Resolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { RaceService, ServiceName } from '../../services'
import { Authorized } from '../decorators'
import { RaceType } from '../types'

@Service()
@Resolver(RaceType)
export class RaceResolver {
  constructor(@Inject(ServiceName.Race) private readonly raceService: RaceService) {}

  @Query(returns => RaceType, { nullable: true })
  @Authorized()
  public async race(@Arg('id', type => ID) id: string): Promise<RaceType | undefined> {
    const race = await this.raceService.findById(id)
    return race?.toGraphQLType()
  }

  @Query(returns => [RaceType])
  // @Authorized()
  public async races(): Promise<RaceType[]> {
    const races = await this.raceService.findAll()
    return races.map(r => r.toGraphQLType())
  }
}

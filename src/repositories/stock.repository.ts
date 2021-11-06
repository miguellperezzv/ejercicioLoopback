import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {EcommercemusicaDataSource} from '../datasources';
import {Stock, StockRelations, Album} from '../models';
import {AlbumRepository} from './album.repository';

export class StockRepository extends DefaultCrudRepository<
  Stock,
  typeof Stock.prototype.id,
  StockRelations
> {

  public readonly album: BelongsToAccessor<Album, typeof Stock.prototype.id>;

  constructor(
    @inject('datasources.ecommercemusica') dataSource: EcommercemusicaDataSource, @repository.getter('AlbumRepository') protected albumRepositoryGetter: Getter<AlbumRepository>,
  ) {
    super(Stock, dataSource);
    this.album = this.createBelongsToAccessorFor('album', albumRepositoryGetter,);
    this.registerInclusionResolver('album', this.album.inclusionResolver);
  }
}

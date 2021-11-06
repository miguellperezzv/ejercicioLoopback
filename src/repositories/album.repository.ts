import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {EcommercemusicaDataSource} from '../datasources';
import {Album, AlbumRelations, Artista, Stock} from '../models';
import {ArtistaRepository} from './artista.repository';
import {StockRepository} from './stock.repository';

export class AlbumRepository extends DefaultCrudRepository<
  Album,
  typeof Album.prototype.id,
  AlbumRelations
> {

  public readonly artista: BelongsToAccessor<Artista, typeof Album.prototype.id>;

  public readonly stocks: HasManyRepositoryFactory<Stock, typeof Album.prototype.id>;

  constructor(
    @inject('datasources.ecommercemusica') dataSource: EcommercemusicaDataSource, @repository.getter('ArtistaRepository') protected artistaRepositoryGetter: Getter<ArtistaRepository>, @repository.getter('StockRepository') protected stockRepositoryGetter: Getter<StockRepository>,
  ) {
    super(Album, dataSource);
    this.stocks = this.createHasManyRepositoryFactoryFor('stocks', stockRepositoryGetter,);
    this.registerInclusionResolver('stocks', this.stocks.inclusionResolver);
    this.artista = this.createBelongsToAccessorFor('artista', artistaRepositoryGetter,);
    this.registerInclusionResolver('artista', this.artista.inclusionResolver);
  }
}

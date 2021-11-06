import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {EcommercemusicaDataSource} from '../datasources';
import {Artista, ArtistaRelations, Album} from '../models';
import {AlbumRepository} from './album.repository';

export class ArtistaRepository extends DefaultCrudRepository<
  Artista,
  typeof Artista.prototype.id,
  ArtistaRelations
> {

  public readonly albums: HasManyRepositoryFactory<Album, typeof Artista.prototype.id>;

  constructor(
    @inject('datasources.ecommercemusica') dataSource: EcommercemusicaDataSource, @repository.getter('AlbumRepository') protected albumRepositoryGetter: Getter<AlbumRepository>,
  ) {
    super(Artista, dataSource);
    this.albums = this.createHasManyRepositoryFactoryFor('albums', albumRepositoryGetter,);
    this.registerInclusionResolver('albums', this.albums.inclusionResolver);
  }
}

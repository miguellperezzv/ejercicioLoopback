import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Album,
  Artista,
} from '../models';
import {AlbumRepository} from '../repositories';

export class AlbumArtistaController {
  constructor(
    @repository(AlbumRepository)
    public albumRepository: AlbumRepository,
  ) { }

  @get('/albums/{id}/artista', {
    responses: {
      '200': {
        description: 'Artista belonging to Album',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Artista)},
          },
        },
      },
    },
  })
  async getArtista(
    @param.path.string('id') id: typeof Album.prototype.id,
  ): Promise<Artista> {
    return this.albumRepository.artista(id);
  }
}

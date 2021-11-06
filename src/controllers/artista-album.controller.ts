import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Artista,
  Album,
} from '../models';
import {ArtistaRepository} from '../repositories';

export class ArtistaAlbumController {
  constructor(
    @repository(ArtistaRepository) protected artistaRepository: ArtistaRepository,
  ) { }

  @get('/artistas/{id}/albums', {
    responses: {
      '200': {
        description: 'Array of Artista has many Album',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Album)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Album>,
  ): Promise<Album[]> {
    return this.artistaRepository.albums(id).find(filter);
  }

  @post('/artistas/{id}/albums', {
    responses: {
      '200': {
        description: 'Artista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Album)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Artista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Album, {
            title: 'NewAlbumInArtista',
            exclude: ['id'],
            optional: ['artistaId']
          }),
        },
      },
    }) album: Omit<Album, 'id'>,
  ): Promise<Album> {
    return this.artistaRepository.albums(id).create(album);
  }

  @patch('/artistas/{id}/albums', {
    responses: {
      '200': {
        description: 'Artista.Album PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Album, {partial: true}),
        },
      },
    })
    album: Partial<Album>,
    @param.query.object('where', getWhereSchemaFor(Album)) where?: Where<Album>,
  ): Promise<Count> {
    return this.artistaRepository.albums(id).patch(album, where);
  }

  @del('/artistas/{id}/albums', {
    responses: {
      '200': {
        description: 'Artista.Album DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Album)) where?: Where<Album>,
  ): Promise<Count> {
    return this.artistaRepository.albums(id).delete(where);
  }
}

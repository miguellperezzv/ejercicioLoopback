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
  Album,
  Stock,
} from '../models';
import {AlbumRepository} from '../repositories';

export class AlbumStockController {
  constructor(
    @repository(AlbumRepository) protected albumRepository: AlbumRepository,
  ) { }

  @get('/albums/{id}/stocks', {
    responses: {
      '200': {
        description: 'Array of Album has many Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Stock)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Stock>,
  ): Promise<Stock[]> {
    return this.albumRepository.stocks(id).find(filter);
  }

  @post('/albums/{id}/stocks', {
    responses: {
      '200': {
        description: 'Album model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Album.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStockInAlbum',
            exclude: ['id'],
            optional: ['albumId']
          }),
        },
      },
    }) stock: Omit<Stock, 'id'>,
  ): Promise<Stock> {
    return this.albumRepository.stocks(id).create(stock);
  }

  @patch('/albums/{id}/stocks', {
    responses: {
      '200': {
        description: 'Album.Stock PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {partial: true}),
        },
      },
    })
    stock: Partial<Stock>,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.albumRepository.stocks(id).patch(stock, where);
  }

  @del('/albums/{id}/stocks', {
    responses: {
      '200': {
        description: 'Album.Stock DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.albumRepository.stocks(id).delete(where);
  }
}

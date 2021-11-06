import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Stock,
  Album,
} from '../models';
import {StockRepository} from '../repositories';

export class StockAlbumController {
  constructor(
    @repository(StockRepository)
    public stockRepository: StockRepository,
  ) { }

  @get('/stocks/{id}/album', {
    responses: {
      '200': {
        description: 'Album belonging to Stock',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Album)},
          },
        },
      },
    },
  })
  async getAlbum(
    @param.path.string('id') id: typeof Stock.prototype.id,
  ): Promise<Album> {
    return this.stockRepository.album(id);
  }
}

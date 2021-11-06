import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Artista} from './artista.model';
import {Stock} from './stock.model';

@model()
export class Album extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  anio_lanzamiento?: number;

  @property({
    type: 'string',
  })
  genero?: string;

  @belongsTo(() => Artista)
  artistaId: string;

  @hasMany(() => Stock)
  stocks: Stock[];

  constructor(data?: Partial<Album>) {
    super(data);
  }
}

export interface AlbumRelations {
  // describe navigational properties here
}

export type AlbumWithRelations = Album & AlbumRelations;

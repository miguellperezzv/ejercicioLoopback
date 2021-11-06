import {Entity, model, property, hasMany} from '@loopback/repository';
import {Album} from './album.model';

@model()
export class Artista extends Entity {
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
    type: 'string',
    required: true,
  })
  fecha_nac: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Album)
  albums: Album[];

  constructor(data?: Partial<Artista>) {
    super(data);
  }
}

export interface ArtistaRelations {
  // describe navigational properties here
}

export type ArtistaWithRelations = Artista & ArtistaRelations;

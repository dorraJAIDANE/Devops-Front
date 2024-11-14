// src/app/models/chambre.model.ts
import { TypeChambre } from './type-chambre';
import { Bloc } from './bloc';

export class Chambre {
  idChambre?: number;
  numeroChambre: number;
  typeChambre: TypeChambre;
  reserve?: boolean;
  universite?: string;
  description?: string;
  capacite?: number;
  bloc?: Bloc;

  constructor(
    numeroChambre: number,
    typeChambre: TypeChambre,
    reserve?: boolean,
    universite?: string,
    description?: string,
    capacite?: number
  ) {
    this.numeroChambre = numeroChambre;
    this.typeChambre = typeChambre;
    this.reserve = reserve;
    this.universite = universite;
    this.description = description;
    this.capacite = capacite;
  }
}

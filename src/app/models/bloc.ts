import { Routes } from '@angular/router';

export const routes: Routes = [];
// src/app/models/bloc.model.ts
// bloc.model.ts
export class Bloc {
  idBloc?: number; // Optional property
  nomBloc: string;
  capaciteBloc: number;

  constructor(nomBloc: string, capaciteBloc: number, idBloc?: number) {
    this.nomBloc = nomBloc;
    this.capaciteBloc = capaciteBloc;
    this.idBloc = idBloc;
  }
}



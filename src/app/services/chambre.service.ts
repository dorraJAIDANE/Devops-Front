// src/app/services/chambre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chambre } from '../models/chambre';
import { Bloc } from '../models/bloc';
import { TypeChambre } from '../models/type-chambre';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  private apiUrl = 'http://192.168.1.16:8282/tpFoyer17/api/chambres';


  constructor(private http: HttpClient) {}

  retrieveAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/retrieveAllChambres`);
  }


  addChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(`${this.apiUrl}/addChambre`, chambre);
  }

  updateChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.put<Chambre>(`${this.apiUrl}/updateChambre`, chambre);
  }



  retrieveChambre(idChambre: number): Observable<Chambre> {
    console.log('API call to retrieve chambre by ID:', idChambre);
    return this.http.get<Chambre>(`${this.apiUrl}/retrieveChambre/${idChambre}`);
  }


  deleteChambre(idChambre: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteChambre/${idChambre}`);
  }


  // Nouvelle méthode pour rechercher les chambres par type
  findByTypeChambre(type: TypeChambre): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/findByTypeChambre`, {
      params: { type: type.toString() }
    });
  }
  // Nouvelle méthode pour affecter une chambre à un bloc
  affecterChambreABloc(idChambre: number, idBloc: number): Observable<Bloc> {
    return this.http.put<Bloc>(`${this.apiUrl}/affecterChambreABloc/${idBloc}/${idChambre}`, {});
  }

  getChambresParNomUniversite(nomUniversite: string): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/getChambresParNomUniversite/${nomUniversite}`);
  }

  getChambresParBlocEtType(idBloc: number, typeC: TypeChambre): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/getChambresParBlocEtType/${idBloc}/${typeC}`);
  }

  getChambresNonReserveParNomUniversiteEtTypeChambre(nomUniversite: string, type: TypeChambre): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/getChambresNonReserveParNomUniversiteEtTypeChambre/${nomUniversite}/${type}`);
  }


}

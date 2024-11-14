import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private apiUrl = 'http://192.168.1.16:8082/tpFoyer17/api/etudiants'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les étudiants
  retrieveAllEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/retrieveAllEtudiants`);
  }

  // Ajouter des étudiants
  addEtudiants(etudiants: Etudiant[]): Observable<Etudiant[]> {
    return this.http.post<Etudiant[]>(`${this.apiUrl}/addEtudiants`, etudiants);
  }

  // Mettre à jour un étudiant
  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/updateEtudiant`, etudiant);
  }

  // Récupérer un étudiant par ID
  retrieveEtudiant(idEtudiant: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/retrieveEtudiant/${idEtudiant}`);
  }

  // Supprimer un étudiant par ID
  removeEtudiant(idEtudiant: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeEtudiant/${idEtudiant}`);
  }

  // Récupérer les étudiants ayant des réservations pour une année universitaire
  findByReservationsAnneeUniversitaire(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/findByReservationsAnneeUniversitaire`);
  }
}

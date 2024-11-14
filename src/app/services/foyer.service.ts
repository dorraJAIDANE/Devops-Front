import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foyer } from '../models/foyer';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {

  private apiUrl = 'http://192.168.1.16:8082/api/foyers'; // Remplacer par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllFoyers(): Observable<Foyer[]> {
    return this.http.get<Foyer[]>(`${this.apiUrl}/retrieveAllFoyers`);
  }

  addFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.post<Foyer>(`${this.apiUrl}/addFoyer`, foyer);
  }

  updateFoyer(foyer: Foyer): Observable<Foyer> {
    return this.http.put<Foyer>(`${this.apiUrl}/updateFoyer`, foyer);
  }

  deleteFoyer(idFoyer: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeFoyer/${idFoyer}`);
  }
}

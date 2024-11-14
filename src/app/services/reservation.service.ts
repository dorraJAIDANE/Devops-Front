import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://spring-app:8082/api/reservations'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Récupérer toutes les réservations
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/retrieveAllReservation`);
  }

  // Ajouter une réservation
  addReservation(idChambre: number, cinEtudiant: number): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/ajouterReservation/${idChambre}/${cinEtudiant}`, {});
  }

  // Mettre à jour une réservation
  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/updateReservation`, reservation);
  }

  // Annuler une réservation
  cancelReservation(cinEtudiant: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/annulerReservation/${cinEtudiant}`);
  }

  // Récupérer une réservation par son ID
  getReservationById(idReservation: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/retrieveReservation/${idReservation}`);
  }
}

// reservation.component.ts

import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[] = [];
  newReservation: Reservation = {
    idReservation: '',
    anneeUniversitaire: '',
    estValide: true,
    idChambre: 0,
    cinEtudiant: 0,
    etudiants: []
  };

  selectedReservation: Reservation | null = null;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getReservations(); // Cette ligne doit appeler la méthode getAllReservations
  }

  // Utilisation de getAllReservations
  getReservations(): void {
    this.reservationService.getAllReservations().subscribe((reservations: Reservation[]) => {
      this.reservations = reservations;
    });
  }


  selectReservation(reservation: Reservation): void {
    this.selectedReservation = { ...reservation };
  }

  updateReservation(): void {
    if (this.selectedReservation) {
      this.reservationService.updateReservation(this.selectedReservation).subscribe(updatedReservation => {
        const index = this.reservations.findIndex(res => res.idReservation === updatedReservation.idReservation);
        if (index !== -1) {
          this.reservations[index] = updatedReservation;
        }
        this.selectedReservation = null;
      });
    }
  }

 

}

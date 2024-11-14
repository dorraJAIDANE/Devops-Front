export interface Reservation {
    idReservation: string;
    anneeUniversitaire: string;
    estValide: boolean;
    idChambre: number;
    cinEtudiant?: number; // Ajoutez cinEtudiant si nécessaire
    etudiants?: any[]; // Si vous voulez manipuler une liste d'étudiants
  }
  
import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../../services/etudiant.service';
import { Etudiant } from '../../models/etudiant';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  selectedEtudiant: Etudiant | null = null;
  newEtudiant: Etudiant = {
    idEtudiant: 0,
    nomEtudiant: '',
    prenomEtudiant: '',
    cinEtudiant: 0,
    dateNaissance: new Date()
  };

  // Déclarez la propriété pour contrôler la visibilité du formulaire
  isFormVisible: boolean = false;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.retrieveAllEtudiants();
  }

  // Récupérer tous les étudiants
  retrieveAllEtudiants(): void {
    this.etudiantService.retrieveAllEtudiants().subscribe(
      (data: Etudiant[]) => {
        this.etudiants = data;
      },
      (error: any) => console.error('Erreur lors de la récupération des étudiants', error)
    );
  }

  // Ajouter un nouvel étudiant
  addEtudiant(): void {
    this.etudiantService.addEtudiants([this.newEtudiant]).subscribe(
      (data: Etudiant[]) => {
        this.etudiants = data;
        this.newEtudiant = { idEtudiant: 0, nomEtudiant: '', prenomEtudiant: '', cinEtudiant: 0, dateNaissance: new Date() };
        this.isFormVisible = false;  // Masquer le formulaire après l'ajout
      },
      (error: any) => console.error('Erreur lors de l’ajout de l’étudiant', error)
    );
  }

  // Sélectionner un étudiant pour modification
  selectEtudiant(etudiant: Etudiant): void {
    this.selectedEtudiant = { ...etudiant };
  }

  // Mettre à jour un étudiant
  updateEtudiant(): void {
    if (this.selectedEtudiant) {
      this.etudiantService.updateEtudiant(this.selectedEtudiant).subscribe(
        (updatedEtudiant: Etudiant) => {
          const index = this.etudiants.findIndex(e => e.idEtudiant === updatedEtudiant.idEtudiant);
          if (index !== -1) {
            this.etudiants[index] = updatedEtudiant;
          }
          this.selectedEtudiant = null;
        },
        (error: any) => console.error('Erreur lors de la mise à jour de l’étudiant', error)
      );
    }
  }

  // Supprimer un étudiant
  deleteEtudiant(idEtudiant: number): void {
    this.etudiantService.removeEtudiant(idEtudiant).subscribe(
      () => {
        this.etudiants = this.etudiants.filter(e => e.idEtudiant !== idEtudiant);
      },
      (error: any) => console.error('Erreur lors de la suppression de l’étudiant', error)
    );
  }

  // Méthode pour basculer la visibilité du formulaire
  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}

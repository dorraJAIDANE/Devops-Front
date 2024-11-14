// src/app/components/chambre/chambre.component.ts
// src/app/components/chambre/chambre.component.ts
import { Component, OnInit } from '@angular/core';
import { ChambreService } from '../../services/chambre.service';
import { Chambre } from '../../models/chambre';
import { TypeChambre } from '../../models/type-chambre';

@Component({
  selector: 'app-chambre',
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.css']
})
export class ChambreComponent implements OnInit {
  chambres: Chambre[] = [];
  selectedChambre?: Chambre;
  typeChambreOptions = Object.values(TypeChambre);
  numeroChambre: number = 0;
  typeChambre: TypeChambre = TypeChambre.SIMPLE;
  idBloc: number = 0; // Ajoutez cette ligne pour déclarer la variable idBloc


  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.retrieveAllChambres();
  }

  addChambre(numeroChambre: number, typeChambre: TypeChambre): void {
    const newChambre = new Chambre(numeroChambre, typeChambre);
    this.chambreService.addChambre(newChambre).subscribe(
      () => {
        this.retrieveAllChambres();
        this.resetForm();
      },
      (error: any) => console.error('Erreur lors de l’ajout de la chambre', error)
    );
  }

  retrieveAllChambres(): void {
    this.chambreService.retrieveAllChambres().subscribe(
      (data: Chambre[]) => this.chambres = data,
      (error: any) => console.error('Erreur lors de la récupération des chambres', error)
    );
  }

  resetForm(): void {
    this.numeroChambre = 0;
    this.typeChambre = TypeChambre.SIMPLE;
    this.selectedChambre = undefined;
  }


  onChambreSelected(event: Event): void {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.findChambreById(selectedId);
  }


  selectChambreForUpdate(chambre: Chambre): void {
    this.selectedChambre = { ...chambre };
  }

  updateChambre(): void {
    if (this.selectedChambre) {
      console.log('Attempting to update chambre:', this.selectedChambre);
      this.chambreService.updateChambre(this.selectedChambre).subscribe(
        () => {
          console.log('Chambre updated successfully');
          this.retrieveAllChambres(); // Refresh the list after updating
          this.selectedChambre = undefined; // Clear selection
        },
        (error: any) => console.error('Error updating chambre:', error)
      );
    }
  }


  findChambreById(idChambre: number): void {
    console.log('Searching for chambre by ID:', idChambre);
    this.chambreService.retrieveChambre(idChambre).subscribe(
      (chambre) => {
        console.log('Chambre retrieved:', chambre);
        this.selectedChambre = chambre;
      },
      (error) => console.error('Erreur lors de la recherche de la chambre', error)
    );
  }



  deleteChambre(idChambre: number | undefined): void {
    if (idChambre !== undefined && confirm("Êtes-vous sûr de vouloir supprimer cette chambre?")) {
      this.chambreService.deleteChambre(idChambre).subscribe(
        () => {
          console.log(`Chambre avec ID ${idChambre} supprimée`);
          this.retrieveAllChambres(); // Rafraîchit la liste après suppression
        },
        (error: any) => console.error('Erreur lors de la suppression de la chambre', error)
      );
    }
  }
  getChambresByType(): void {
    console.log('Recherche des chambres par type:', this.typeChambre);
    this.chambreService.findByTypeChambre(this.typeChambre).subscribe(
      (data: Chambre[]) => {
        console.log('Chambres trouvées par type:', data);
        this.chambres = data;
      },
      (error: any) => console.error('Erreur lors de la recherche par type', error)
    );
  }
  affecterChambreABloc(idChambre: number, idBloc: number): void {
    this.chambreService.affecterChambreABloc(idChambre, idBloc).subscribe(
      () => {
        console.log(`Chambre avec ID ${idChambre} affectée au bloc ${idBloc}`);
        this.retrieveAllChambres(); // Rafraîchit la liste des chambres
      },
      (error: any) => console.error('Erreur lors de l’affectation de la chambre au bloc', error)
    );
  }




}

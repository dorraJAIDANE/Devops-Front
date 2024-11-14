import { Component, OnInit } from '@angular/core';
import { BlocService } from '../../services/bloc.service';
import { Bloc } from '../../models/bloc';

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  blocs: Bloc[] = [];
  selectedBloc?: Bloc;
  isUpdateMode: boolean = false; // Variable to control update form visibility
  idFoyer: number = 0;
  idChambre: number = 0;

  constructor(private blocService: BlocService) {}

  ngOnInit(): void {
    this.retrieveAllBlocs();
  }

  retrieveAllBlocs(): void {
    this.blocService.getBlocs().subscribe(
      (data: Bloc[]) => (this.blocs = data),
      (error: any) => console.error('Erreur lors de la récupération des blocs', error)
    );
  }

  deleteBloc(idBloc: number): void {
    this.blocService.deleteBloc(idBloc).subscribe(
      () => this.blocs = this.blocs.filter(bloc => bloc.idBloc !== idBloc),
      (error: any) => console.error('Erreur lors de la suppression du bloc', error)
    );
  }

  addBloc(nomBloc: string, capaciteBloc: number): void {
    const newBloc: Bloc = { nomBloc, capaciteBloc };
    this.blocService.addBloc(newBloc).subscribe(
      (bloc: Bloc) => {
        this.blocs.push(bloc);
      },
      (error: any) => console.error('Erreur lors de l’ajout du bloc', error)
    );
  }

  selectBlocForUpdate(bloc: Bloc): void {
    this.selectedBloc = { ...bloc }; // Clone bloc to avoid direct modifications
    this.isUpdateMode = true; // Enable update mode
  }

  updateSelectedBloc(): void {
    if (this.selectedBloc) {
      this.blocService.updateBloc(this.selectedBloc).subscribe(
        (updatedBloc: Bloc) => {
          const index = this.blocs.findIndex(b => b.idBloc === updatedBloc.idBloc);
          if (index !== -1) this.blocs[index] = updatedBloc;
          this.isUpdateMode = false; // Disable update mode after saving
          this.selectedBloc = undefined; // Clear selected bloc after update
        },
        (error: any) => console.error('Erreur lors de la mise à jour du bloc', error)
      );
    }
  }

  findBlocById(id: number): void {
    this.blocService.findBlocById(id).subscribe(
      (bloc: Bloc) => {
        console.log('Bloc trouvé par ID :', bloc); // Log pour vérifier la réponse
        this.selectedBloc = bloc;
      },
      (error: any) => console.error('Erreur lors de la récupération du bloc', error)
    );
  }

  findByChambresIdChambre(): void {
    this.blocService.findByChambresIdChambre(this.idChambre).subscribe(
      (data: Bloc[]) => {
        console.log('Blocs trouvés par ID de chambre :', data); // Log pour vérifier la réponse
        this.blocs = data; // Mettre à jour blocs pour afficher les résultats
      },
      (error: any) => console.error('Erreur lors de la recherche par chambre', error)
    );
  }



  findByFoyerIdFoyer(): void {
    this.blocService.findByFoyerIdFoyer(this.idFoyer).subscribe(
      (data: Bloc[]) => (this.blocs = data),
      (error: any) => console.error('Erreur lors de la recherche par foyer', error)
    );
  }
  onBlocSelected(event: Event): void {
    const selectedId = +(event.target as HTMLSelectElement).value;
    this.findBlocById(selectedId);
  }

}

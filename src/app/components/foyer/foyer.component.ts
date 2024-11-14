import { Component, OnInit } from '@angular/core';
import { FoyerService } from '../../services/foyer.service';
import { Foyer } from '../../models/foyer';

@Component({
  selector: 'app-cfoyer',
  templateUrl: './foyer.component.html',
  styleUrls: ['./foyer.component.css']
})
export class foyerComponent implements OnInit {

  foyers: Foyer[] = [];
  newFoyer: Foyer = {
    idFoyer: 0,
    nomFoyer: '',
    adresse: '',
    capaciteFoyer: 0
  };
  selectedFoyer: Foyer | null = null;

  constructor(private foyerService: FoyerService) { }

  ngOnInit(): void {
    this.getFoyers();
  }

  getFoyers(): void {
    this.foyerService.getAllFoyers().subscribe((data: Foyer[]) => {
      this.foyers = data;
    });
  }

  selectFoyer(foyer: Foyer): void {
    this.selectedFoyer = { ...foyer };
  }

  addFoyer(): void {
    this.foyerService.addFoyer(this.newFoyer).subscribe((foyer: Foyer) => {
      this.foyers.push(foyer);
      this.newFoyer = { idFoyer: 0, nomFoyer: '', adresse: '', capaciteFoyer: 0 }; // reset form
    });
  }

  updateFoyer(): void {
    if (this.selectedFoyer) {
      this.foyerService.updateFoyer(this.selectedFoyer).subscribe((foyer: Foyer) => {
        const index = this.foyers.findIndex(f => f.idFoyer === foyer.idFoyer);
        if (index !== -1) {
          this.foyers[index] = foyer;
        }
        this.selectedFoyer = null;
      });
    }
  }

  deleteFoyer(idFoyer: number): void {
    this.foyerService.deleteFoyer(idFoyer).subscribe(() => {
      this.foyers = this.foyers.filter(f => f.idFoyer !== idFoyer);
    });
  }
}

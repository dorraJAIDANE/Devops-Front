import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocComponent } from './components/bloc/bloc.component';
import { ChambreComponent } from './components/chambre/chambre.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { UniversiteComponent } from './components/universite/universite.component';
import { foyerComponent } from './components/foyer/foyer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';

const routes: Routes = [

  { path: 'blocs', component: BlocComponent },
  { path: 'chambres', component: ChambreComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'universites', component: UniversiteComponent },
  { path: 'foyers', component: foyerComponent },
  { path: 'etudiant', component: EtudiantComponent },
  { path: 'navbar', component: NavbarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

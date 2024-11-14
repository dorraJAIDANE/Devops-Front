import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';  // Importation du module de routage
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlocComponent } from './components/bloc/bloc.component';
import { ChambreComponent } from './components/chambre/chambre.component';
import { foyerComponent } from './components/foyer/foyer.component';
import { UniversiteComponent } from './components/universite/universite.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlocComponent,
    ChambreComponent,
    foyerComponent,
    UniversiteComponent,
    EtudiantComponent,
    // Autres composants...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

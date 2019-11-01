import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SorteioComponent } from './components/sorteio/sorteio.component';
import { MusicaComponent } from './components/musica/musica.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sorteio', component: SorteioComponent },
  { path: 'musica', component: MusicaComponent },
  {
    path: '',
    redirectTo: '/home',    
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

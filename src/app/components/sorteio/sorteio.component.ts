import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mock } from '../../../assets/mock'
import { Location } from '@angular/common';

@Component({
  selector: 'app-sorteio',
  templateUrl: './sorteio.component.html',
  styleUrls: ['./sorteio.component.css']
})
export class SorteioComponent implements OnInit {

  todasAsCategorias = mock;
  codigoDoCampeonato;
  informacoesDoCampeonato;
  faseAtual;
  temListaA = false;
  temListaB = false;

  constructor(private route: ActivatedRoute, private router: Router, private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.codigoDoCampeonato = paramsId.campeonato;
      this.buscaInformacao()
    })
  }

  buscaInformacao() {
    this.todasAsCategorias.forEach((categoria) => {
      if (categoria.codigo == this.codigoDoCampeonato)
        this.informacoesDoCampeonato = categoria;
    })
  }

  selecionaFase(fase) {
    this.temListaA = false;
    this.temListaB = false;
    this.faseAtual = fase;
    if (fase.grupoDeMusicas[0].musicas.length > 0)
      this.temListaA = true;
    if (fase.grupoDeMusicas[1].musicas.length > 0)
      this.temListaB = true;
  }

  sorteia(lista) {
    this.router.navigate(['musica', {
      campeonato: JSON.stringify(this.informacoesDoCampeonato),
      faseAtual: JSON.stringify(this.faseAtual),
      listaDeMusicas: lista
    }])
  }

  back() {
    this._location.back();
  }

}

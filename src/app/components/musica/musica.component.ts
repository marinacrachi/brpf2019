import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-musica',
  templateUrl: './musica.component.html',
  styleUrls: ['./musica.component.css']
})
export class MusicaComponent implements OnInit {

  campeonato;
  faseAtual;
  listaDeMusicas;
  musicaSorteada1 = 'assets/categorias/musica0.png';
  musicaSorteada2 = 'assets/categorias/musica0.png';
  mostra = false;

  constructor(private route: ActivatedRoute, private router: Router, private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.campeonato = JSON.parse(paramsId.campeonato)
      this.faseAtual = JSON.parse(paramsId.faseAtual)
      this.listaDeMusicas = paramsId.listaDeMusicas
    })

    if (this.faseAtual.codigo == 'final') {
      this.playAudio(this.campeonato.codigo)
    } else {
      this.playAudio('normal2')
    }

    var shuffleImagens = setInterval(() => {
      this.musicaSorteada1 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      this.musicaSorteada2 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      this.mostra = !this.mostra;
    }, 200);

    setTimeout(() => {
      clearInterval(shuffleImagens);
    }, 10000);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  sorteiaMusica() {
    let min = this.faseAtual.grupoDeMusicas[this.listaDeMusicas].musicas[0]
    let max = this.faseAtual.grupoDeMusicas[this.listaDeMusicas].musicas[this.faseAtual.grupoDeMusicas[this.listaDeMusicas].musicas.length - 1]
    return this.getRandomIntInclusive(min, max)
  }

  playAudio(campeonato) {
    let audio = new Audio();
    audio.src = `assets/musicas/${campeonato}.mp3`;
    audio.load();
    audio.play();
  }

  back() {
    this._location.back();
  }
}

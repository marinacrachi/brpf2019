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
  musicaAtual = 0;
  musicaAnterior;

  constructor(private route: ActivatedRoute, private router: Router, private _location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.campeonato = JSON.parse(paramsId.campeonato)
      this.faseAtual = JSON.parse(paramsId.faseAtual)
      this.listaDeMusicas = this.faseAtual.grupoDeMusicas[paramsId.listaDeMusicas].musicas
    })

    setTimeout(() => {

      if (this.faseAtual.codigo == 'final') {
        this.playAudio(this.campeonato.codigo)
      } else {
        this.playAudio('normal2')
      }

      let pos = 0;

      var shuffleImagens = setInterval(() => {
        if (pos < this.listaDeMusicas.length) {
          this.musicaAtual = this.listaDeMusicas[pos];
          this.musicaAnterior = this.listaDeMusicas[pos - 1];
        } else {
          pos = 0;
          this.musicaAtual = this.listaDeMusicas[pos];
          this.musicaAnterior = this.listaDeMusicas[this.listaDeMusicas.length - 1];
        }
        pos++;
      }, 100);

      setTimeout(() => {
        clearInterval(shuffleImagens);

        let pos = this.sorteiaMusica();
        // this.playMusicaSorteada(pos)

        if (pos < this.listaDeMusicas.length) {
          this.musicaAtual = this.listaDeMusicas[pos];
          this.musicaAnterior = this.listaDeMusicas[pos - 1];
        } else {
          pos = 0;
          this.musicaAtual = this.listaDeMusicas[pos];
          this.musicaAnterior = this.listaDeMusicas[this.listaDeMusicas.length - 1];
        }

      }, 10000);

    }, 2000)
  }

  mostraImagem(musicaId) {
    console.log("mostra imagem");
    console.log(musicaId);
    return this.musicaAtual == musicaId;
  }

  saiImagem(musicaId) {
    return this.musicaAnterior == musicaId;
  }

  setaBg(musicaId) {
    return { 'background-image': `url(assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${musicaId}.png)` }
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  sorteiaMusica() {
    let min = 0;
    let max = this.listaDeMusicas.length - 1;
    console.log(`sorteando entre ${min} e ${max}`)
    return this.getRandomIntInclusive(min, max)
  }

  playAudio(campeonato) {
    let audio = new Audio();
    audio.src = `assets/musicas/${campeonato}.mp3`;
    audio.load();
    audio.play();
  }

  playMusicaSorteada(musicaId) {
    console.log('tocando musica ', musicaId)
    let audio = new Audio();
    audio.src = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${musicaId}.mp3`;
    audio.load();
    audio.currentTime = 15
    audio.play();
    setTimeout(() => { audio.pause() }, 10000)
  }

  back() {
    this._location.back();
  }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent implements OnInit {
  campeonato;
  faseAtual;
  listaDeMusicas;
  // musicaSorteada1 = 'assets/categorias/musica0.png';
  // musicaSorteada2 = 'assets/categorias/musica0.png';
  // musicaSorteada3 = 'assets/categorias/musica0.png';
  // musicaSorteada4 = 'assets/categorias/musica0.png';
  // musicaSorteada5 = 'assets/categorias/musica0.png';
  // musicaSorteada6 = 'assets/categorias/musica0.png';
  // musicaFinal = 'assets/categorias/musica0.png';
  // mostraSorteio = false;
  // mostra = false;
  // style = {};
  musicaAtual = 0;
  musicaAnterior;
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

    let pos = 0;
    var shuffleImagens = setInterval(() => {
      // this.musicaSorteada1 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      // this.musicaSorteada2 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      // this.musicaSorteada3 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      // this.musicaSorteada4 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      // this.musicaSorteada5 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      // this.musicaSorteada6 = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      console.log("teste");
      if (pos < this.listaDeMusicas.length) {
        this.musicaAtual = this.listaDeMusicas[pos];
        this.musicaAnterior = this.listaDeMusicas[pos - 1];
      }
      else {
        pos = 0;
        this.musicaAtual = this.listaDeMusicas[pos];
        this.musicaAnterior = this.listaDeMusicas[this.listaDeMusicas.length - 1];
      }
      pos++;
      // console.log(this.getRandomIntInclusive(1, 15))
    }, 100);
    
    setTimeout(() => {
      clearInterval(shuffleImagens);
      let min = this.faseAtual.grupoDeMusicas[this.listaDeMusicas].musicas[0]
      let max = this.faseAtual.grupoDeMusicas[this.listaDeMusicas].musicas[this.faseAtual.grupoDeMusicas[this.listaDeMusicas].musicas.length - 1]
      this.musicaAtual = this.getRandomIntInclusive(min, max);
      // this.mostraSorteio = true;
      // this.musicaFinal = `assets/categorias/${this.campeonato.codigo}/${this.faseAtual.codigo}/${this.sorteiaMusica()}.png`
      // this.style = {'background-image': 'url(' + this.musicaFinal + ')', 'background-size': 'cover'}
    }, 10000);
  }

  mostraImagem(musicaId) {
    return this.musicaAtual == musicaId;
  }
  saiImagem(musicaId) {
    return this.musicaAnterior == musicaId;
  }
  setaBg(musicaId) {
    return { 'background-image': `url(../../../assets/categorias/intermediario/fase-1/${musicaId}.png)` }
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
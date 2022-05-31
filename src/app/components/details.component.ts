import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from '../models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-details',
  styles: [
    `    
    .details_wrapper{
      @apply max-w-4xl my-5 mx-auto relative;
    }
    .details ::ng-deep mwl-gauge{
      @apply w-36 h-36 block p-3;
    }
    .details ::ng-deep mwl-gauge .dial{
      stroke-width:10
    }
    .details ::ng-deep mwl-gauge .value{
      stroke-dasharray : none;
      stroke-width:13
    }
    .details ::ng-deep mwl-gauge .value-text{
      @apply font-bold text-2xl;
      fill:#fff;
    }
    .game_gauge{
      @apply absolute top-12 right-0;  
    }
    .game_gauge_label{
      @apply text-xl text-white relative bottom-14;
    }
    .game_banner{
      @apply overflow-hidden ;
      height:442px;
    }
    .game_banner_img{
      @apply w-full;
      filter:blur(5px)
    }
    .game_content{
      @apply relative text-center;
      top:-280px
    }
    .game_header_title{
      @apply text-7xl text-white font-bold;
      line-height:70px
    }
    .game_header_release_date{
      @apply text-white font-bold;
    }
    .game_header_genres{
      @apply text-white font-bold;
    }
    `
  ],
  template: `
    <div class='details'>
      <div class='game_banner'>
      <img
        class="game_banner_img"
        [src]='game.background_image'
        alt="background image"
      />
      </div>
      <div class='game_content'>
        <div class='details_wrapper'>
          <div class='game_header'>
            <h1 class='game_header_title'>{{game.name}}</h1>
            <h2 class='game_header_release_date'>Release: {{game.released | date}}</h2>
            <p *ngFor="let genre of game.genres;last as last" class="game_header_genres">
              {{genre.name}}<span *ngIf='!last'>, </span>
            </p>
            <div class='game_gauge'>
              <mwl-gauge class='two' [max]='100' [dialStartAngle]='180' [dialEndAngle]='0' [value]='gameRating' [animated]='true' [animationDuration]='2' [color]='getColor' >                
              </mwl-gauge>
              <a [href]='game.metacritic_url' class='game_gauge_label' target='_blank'>Metacritic</a>
            </div>
          </div>
          <app-game-tabs [game]='game'></app-game-tabs>
        </div>
      </div>
    </div>
    <button (click)='test()'>test</button>
  `,
  providers:[HttpService]
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating:number=0
  gameId:string=''
  game!:Game
  routeSub!:Subscription
  gameSub!:Subscription
  constructor(private activatedRoute:ActivatedRoute, private httpService:HttpService) { }
  
  ngOnDestroy(): void {
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }
    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params:Params)=>{
      this.gameId = params['id']
      this.gameDetails(this.gameId)
    })
    
  }
  test(){
    console.log(this.game)
  }
  getColor(value:number):string{
    if(value>75){
      return '#5ee432'
    }
    else if(value>50){
      return '#fffa50'
    }
    else if(value>30){
      return '#f7aa38'
    }
    else{
      return '#ef4655'
    }
  }
  gameDetails(id:string):void{
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResponse:Game)=>{
      this.game = gameResponse
      setTimeout(() => {
        this.gameRating = this.game.metacritic
      }, 1000);
    })
  }
} 

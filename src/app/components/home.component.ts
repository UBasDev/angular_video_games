import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from '../models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  template: `
    <div class='filters'>
    <mat-form-field appearance="legacy">
        <mat-label class='sort_form_label'>Sort</mat-label>
        <mat-select (selectionChange)='searchGames(sort)' [(ngModel)]='sort' panelClass='sort-select'>
            <mat-option value='name'>Name</mat-option>
            <mat-option value='-released'>Released</mat-option>
            <mat-option value='-added'>Added</mat-option>
            <mat-option value='-created'>Created</mat-option>
            <mat-option value='-updated'>Updated</mat-option>
            <mat-option value='-rating'>Rating</mat-option>
            <mat-option value='metacritic'>Metacritic</mat-option>
        </mat-select>
    </mat-form-field>
</div>
<div class='games'>
  <ng-container *ngFor='let game of games'>
  <div class='game' (click)='openGameDetails(game.id)'>
    <div class='game_thumb_container'>
      <img *ngIf='game.background_image' [src]='game.background_image' alt='thumbnail' class='game_thumbnail'>
      <p *ngIf='!game.background_image'>No image :(</p>
    </div>
    <div class='game_description'>
      <p class='game_name'>
        {{game.name}}
      </p>
      <div class='game_platforms'>
        <img *ngFor='let gamePlatform of game.parent_platforms' src='../../assets/images/platforms/{{gamePlatform.platform.slug}}.svg' alt='{{gamePlatform.platform.slug}}' class='game_platform'>
      </div>
    </div>
  </div>
  </ng-container>
</div>
  `,
  styles: [
    `
    .filters{
      @apply max-w-7xl my-5 mx-auto pl-3;
    }
    ::ng-deep .mat-form-field-infix{
           background-color:#3f51b5; 
           border-color:#fff !important;
      border-top:none;
      padding-left:5px !important
    }
    ::ng-deep .mat-select-value,.mat-select-arrow,.mat-form-field-hide-placeholder .mat-select-placeholder,.mat-form-field-appearance-legacy .mat-form-field-label{
    color: #fff !important;
    opacity:1  
    }

    ::ng-deep .mat-form-field-label{
      color: #fff !important;      
    }

    ::ng-deep .mat-form-field-appearance-legacy .mat-form-field-label{
      padding-left:5px
    }
    ::ng-deep .mat-form-field-appearance-legacy .mat-form-field-underline{
      background-color:#fff !important
    }
    .games{
      @apply flex items-center justify-center flex-wrap max-w-7xl my-3 mx-auto;
    }
    .game{
      @apply w-72 m-3 h-80 overflow-hidden rounded-md cursor-pointer;
      background-color:#202020;
      box-shadow: 4px 3px 8px 0px rgb(200 152 44);
      transition-duration:.3s
    }
    .game:hover{
      box-shadow: 4px 3px 11px 6px rgb(200 152 44);
      transform:translateY(-3px)
    }
    .game_thumb_container{
      @apply relative h-44 text-white text-center;
      background-color:#000;
    }
    .game_thumbnail{
      @apply absolute top-0 left-0 right-0 my-0 mx-auto h-44;
    }
    .game_description{
      @apply p-5 flex flex-col justify-end h-40;
    }
    .game_name{
      @apply text-white font-bold text-xl whitespace-nowrap text-ellipsis overflow-hidden;
    }
    .game_platforms{
      @apply flex ;
    }
    .game_platform{
      @apply w-5 mr-3;
    }
    `
  ],
  providers:[HttpService]
})
export class HomeComponent implements OnInit, OnDestroy {

  sort: string = '';
  games?: Array<Game>;
  private routeSub!:Subscription;
  private gameSub!:Subscription;

  constructor(private httpService: HttpService, private router:Router, private activatedRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search'])
      }
      else{
        this.searchGames('metacrit')
      }
    })
  }  

  searchGames(sort:string, search?:string):void{
    console.log(sort)
    this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results
      console.log(gameList)
    })
  }

  openGameDetails(id:number):void{
    console.log(id)
    this.router.navigate(['details',id])
  }

}

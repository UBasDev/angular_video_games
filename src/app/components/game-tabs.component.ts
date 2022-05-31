import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models';

@Component({
  selector: 'app-game-tabs',
  styles: [
    `
    .game_tabs{
      @apply text-white text-left p-3;
      background:rgb(63 81 181 / 61%)
    }
    .game_tabs_per{
      padding:20px 20px 0 20px;
      margin-bottom:0
    }
    .game_tabs_link{
      @apply text-white ;
    }
    .game_tabs_votes{
      @apply ml-5 flex;
    }
    .game_votes_count{
      @apply ml-1 mr-3;
      vertical-align:super
    }
    :ng-deep .mat-tab-labels{
      justify-content:center
    }
    .game_votes_up{
      color:#5ee432
    }
    .game_votes_up{
      color:#ef4655
    }
    .game_description{
      @apply p-5;
    }
    .game_screenshot{
      @apply mt-1;
      width:calc(50%-10px)
    }
    .game_screenshot:nth-child(even){
      @apply ml-3;
    }
    .game_trailer{
      @apply w-full my-5 mx-0;
    }
    `
  ],
  template: `
    <div class='game_tabs'>
      <mat-tab-group mat-align-tabs='start' backgroundColor='primary'>
        <mat-tab label='About'>
          <p *ngIf='game.parent_platforms.length' class='game_tabs_per'>
            Platforms:
            <span *ngFor="let game of game.parent_platforms; last as last">{{game.platform.name}}<span *ngIf='!last'>, </span></span>
          </p>
          <p *ngIf='game.publishers.length' class='game_tabs_per'>
            Publishers:
            <span *ngFor="let publisher of game.publishers; last as last">{{publisher.name}}<span *ngIf='!last'>, </span></span>
          </p>
          <p *ngIf='game.website' class='game_tabs_per'>
            Website:
            <a class='game_tabs_link' [href]='game.website' target='_blank'>{{game.website}}</a>
          </p>
          <div class='game_description' [innerHTML]='game.description'></div>
          <p class='game_tabs_votes'>
            <ng-container *ngFor="let rating of game.ratings">
            <span *ngIf="rating.title === 'exceptional'">
              <mat-icon class='game_votes_up'>thumb_up</mat-icon>
              <span class='game_votes_count'>{{rating.count || 0}}</span>
            </span>
            <span *ngIf="rating.title == 'skip'">
              <mat-icon class='game_votes_down'>thumb_down</mat-icon>
              <span class='game_votes_count'>{{rating.count || 0}}</span>
            </span>
            </ng-container>
          </p>
        </mat-tab>
        <mat-tab label='Screenshots' *ngIf='game.screenshots.length'>
          <img *ngFor='let screenshot of game.screenshots' class='game_screenshot' alt='screenshot' [src]='screenshot.image'>
        </mat-tab>
        <mat-tab label="Trailers" *ngIf="game.trailers?.length">
      <video
        class="game-trailer"
        controls
        *ngFor="let trailer of game.trailers"
      >
        <source src="{{ trailer.data?.max }}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </mat-tab>
      </mat-tab-group>
    </div>
  `  
})
export class GameTabsComponent implements OnInit {
  @Input() game!:Game;

  constructor() { }

  ngOnInit(): void {
  }

}

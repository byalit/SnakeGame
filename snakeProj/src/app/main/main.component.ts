import { IntroComponent } from './../intro/intro.component';
import { Router } from '@angular/router';
import { UserdataService } from './../userdata.service';
import { Component, ViewChild , Input, EventEmitter, Output } from '@angular/core';
import {NgxSnakeComponent, NgxSnakeModule} from 'ngx-snake';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {  
  @Output() exitGame1 = new EventEmitter<void>();
  // @Input()
  public playerName1 = '';
  public bw = false;
  public title = 'Snake';
  public statusGame = "ready";
  public score = 0;   
  public history = [];
  public data = [];
  
  time: number = 0;
  display: string= '0';
  interval: any;
  
  constructor ( 
    private _userName: UserdataService,
    private _router: Router
    ) {
       if (!this._userName.playerName2) {
       this._router.navigate (['/IntroComponent']);
      }
  this.playerName1 = this._userName.playerName2;
  }

  startTimer() {
    this.time = 0;
    this.interval = setInterval(() => {
      if (this.time >= 0) {
        this.time++;
      } 
      this.display = this.time.toString();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  clearHistory(){
    this.history =[];
  }

  
   
  @ViewChild('game')
  private _snake!: NgxSnakeComponent;


  public foodEaten() {
    this.score++;
    }

  public gameOver() {
    this.time = 0;
    this.pauseTimer();
    this.statusGame = "over";
    alert('game over');
  }

  public gameStart() {
      this.statusGame = "started";
      this._snake.actionStart();
      this.startTimer();
  }

  public gameStop() {
    this.statusGame = "paused";
    this._snake.actionStop();
    this.pauseTimer();
  }

  public gameReset() {
    this.statusGame = "ready";
    this._snake.actionReset();
    this.time = 0;
    this.display = '0';
    this.pauseTimer();
    this.clearHistory();
  }
  
  public exitGame() {
    this.time = 0;
    this.display = '0';
    this.score = 0;
    this.history = [];
    this.statusGame = "ready";
    this._snake.actionReset();
    this.exitGame1.emit()
  }}


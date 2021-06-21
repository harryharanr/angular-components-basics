import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  @Input() init:number = 0;

  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  private countDownTimerRef: any = null;
  public counter: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCountDown();
  }

  startCountDown() {
    if(this.init && this.init > 0) {
      this.clearTimeOut();
      this.counter = this.init;
      this.doCountDown();
    }
  }

  doCountDown() {
    this.countDownTimerRef = setTimeout(() => {
      this.counter -= 1;
      this.processCountDown();
    }, 1000);
  }

  private clearTimeOut() {
    if(this.countDownTimerRef) {
      clearTimeout(this.countDownTimerRef);
      this.countDownTimerRef = null;
    }
  }

  processCountDown() {
    this.onDecrease.emit(this.counter);
    console.log('count is ', this.counter);

    if(this.counter === 0) {
      this.onComplete.emit();
      console.log('counter ends');
    } else {
      this.doCountDown();
    }
  }

}

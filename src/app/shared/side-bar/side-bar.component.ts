import { Component, OnChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'


@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public count: number = 7200;
  public counter: any;

  public second :number=0;
  public minute :number=0;
  public hour :number=0;

  constructor(public router: Router, public _route: ActivatedRoute, ) { }

  ngOnInit() {

    this.counter = setInterval(() => {
      this.timer()
    }, 1000);
  }


  timer() {
    this.count = this.count - 1;
    if (this.count == -1) {
      clearInterval(this.counter);
      return;
    }

    var seconds = this.count % 60;
    var minutes = Math.floor(this.count / 60);
    var hours = Math.floor(minutes / 60);
    minutes %= 60;
    hours %= 60;

    this.hour = hours;
    this.minute = minutes;
    this.second = seconds;

  }

}

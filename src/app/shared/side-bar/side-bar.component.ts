import { Component, OnChanges, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { MatSnackBar } from '@angular/material';
import { SocketService } from './../../socket.service'

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

  constructor(public socketService:SocketService, public appService: AppService, public snackBar: MatSnackBar, public router: Router, public _route: ActivatedRoute, ) { }

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


  public logout: any = () => {
    
    let userId = this.appService.getUserInfoFromLocalstorage().userId

    this.appService.logout(userId)
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {

          Cookie.delete('authtoken');

          this.socketService.exitSocket();

          this.router.navigate(['/sign-in']);

        } else {
          this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
            duration: 5000,
          });

        } // end condition

      }, (err) => {
        this.snackBar.open(`some error occured`, "Dismiss", {
          duration: 5000,
        });


      });

  } // end logout

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public userId: any;
  public pass1: any;
  public pass2: any;

  constructor( 
    public appService: AppService,
    public router: Router,
    private _route: ActivatedRoute,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {
  }

  
  public validation: any = () => {
    if (this.pass1 === this.pass2) {
      if (this.pass1.length > 6) {

        return true;

      } else {

        this.snackBar.open(`Please make sure your password is more than 8 character`, "Dismiss", {
          duration: 5000,
        });
        return false
      }
    } else {

      this.snackBar.open(`Please make sure you have enter same password in both feilds`, "Dismiss", {
        duration: 5000,
      });

    }

  }


  public changePasswordFunction: any = () => {

    if (this.validation()) {

      let captureId = this._route.snapshot.paramMap.get("userId");
      let data = {
        userId: captureId,
        password: this.pass1
      }
      this.appService.changePasswordFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
              duration: 5000,
            });
     
            setTimeout(() => {

              this.router.navigate(['/login']);

            }, 2000);

          } else {

            this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
              duration: 5000,
            });
          }

        }, (err) => {

          this.snackBar.open(`some error occured`, "Dismiss", {
            duration: 5000,
          });

        });

    }

  }

}

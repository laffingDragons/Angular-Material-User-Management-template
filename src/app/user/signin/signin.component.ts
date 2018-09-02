import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { MatSnackBar } from '@angular/material';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {

  public email: string;
  public password: string;
  public progress: boolean = false;



  constructor(public appService: AppService, public snackBar: MatSnackBar, public router: Router, public _route: ActivatedRoute, ) { }

  ngOnInit() {

  }

 
  //Validations
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  submit() {

    this.progress = true;

    if (this.email) {

      if (this.password.length >= 8) {

        let data = {
          email: this.email,
          password: this.password
        }
  
        this.appService.signinFunction(data)
          .subscribe((apiResponse) => {
  
            if (apiResponse.status === 200) {
  
  
              Cookie.set('authtoken', apiResponse.data.authToken);
            
  
              this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
  
              this.router.navigate(['/home']);
  
            } else if (apiResponse.status === 404) {
              this.progress = false;
              this.snackBar.open(`Email or Password wrong`, "Dismiss", {
                duration: 5000,
              });
  
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

      } else {

        this.snackBar.open(`Make sure your password is more than 8 random characters`, "Dismiss", {
          duration: 5000,
        })
      }
    } else {

      this.snackBar.open(`Please enter a valid Email and Password`, "Dismiss", {
        duration: 5000,
      })

    }

  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";


@Injectable()
export class AppService {

  public url = 'http://localhost:3000';

  constructor(public http: HttpClient) { }


  //get userinfo from localstoreage
  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))


  }


  //get all users
  public getAllUsers() {

    let response = this.http.get(`${this.url}/api/v1/users/view/all?authToken=${Cookie.get('authtoken')}`);

    return response;

  }

  //get all users
  public getUserInfo(id) {

    let response = this.http.get(`${this.url}/api/v1/users/${id}/details?authToken=${Cookie.get('authtoken')}`);

    return response;

  }

  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}/api/v1/users/signup`, params);

  } // end of signupFunction function.

  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/login`, params);

  } // end of signinFunction function.


  public forgotPasswordFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)

    return this.http.post(`${this.url}/api/v1/users/forgot-password`, params);

  } // end of forgotPasswordFunction function.


  public changePasswordFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('userId', data.userId)
      .set('password', data.password);

    return this.http.put(`${this.url}/api/v1/users/change-password`, params);

  } // end of signinFunction function.


  public logout(data): Observable<any> {

    const params = new HttpParams() 

      .set('authToken', Cookie.get('authtoken'))
      .set('userId', data)

    return this.http.post(`${this.url}/api/v1/users/logout`, params);

  } // end logout function


    //Friends request
    public request(freindId, userId): Observable<any>{

      const params = new HttpParams()
        .set('request', freindId)
        .set('authToken', Cookie.get('authtoken'))
        
      return this.http.put(`${this.url}/api/v1/users/${userId}/request`, params);
  
    }

    //Friends request
    public requested(freindId, userId): Observable<any>{

      const params = new HttpParams()
        .set('request', freindId)
        .set('authToken', Cookie.get('authtoken'))
        
      return this.http.put(`${this.url}/api/v1/users/${userId}/requested`, params);
  
    }


    //add as friend
     //Friends request
     public addAsFriend(freindId, userId): Observable<any>{

      const params = new HttpParams()
        .set('request', freindId)
        .set('authToken', Cookie.get('authtoken'))
        
      return this.http.put(`${this.url}/api/v1/users/${userId}/addAsFriend`, params);
  
    }


    //get all tasks
    public getAllTasks() {

      let response = this.http.get(`${this.url}/api/v1/task/all?authToken=${Cookie.get('authtoken')}`);

      return response;

    }

    //creating a task
    public createTask(taskObj): Observable<any>{

      const params = new HttpParams()
        .set('title', taskObj.title)
        .set('tasks', JSON.stringify(taskObj.tasks))
        .set('createdBy', taskObj.createdBy)
        .set('createdByUserId', taskObj.createdByUserId)
        .set('modifiedBy', taskObj.modifiedBy)
        .set('type', taskObj.type)
        .set('authToken', Cookie.get('authtoken'))
          
      return this.http.post(`${this.url}/api/v1/task/create`, params);
  
    }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;
      
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}

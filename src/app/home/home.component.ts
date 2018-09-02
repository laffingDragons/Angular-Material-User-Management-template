import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AppService } from "./../app.service";
import { SocketService } from './../socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { windowTime } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [SocketService]  //very important line if not included socket code will not hit for first time.
})
export class HomeComponent implements OnInit {

    // user related variables
    public users: any;
    public userId: string;
    public userInfo: any;

    // socketservice varialbes
    public authToken: string;
    public userList: any = [];
    public disconnectedSocket: boolean;

    // task variables
    public private: boolean = false;
    public title: any;
    public spinner: boolean = false;
    public taskCreationUpdate: boolean = false;
    public tasks : any;

    // nested form related variable
    public count: number = 1;
    taskNumberIds: number[] = [1];
    public taskList: string[];
    public subtask1: string;
    public subtask2: string;
    public subtask3: string;
    public subtask4: string;
    public subtask5: string;
    public subtask6: string;
    public subtask7: string;
    public subtask8: string;
    public subtask9: string;
    public subtask10: string;





    constructor(public SocketService: SocketService, public snackBar: MatSnackBar, public router: Router, public _route: ActivatedRoute, public appService: AppService) { }

    ngOnInit() {
        console.log('NG onit was called :');
        this.authToken = Cookie.get('authtoken');

        this.userId = this.appService.getUserInfoFromLocalstorage().userId;

        this.checkStatus();

        this.verifyUserConfirmation();

        this.getOnlineUserList();

        this.getNotify()

        this.getALLUsers();

        this.getUserDetails(this.userId);

        setTimeout(() => {
            this.getAllTasks()
        }, 2000);

    }

    // check to for validity
    public checkStatus: any = () => {

        if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

            this.router.navigate(['/']);

            return false;

        } else {

            return true;

        }

    } // end checkStatus



    public verifyUserConfirmation: any = () => {

        this.SocketService.verifyUser()
            .subscribe((data) => {

                this.disconnectedSocket = false;

                this.SocketService.setUser(this.authToken);

            });
    }


    public getOnlineUserList: any = () => {

        this.SocketService.onlineUserList()
            .subscribe((userList) => {

                this.userList = [];

                for (let x in userList) {

                    let temp = { 'userId': userList[x].userId, 'name': userList[x].fullName };

                    this.userList.push(temp);

                }
                console.log('UserList =>', this.userList);

            }); // end online-user-list
    }



    // Get all users
    getALLUsers() {

        this.appService.getAllUsers().subscribe(
            data => {
                this.users = data['data'];
            }
        )

    }//end of get all users

    // get detail of current user
    getUserDetails(id) {

        this.appService.getUserInfo(id).subscribe(
            data => {
                this.userInfo = data['data'];

            }
        )

    }

    addAsFriend(id, name) {

        // send friends request
        this.appService.request(this.userId, id).subscribe((apiResponse) => {

            if (apiResponse.status === 200) {

                this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
                    duration: 5000,
                });

                // sending notification
                let notifyObject = {
                    senderName: this.userInfo.firstName,
                    senderId: this.userId,
                    receiverName: name,
                    receiverId: id,
                    message: `${this.userInfo.firstName} has sent you friend's request`,
                    createdOn: new Date()
                }

                this.SocketService.sendNotify(notifyObject);

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


        // add user to pending or requested array
        this.appService.requested(this.userId, id).subscribe((apiResponse) => {

            if (apiResponse.status === 200) {

                this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
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

        // refreshing
        setTimeout(() => {
            this.ngOnInit();
        }, 1000);
    }



    // Add request user to friends array
    addToFriend(id, name) {

        // add friend to friends array
        this.appService.addAsFriend(id, this.userId).subscribe((apiResponse) => {

            if (apiResponse.status === 200) {

                this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
                    duration: 5000,
                });
                // sending notification
                let notifyObject = {
                    senderName: this.userInfo.firstName,
                    senderId: this.userId,
                    receiverName: name,
                    receiverId: id,
                    message: `${this.userInfo.firstName} has accepted your friend's request`,
                    createdOn: new Date()
                }

                this.SocketService.sendNotify(notifyObject)

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


        // refreshing
        setTimeout(() => {
            this.ngOnInit();
        }, 1000);
    }


    public getNotify: any = () => {

        this.SocketService.notify(this.userId)
            .subscribe((data) => {

                let message = data;

                console.log(message);


            });//end subscribe
    }// end get message from a user 


///////////////////////////////////////Task related code///////////////////////////////////

    // get all tasks
    public getAllTasks: any = () => {

        this.appService.getAllTasks().subscribe(
            data => {
                this.tasks = data['data'];
                console.log(this.tasks);
            }
            
        )

    }


    //create a task function
    public addTask: any = () => {
        this.taskList = [];

        if (this.title) {
            this.spinner = true;

            this.taskList.push(this.subtask1);
            this.taskList.push(this.subtask2);
            this.taskList.push(this.subtask3);
            this.taskList.push(this.subtask4);
            this.taskList.push(this.subtask5);
            this.taskList.push(this.subtask6);
            this.taskList.push(this.subtask7);
            this.taskList.push(this.subtask9);
            this.taskList.push(this.subtask10);

            let tempArray = this.taskList.filter(word => word);

            let taskObj = {
                title: this.title,
                type: '',
                tasks: [],
                createdByUserId: this.userId,
                createdBy: this.userInfo.firstName,
                modifiedBy: this.userInfo.firstName,
            }

            // handling private or public task
            if (this.private == true) {
                taskObj.type = 'private'
            } else {
                taskObj.type = 'public'
            }

            for (let task of tempArray) {

                let temp = {
                    task: '',
                    status: 'pending'
                }

                temp.task = task;

                taskObj.tasks.push(temp)
            }

            console.log('taskObj :', taskObj);
            this.appService.createTask(taskObj).subscribe(
                apiResponse=>{
                    
                    if (apiResponse.status === 200) {

                        this.snackBar.open(`${apiResponse.message}`, "Dismiss", {
                            duration: 2000,
                        });
                        
                      this.spinner = false;
                      this.taskCreationUpdate = true;

                      
                          window.location.reload()
                      

        
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
            

        }else{

            this.snackBar.open(`Please enter title`, "Dismiss", {
                duration: 2000,

            });
        }

    }

    // nested form
    remove(i: number) {
        this.count--
    }

    add() {
        this.taskNumberIds.push(++this.count);
    }

}

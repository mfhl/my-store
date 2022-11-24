import { Component,ViewChild,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { Auth } from './models/auth.model';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

import { HtmlParser } from '@angular/compiler';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  template :'<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit  {
  ngOnInit() {

    const token=this.tokenService.getToken();

    if(token){
      this.authService.profile()
      .subscribe()
    }
  }
  imgRta='';

  imgParent = '';
  showImg = true;

  //alerts
  //@ViewChild('closeButtonModalDetailProduct') closebutton: any;

  alertBool = '';
  alertBoolError = '';
  errorMessage = '';
  messageAlert = '';
  messageAlertPriv = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService:FilesService,
    private tokenService:TokenService
  ) {}

  //recibir informacion del hijo
  onLoaded(img: string) {
    console.log('log padre', img);
  }
  toggleimg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'pepito perez',
        email: 'pepitoperez@gmail.com',
        password: '12345',
        role:'customer'
       
      })
      .subscribe((rta) => {
        this.alertSusscesfull('User Created susscesfull' + ' ' + rta.id);
      },
      (error) => {
        this.errorMessage = error.message;
        this.alertsError('User Created Error');
      });
  }

  downloadPdf(){
    this.filesService.getFiles('my pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }
  onUpload(event:Event){
    const element= event.target as HTMLInputElement;
    const file= element.files?.item(0);
    if(file){
      this.filesService.uploadFile(file)

    }


  }



  //error Alerts
  alertsError(messageAlertPriv: string) {
    this.alertBoolError = '2';
    this.messageAlert = messageAlertPriv;
  }

  alertSusscesfull(messageAlertPriv: string) {
    this.alertBool = '1';
    this.messageAlert = messageAlertPriv;
  }

  closeAlertError() {
    this.alertBool = '';
    this.alertBoolError = '';
    this.messageAlert = '';
    console.log(this.messageAlert);
  }
  //end alerts
}

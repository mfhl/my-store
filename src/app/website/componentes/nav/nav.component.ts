import { Component, OnInit } from '@angular/core';

//services
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { CategoriesService } from '../../../services/categories.service';
import { StoreService } from '../../../services/store.service';

//models
import { Auth } from '../../../models/auth.model';
import { User } from 'src/app/models/user.model';
import {Category} from '../../../models/category.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  counter = 0;

  //alerts
  alertBool = '';
  alertBoolError = '';
  errorMessage = '';
  messageAlert = '';
  messageAlertPriv = '';

  //array categories en vacio
  categories:Category[]=[];



  profile:User|null=null;

  constructor(
    private storeService: StoreService, //inyeccion de dependencias
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService:CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();
  }
  logIn() {
    this.authService.logIn('pepitoperez@gmail.com', '12345').subscribe(
      (rta) => {
        //console.log(rta.access_token);
      //  this.token = rta.access_token;

        this.getProfile();//usar swhitchmap ojo
       // this.alertSusscesfull('user Log in Susscesfull' + ' ' + this.token);
      },
      (error) => {
        const statusText = '';
       // console.log(error.statusText);
        this.errorMessage = error.statusText;
        this.alertsError('user Log in Error ' + this.errorMessage);
      }
    );
  }

  getProfile() {
    this.authService.profile().subscribe((user) => {
      //console.log('hizo login y estos son sus datos',user);
      this.profile=user;

    });
  }

  getAllCategories(){
   this.categoriesService.getAll()
   .subscribe(data=>{
    this.categories=data;
   })
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
   // console.log(this.messageAlert);
  }
  //end alerts


}

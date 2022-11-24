import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
  userProfile: User|null=null;


  constructor(
    private storeService: StoreService, //inyeccion de dependencias
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService:CategoriesService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.getAllCategories();

    //check session profile 
    this.authService.user$
    .subscribe(data=>{
      this.userProfile=data
    })
    // .subscribe(data=>
    //   {
    //     this.userProfile=data;
    //   })
  }
  logIn() {
    this.authService.logIn('admin@mail.com', 'admin123').subscribe(
      (rta) => {

        this.getProfile();//usar swhitchmap ojo
      },
      (error) => {
        const statusText = '';
        this.errorMessage = error.statusText;
        this.alertsError('user Log in Error ' + this.errorMessage);
      }
    );
  }

  //log out session
  logout(){
    this.authService.logout();
    this.userProfile=null;
    this.router.navigate(['/home']);
  }

  getProfile() {
    this.authService.profile().subscribe((user) => {
      this.userProfile=user;
     // console.log('hizo login y estos son sus datos',user);
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

import { Component, OnInit } from '@angular/core';

//get profile services
import { AuthService } from '../../../services/auth.service';
//model user
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: User | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$
      .subscribe(data => {
        this.userProfile = data;
      })
  }

  //log out session 
  logOut() {
    // sessionStorage.removeItem('token'); 
    // sessionStorage.clear();
  }

}

import { Component, OnInit } from '@angular/core';

import {AppComponent} from './../../../app.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private appComponent:AppComponent
  ) { }

  ngOnInit(): void {
  }
  createUserLayout(){
    this.appComponent.createUser();
    
  }

}

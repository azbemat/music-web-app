/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Anas Zakariyah Bemat
* Student ID: 165239187 
* Date: 2021-08-13
*
* Link to Music App: https://seneca-music-tau.vercel.app/
* Link to User Api: https://secure-wave-75212.herokuapp.com/
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string = "";
  public token: any;

  constructor(private router: Router, private auth:AuthService) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
        this.token = this.auth.readToken();
      }
    });
  }

  handleSearch(): void{
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  logout(){
    console.log("Logout clicked")
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

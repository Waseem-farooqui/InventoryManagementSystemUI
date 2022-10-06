import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  status = false;
  footerYear: number;
  name: string;
  designation: string;
  constructor() { }

  ngOnInit(): void {
    this.footerYear = new Date().getFullYear();
  }
  clickEvent() {
    this.status = !this.status;
  }
  profile() {

  }
  logout(){

  }
}

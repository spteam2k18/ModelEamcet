import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Name:string="";
  phoneNo:string;
  Address:string ="";
  clgno:string="";
  city:string="";
  
  constructor() { }

  ngOnInit() {
    
  }

  next(){
    
    if(this.Name.length>0&& this.phoneNo.length > 0 && this.Address.length>0 &&this.clgno.length&&this.city.length){
      console.log("gj")
    }
  }
}

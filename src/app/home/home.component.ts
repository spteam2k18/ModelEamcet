import { Component, OnInit } from '@angular/core';
import {
   Router}    from '@angular/router';
import { CandidateService } from '../candidate.service';

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
  constructor(private router: Router,private Service: CandidateService) { }

  
  ngOnInit() {
    
  }

  next(){
    
    if(this.Name.length>0&& this.phoneNo.length > 0  &&this.clgno.length&&this.city.length){
      // console.log("gj")

      this.Service.set_data(this.Name,this.phoneNo,this.clgno,this.city);

      this.router.navigate(['instructions']);
      
    }else{
      if(confirm("Please Fill all your details")) {  
    }
    }
  }
}

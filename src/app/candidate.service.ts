import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  cand_name : string;
  cand_phoneno: string;
  cand_college_name: string;
  cand_location:string;

  constructor() { }
  set_data(name,ph,clg,loc)
  {
    this.cand_name = name;
    this.cand_phoneno = ph;
    this.cand_college_name = clg;
    this.cand_location =  loc;

  }
  get_data(){
    return([this.cand_name,this.cand_phoneno,this.cand_college_name,this.cand_location]);
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import {Router}    from '@angular/router';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-exam-page',
  templateUrl: './exam-page.component.html',
  styleUrls: ['./exam-page.component.css']
})
export class ExamPageComponent implements OnInit {

  Answers_txt_file:string[];
  question_response:string[]= [];
  // if status is 0 means not visited
  // if status is 1 means visited
  // if status is 2 answered
  // if status is 3 means mark for review
  // if statu is 5 not answerd
  question_status:number[]= [];
  
  question_images:string[] = [

    'assets/Questions/1.jpg', 'assets/Questions/2.jpg', 'assets/Questions/3.jpg', 'assets/Questions/4.jpg', 'assets/Questions/5.jpg', 'assets/Questions/6.jpg', 'assets/Questions/7.jpg', 'assets/Questions/8.jpg', 'assets/Questions/9.jpg', 'assets/Questions/10.jpg', 'assets/Questions/11.jpg', 'assets/Questions/12.jpg', 'assets/Questions/13.jpg', 'assets/Questions/14.jpg', 'assets/Questions/15.jpg', 'assets/Questions/16.jpg', 'assets/Questions/17.jpg', 'assets/Questions/18.jpg', 'assets/Questions/19.jpg', 'assets/Questions/20.jpg', 'assets/Questions/21.jpg', 'assets/Questions/22.jpg', 'assets/Questions/23.jpg', 'assets/Questions/24.jpg', 'assets/Questions/25.jpg', 'assets/Questions/26.jpg', 'assets/Questions/27.jpg', 'assets/Questions/28.jpg', 'assets/Questions/29.jpg', 'assets/Questions/30.jpg', 'assets/Questions/31.jpg', 'assets/Questions/32.jpg', 'assets/Questions/33.jpg', 'assets/Questions/34.jpg', 'assets/Questions/35.jpg', 'assets/Questions/36.jpg', 'assets/Questions/37.jpg', 'assets/Questions/38.jpg', 'assets/Questions/39.jpg', 'assets/Questions/40.jpg', 'assets/Questions/41.jpg', 'assets/Questions/42.jpg', 'assets/Questions/43.jpg', 'assets/Questions/44.jpg', 'assets/Questions/45.jpg', 'assets/Questions/46.jpg', 'assets/Questions/47.jpg', 'assets/Questions/48.jpg', 'assets/Questions/49.jpg', 'assets/Questions/50.jpg', 'assets/Questions/51.jpg', 'assets/Questions/52.jpg', 'assets/Questions/53.jpg', 'assets/Questions/54.jpg', 'assets/Questions/55.jpg', 'assets/Questions/56.jpg', 'assets/Questions/57.jpg', 'assets/Questions/58.jpg', 'assets/Questions/59.jpg', 'assets/Questions/60.jpg', 'assets/Questions/61.jpg', 'assets/Questions/62.jpg', 'assets/Questions/63.jpg', 'assets/Questions/64.jpg', 'assets/Questions/65.jpg', 'assets/Questions/66.jpg', 'assets/Questions/67.jpg', 'assets/Questions/68.jpg', 'assets/Questions/69.jpg', 'assets/Questions/70.jpg', 'assets/Questions/71.jpg', 'assets/Questions/72.jpg', 'assets/Questions/73.jpg', 'assets/Questions/74.jpg', 'assets/Questions/75.jpg', 'assets/Questions/76.jpg', 'assets/Questions/77.jpg', 'assets/Questions/78.jpg', 'assets/Questions/79.jpg', 'assets/Questions/80.jpg', 'assets/Questions/81.jpg', 'assets/Questions/82.jpg', 'assets/Questions/83.jpg', 'assets/Questions/84.jpg', 'assets/Questions/85.jpg', 'assets/Questions/86.jpg', 'assets/Questions/87.jpg', 'assets/Questions/88.jpg', 'assets/Questions/89.jpg', 'assets/Questions/90.jpg'
]
  Current_Showing = 0;

  done =""
  TimeOver = false;

  form = new FormGroup({
    response: new FormControl(''),
  });
  user_response = "";
  TextFile:string;
  Total = 0;
  result = false;
  cand_name:string;
  cand_clg:string;
  cand_phone:string;
  cand_city:string;


  constructor(private http:HttpClient,private spinner: NgxSpinnerService,private router: Router,private Service: CandidateService) {    }

  ngOnInit() {

    let data = this.Service.get_data();
    console.log(data);
    this.cand_name = data[0];
    this.cand_clg = data[2];
    this.cand_phone = data[1];
    this.cand_city = data[3];

    // for(var i=0;i<10;i++){this.question_response[i]= 0; }
    // intitlize the status arr to 0
    for(var j=0;j<90;j++){this.question_status[j]=0;   }

    this.http.get('assets/Answers.txt', { responseType: 'text' as 'json'}).subscribe(data => {
      //console.log(data);

      this.TextFile = data.toString();

      this.Answers_txt_file = this.TextFile.split(" ");
      //console.log(x[0]);

   })
   


    

  }
  clearform()
  {
    this.form.reset();
  }
  mark_review(){
     this.question_status[this.Current_Showing] = 3;   // answered successfully 
     this.Current_Showing+=1;
     this.form.reset()
   }

  saveandnext()
  {
      this.user_response = this.form.value['response'];
      this.form.reset();
      this.question_response[this.Current_Showing] = this.user_response;
      this.question_status[this.Current_Showing] = 2;   // answered successfully 
      this.Current_Showing +=1;
  }
  save()
  {
    this.user_response = this.form.value['response'];
    // this.form.reset();
    this.question_response[this.Current_Showing] = this.user_response;
    this.question_status[this.Current_Showing] = 2;   // answered successfully 

  }
  next()
  {
    this.form.reset()
    this.question_status[this.Current_Showing] = 5;   // visited the ques
      // this.Current_Showing +=1;
      this.set(this.Current_Showing+1)
  }
  
  saveAll()
  {
      if(this.TimeOver == false)
      {
          //popuop
          if(confirm("You are still left with few minutes, Are you sure to submit?")) {

            console.log("yes ");
            this.calculate_result();

            
        }
      }else{
        this.calculate_result();
      }
       
  }

  // overall logic 
calculate_result(){
  this.Total =0;
  this.spinner.show();

  for(let i=0;i<15;i++)
  {
      if(this.Answers_txt_file[i]===this.question_response[i])
      {
        this.Total++;
      }
  }

  this.spinner.hide();
  this.result  = true;

  
}
  
  set(x)
  {
    this.Current_Showing = x;
    if(this.question_status[this.Current_Showing] == 0)
    {
      this.form.reset();
    }else{
    this.form.setValue({
      response: this.question_response[this.Current_Showing]
    });
  }
    
  }
  mark_review_and_save(){

   this.user_response = this.form.value['response'];
      this.form.reset();
      this.question_response[this.Current_Showing] = this.user_response;
      this.question_status[this.Current_Showing] = 1;   // answered successfully  and marked
      this.Current_Showing +=1;
  }

  onFinished(){
    this.done = "Your Exam over "
    this.calculate_result();
    this.TimeOver = true;

  }
  onNotify(x)
  {
    
      this.done = "Last 5 Minutes ";
   
  }
  onStart(){
    
  }
  newuser(){
    this.router.navigate(['home']);
  }
}

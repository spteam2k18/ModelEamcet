import { Component, OnInit, HostListener } from '@angular/core';
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
// question_images:string[];
  Current_Showing = 0;

  done =""
  TimeOver = false;

  form = new FormGroup({
    response: new FormControl(''),
  });
  user_response = "";
  TextFile:string;
  Total=0;
  result = false;
  cand_name = "";
  cand_clg ="";
  cand_phone:string;
  cand_city:string;

  
  Correct: number;
  Wrong: number;
  NotAnwered: number;


  // chart varibals

  public pieChartLabels:string[] = ['Correct Answers', 'Wrong Answers', 'Not Answered'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  
  SetNum = 1;
  error =  false;
  exam: boolean;
  ans: string;


  constructor(private http:HttpClient,private spinner: NgxSpinnerService,private router: Router,private Service: CandidateService) {    }

  ngOnInit() {

    let data = this.Service.get_data();
    console.log(data);
    this.cand_name = data[0];
    this.cand_clg = data[2];
    this.cand_phone = data[1];
    this.cand_city = data[3];

    console.log(this.cand_name)
    if(this.cand_name == undefined)
    {
      this.error = true;
      this.exam= false;
    }else
    {
      this.exam= true;
    }
// random number generator 
    var min=1;
    var max=6;
    this.SetNum =  Math.floor(Math.random() * (max - min + 1)) + min;
// random number generator 




    for(var i=0;i<45;i++){this.question_response[i]= 'X'; }
    // intitlize the status arr to 0
    for(var j=0;j<45;j++){this.question_status[j]=0;   }

    this.ans = "assets/"+this.SetNum+"/key.txt";

    this.http.get(this.ans, { responseType: 'text' as 'json'}).subscribe(data => {
      //console.log(data);

      this.TextFile = data.toString();

      this.Answers_txt_file = this.TextFile.split(",");
      //console.log(x[0]);

   })


   if(this.SetNum==1)
   {

    this.question_images  = ['assets/1/2.JPG', 'assets/1/4.JPG', 'assets/1/6.JPG', 'assets/1/8.JPG', 'assets/1/10.JPG', 'assets/1/12.JPG', 'assets/1/14.JPG', 'assets/1/16.JPG', 'assets/1/18.JPG', 'assets/1/20.JPG', 'assets/1/22.JPG', 'assets/1/24.JPG', 'assets/1/26.JPG', 'assets/1/28.JPG', 'assets/1/30.JPG', 'assets/1/32.JPG', 'assets/1/34.JPG', 'assets/1/36.JPG', 'assets/1/38.JPG', 'assets/1/40.JPG', 'assets/1/42.JPG', 'assets/1/44.JPG', 'assets/1/46.JPG', 'assets/1/48.JPG', 'assets/1/50.JPG', 'assets/1/52.JPG', 'assets/1/54.JPG', 'assets/1/56.JPG', 'assets/1/58.JPG', 'assets/1/60.JPG', 'assets/1/62.JPG', 'assets/1/64.JPG', 'assets/1/66.JPG', 'assets/1/68.JPG', 'assets/1/70.JPG', 'assets/1/72.JPG', 'assets/1/74.JPG', 'assets/1/76.JPG', 'assets/1/78.JPG', 'assets/1/80.JPG', 'assets/1/82.JPG', 'assets/1/84.JPG', 'assets/1/86.JPG', 'assets/1/88.JPG', 'assets/1/90.JPG']

   }else if(this.SetNum==2)
   {
    this.question_images  =  ['assets/2/1.JPG', 'assets/2/3.JPG', 'assets/2/5.JPG', 'assets/2/7.JPG', 'assets/2/9.JPG', 'assets/2/11.JPG', 'assets/2/13.JPG', 'assets/2/15.JPG', 'assets/2/17.JPG', 'assets/2/19.JPG', 'assets/2/21.JPG', 'assets/2/23.JPG', 'assets/2/25.JPG', 'assets/2/27.JPG', 'assets/2/29.JPG', 'assets/2/31.JPG', 'assets/2/33.JPG', 'assets/2/35.JPG', 'assets/2/37.JPG', 'assets/2/39.JPG', 'assets/2/41.JPG', 'assets/2/43.JPG', 'assets/2/45.JPG', 'assets/2/47.JPG', 'assets/2/49.JPG', 'assets/2/51.JPG', 'assets/2/53.JPG', 'assets/2/55.JPG', 'assets/2/57.JPG', 'assets/2/59.JPG', 'assets/2/61.JPG', 'assets/2/63.JPG', 'assets/2/65.JPG', 'assets/2/67.JPG', 'assets/2/69.JPG', 'assets/2/71.JPG', 'assets/2/73.JPG', 'assets/2/75.JPG', 'assets/2/77.JPG', 'assets/2/79.JPG', 'assets/2/81.JPG', 'assets/2/83.JPG', 'assets/2/85.JPG', 'assets/2/87.JPG', 'assets/2/89.JPG']

   }else if(this.SetNum==3)
   {
     this.question_images =  ['assets/3/1.JPG', 'assets/3/3.JPG', 'assets/3/5.JPG', 'assets/3/7.JPG', 'assets/3/9.JPG', 'assets/3/11.JPG', 'assets/3/13.JPG', 'assets/3/15.JPG', 'assets/3/17.JPG', 'assets/3/19.JPG', 'assets/3/21.JPG', 'assets/3/23.JPG', 'assets/3/25.JPG', 'assets/3/27.JPG', 'assets/3/29.JPG', 'assets/3/31.JPG', 'assets/3/33.JPG', 'assets/3/35.JPG', 'assets/3/37.JPG', 'assets/3/39.JPG', 'assets/3/41.JPG', 'assets/3/43.JPG', 'assets/3/45.JPG', 'assets/3/47.JPG', 'assets/3/49.JPG', 'assets/3/51.JPG', 'assets/3/53.JPG', 'assets/3/55.JPG', 'assets/3/57.JPG', 'assets/3/59.JPG', 'assets/3/61.JPG', 'assets/3/63.JPG', 'assets/3/65.JPG', 'assets/3/67.JPG', 'assets/3/69.JPG', 'assets/3/71.JPG', 'assets/3/73.JPG', 'assets/3/75.JPG', 'assets/3/77.JPG', 'assets/3/79.JPG', 'assets/3/81.JPG', 'assets/3/83.JPG', 'assets/3/85.JPG', 'assets/3/87.JPG', 'assets/3/89.JPG']

   }else if(this.SetNum==4)
   {
   this.question_images = ['assets/4/1.JPG', 'assets/4/3.JPG', 'assets/4/5.JPG', 'assets/4/7.JPG', 'assets/4/9.JPG', 'assets/4/11.JPG', 'assets/4/13.JPG', 'assets/4/15.JPG', 'assets/4/17.JPG', 'assets/4/19.JPG', 'assets/4/21.JPG', 'assets/4/23.JPG', 'assets/4/25.JPG', 'assets/4/27.JPG', 'assets/4/29.JPG', 'assets/4/31.JPG', 'assets/4/33.JPG', 'assets/4/35.JPG', 'assets/4/37.JPG', 'assets/4/39.JPG', 'assets/4/41.JPG', 'assets/4/43.JPG', 'assets/4/45.JPG', 'assets/4/47.JPG', 'assets/4/49.JPG', 'assets/4/51.JPG', 'assets/4/53.JPG', 'assets/4/55.JPG', 'assets/4/57.JPG', 'assets/4/59.JPG', 'assets/4/61.JPG', 'assets/4/63.JPG', 'assets/4/65.JPG', 'assets/4/67.JPG', 'assets/4/69.JPG', 'assets/4/71.JPG', 'assets/4/73.JPG', 'assets/4/75.JPG', 'assets/4/77.JPG', 'assets/4/79.JPG', 'assets/4/81.JPG', 'assets/4/83.JPG', 'assets/4/85.JPG', 'assets/4/87.JPG', 'assets/4/89.JPG']

   }else if(this.SetNum==5)
   {
    this.question_images = ['assets/5/1.JPG', 'assets/5/3.JPG', 'assets/5/5.JPG', 'assets/5/7.JPG', 'assets/5/9.JPG', 'assets/5/11.JPG', 'assets/5/13.JPG', 'assets/5/15.JPG', 'assets/5/17.JPG', 'assets/5/19.JPG', 'assets/5/21.JPG', 'assets/5/23.JPG', 'assets/5/25.JPG', 'assets/5/27.JPG', 'assets/5/29.JPG', 'assets/5/31.JPG', 'assets/5/33.JPG', 'assets/5/35.JPG', 'assets/5/37.JPG', 'assets/5/39.JPG', 'assets/5/41.JPG', 'assets/5/43.JPG', 'assets/5/45.JPG', 'assets/5/47.JPG', 'assets/5/49.JPG', 'assets/5/51.JPG', 'assets/5/53.JPG', 'assets/5/55.JPG', 'assets/5/57.JPG', 'assets/5/59.JPG', 'assets/5/61.JPG', 'assets/5/63.JPG', 'assets/5/65.JPG', 'assets/5/67.JPG', 'assets/5/69.JPG', 'assets/5/71.JPG', 'assets/5/73.JPG', 'assets/5/75.JPG', 'assets/5/77.JPG', 'assets/5/79.JPG', 'assets/5/81.JPG', 'assets/5/83.JPG', 'assets/5/85.JPG', 'assets/5/87.JPG', 'assets/5/89.JPG']

   }else if(this.SetNum==6)
   {
    this.question_images = ['assets/6/1.JPG', 'assets/6/3.JPG', 'assets/6/5.JPG', 'assets/6/7.JPG', 'assets/6/9.JPG', 'assets/6/11.JPG', 'assets/6/13.JPG', 'assets/6/15.JPG', 'assets/6/17.JPG', 'assets/6/19.JPG', 'assets/6/21.JPG', 'assets/6/23.JPG', 'assets/6/25.JPG', 'assets/6/27.JPG', 'assets/6/29.JPG', 'assets/6/31.JPG', 'assets/6/33.JPG', 'assets/6/35.JPG', 'assets/6/37.JPG', 'assets/6/39.JPG', 'assets/6/41.JPG', 'assets/6/43.JPG', 'assets/6/45.JPG', 'assets/6/47.JPG', 'assets/6/49.JPG', 'assets/6/51.JPG', 'assets/6/53.JPG', 'assets/6/55.JPG', 'assets/6/57.JPG', 'assets/6/59.JPG', 'assets/6/61.JPG', 'assets/6/63.JPG', 'assets/6/65.JPG', 'assets/6/67.JPG', 'assets/6/69.JPG', 'assets/6/71.JPG', 'assets/6/73.JPG', 'assets/6/75.JPG', 'assets/6/77.JPG', 'assets/6/79.JPG', 'assets/6/81.JPG', 'assets/6/83.JPG', 'assets/6/85.JPG', 'assets/6/87.JPG', 'assets/6/89.JPG']
   }
   
 

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
  this.Correct =0;
  this.Wrong = 0;
  this.NotAnwered =0;
  this.spinner.show();

  for(let i=0;i<45;i++)
  {
      if(this.Answers_txt_file[i]===this.question_response[i])
      {
        this.Correct++;
      }else if(this.question_response[i]==='X') {
        this.NotAnwered++;
      }else{
        this.Wrong++;
      }
  }

  this.Total = this.Correct*4;
  this.Total = this.Total - (this.Wrong);

  this.spinner.hide();
  this.result  = true;

  this.pieChartData[0] = this.Correct;
  this.pieChartData[1] = this.Wrong;
  this.pieChartData[2] = this.NotAnwered;

  this.exam=false;


  
  
 
  
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


  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    // alert("Are you really want to refresh.. ? this may result lost your complete exam !")
    // Do more processing...
    event.returnValue = false;
}

 
}

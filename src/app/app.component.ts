import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Empploye_Stepper_App_Angular_17';
  designationList:any[]=[];
  roleList:any[]=[];
  stepsList:any []=[ 
      {stepName: 'Basic Details',isComplete: false},
      {stepName: 'Skills',isComplete: false},
      {stepName: 'Experience',isComplete: false}
  ];
  activeStep: any = this.stepsList[0];

  employeeObj: any={
    "roleId": 0,
    "userName": "",
    "empCode": "",
    "empId": 0,
    "empName": "",
    "empEmailId": "",
    "empDesignationId": 0,
    "empContactNo": "",
    "empAltContactNo": "",
    "empPersonalEmailId": "",
    "empExpTotalYear": 0,
    "empExpTotalMonth": 0,
    "empCity": "",
    "empState": "",
    "empPinCode": "",
    "empAddress": "",
    "empPerCity": "",
    "empPerState": "",
    "empPerPinCode": "",
    "empPerAddress": "",
    "password": "",
    "erpEmployeeSkills":[],
    "ermEmpExperiences":[]
  }

  empSkillObj:any={
    "empSkillId": 0,
    "empId": 0,
    "skill": "string",
    "totalYearExp": 0,
    "lastVersionUsed": "string"
  }
  empExpObj : any = {
    "empExpId": 0,
      "empId": 0,
      "companyName": "string",
      "startDate": "2024-05-29T06:29:24.818Z",
      "endDate": "2024-05-29T06:29:24.818Z",
      "designation": "string",
      "projectsWorkedOn": "string"
  }

  addSkill(){
    const skillObj= {
    "empSkillId": 0,
    "empId": 0,
    "skill": "",
    "totalYearExp": 0,
    "lastVersionUsed": ""
    }
    this.employeeObj.erpEmployeeSkills.unshift(skillObj)
  }
  addExp(){
    const expObj= {
      "empExpId": 0,
      "empId": 0,
      "companyName": "",
      "startDate": "2024-05-29T06:29:24.818Z",
      "endDate": "2024-05-29T06:29:24.818Z",
      "designation": "",
      "projectsWorkedOn": ""
    }
    this.employeeObj.ermEmpExperiences.unshift(expObj)
  }

  loadDesignations(){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation").subscribe((res:any)=>{
      this.designationList =  res.data;
    })
  }
  loadRoles(){
    this.http.get("https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles").subscribe((res:any)=>{
      this.roleList =  res.data;
    })
  }
  constructor(private http: HttpClient){

  }
  stepperCompletionValue:number=8;
  ngOnInit(): void {
      this.loadDesignations();
      this.loadRoles();
  }
  setActiveStep(activeStep: any){
    this.activeStep=activeStep;
  }
  gotoStep2(){
    const currentStep=this.stepsList.find(m=>m.stepName==this.activeStep.stepName);
    currentStep.isComplete=true;
    this.activeStep=this.stepsList[1];
    this.stepperCompletionValue=50;
  }
  gotoStep3(){
    const currentStep=this.stepsList.find(m=>m.stepName==this.activeStep.stepName);
    currentStep.isComplete=true;
    this.activeStep=this.stepsList[2];
    this.stepperCompletionValue=100;
  }
  saveEmployee(){
    debugger;
    this.http.post("https://freeapi.gerasim.in/api/ClientStrive/CreateNewEmployee",this.employeeObj).subscribe((res:any)=>{
      if(res.result){
        alert('Employee Creation Sucess')
      }else{
        alert(res.messaage)
      }
    })
  }
}


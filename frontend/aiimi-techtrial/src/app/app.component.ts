import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faUserPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'att-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle: string = "Omar's Aiimi Technical Assessment";
  searchAreaStatus: boolean = true;
  showForm: boolean = false;
  backendURL: string = 'http://127.0.0.1:5000'
  faUserPlus = faUserPlus;
  faCircleXmark = faCircleXmark;
  searchQuery: string = '';
  peopleData: Array<Employee> = [];
  namesArray: Array<string> = [];
  userAdded: boolean = false

  constructor(private http: HttpClient){}
  
  onStatusChange(newStatus: boolean): void{
    this.searchAreaStatus = newStatus
  };

  onNewQuery(query: string): void{
    this.searchQuery = query
    this.showForm = false
  };

  getEmployeeData(): Observable<CoreEmployeeData> {
    var data = this.http.get<CoreEmployeeData>(this.backendURL+'/employeedata')
    return data
  }

  getJustNames(): Observable<NamesObject>{
    var data = this.http.get<NamesObject>(this.backendURL+'/justnames')
    return data
  }

  onNewUserClick(): void {
    this.showForm = !this.showForm
    this.searchAreaStatus = true
  }

  onUserAdded(): void{
    this.getBackendData()
    this.showForm = false
    this.userAdded = true
  }

  getBackendData(): void{
    this.getEmployeeData().subscribe({
      next: empData => this.peopleData = empData.Employees
    })

    this.getJustNames().subscribe({
      next: justNames => this.namesArray = justNames.Names,
      error: err => window.alert('Failed to retieve backend data- Check that flask server is running!')
    })
  }

  ngOnInit(): void {
    this.getBackendData()
  }
  }


type Employee = {
  FirstName: string;
  LastName: string;
  JobTitle: string;
  Phone: string;
  Email: string;
};

type CoreEmployeeData = {
  Employees: Array<Employee>
}

type NamesObject = {
  Names: Array<string>
}
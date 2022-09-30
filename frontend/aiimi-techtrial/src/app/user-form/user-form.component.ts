import { HttpClient } from "@angular/common/http";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Observable } from "rxjs";

@Component({
    selector: 'att-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']

})
export class UserFormComponent {
    @Input() backendURL = ''
    @Output() notifyUserAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
    originalFormInputs: Employee = {
        FirstName: '',
        LastName: '',
        JobTitle: '',
        Phone: '',
        Email: ''
    };
    formInputs : Employee = {...this.originalFormInputs}
    faTriangleExclamation = faTriangleExclamation


    constructor(private http: HttpClient){}

    onSubmit(form: NgForm): void {
        if (form.valid){
            this.postFormForConflicts(this.formInputs).subscribe({
                next: conflictsResponse => this.checkConflicts(conflictsResponse),
                error: err => window.alert('Failed to retieve backend data- Check that flask server is running!')
              });
        }
    }

    postFormForConflicts(userForm: Employee): Observable<any>{
        return this.http.post(this.backendURL + '/checkconflicts', userForm);
    }

    postFormAddUser(userForm: Employee): Observable<any>{
        return this.http.post(this.backendURL + '/newuser', userForm);
    }

    userAdded(): void {
        this.notifyUserAdded.emit(true)
    }

    checkConflicts(resp: any){
        if (resp.conflicts){
            window.alert("Failed to add user - A user already exists with a matching email or phone")
        } else {
            this.postFormAddUser(this.formInputs).subscribe({
                next: newUser => this.userAdded(),
                error: err => window.alert('Failed to add new user - please try again')
            })
        }
    }
}



interface Employee {
    FirstName: string;
    LastName: string;
    JobTitle: string;
    Phone: string;
    Email: string;
};
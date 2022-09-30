import { Component, Input, OnInit, SimpleChanges } from "@angular/core";

@Component({
    selector: 'att-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    @Input() peopleData: Array<Employee> = []
    @Input() searchQuery: string = ''
    employees: Array<Employee> = [];
    filteredEmployees: Array<Employee> = [];

    filterFunction(): void {
        if (this.searchQuery == '') {
            this.filteredEmployees = this.peopleData
        } else {

            var params = this.searchQuery.trim().split(" ", 2)
            if (params.length == 0) {
                this.filteredEmployees = this.peopleData
            } else if (params.length == 1){
                var filtered =[]
                for (var person of this.peopleData) {
                    if (person.FirstName.toLowerCase().includes(params[0].toLowerCase()) || person.LastName.toLowerCase().includes(params[0].toLowerCase())){
                        filtered.push(person)
                    }
                }
                this.filteredEmployees = filtered
            } else if (params.length == 2){
                var fname = params[0].trim().toLowerCase()
                var lname = params[1].trim().toLowerCase()
                var filtered = []
                for (var person of this.peopleData) {
                    if (person.FirstName.toLowerCase().includes(fname) && person.LastName.toLowerCase().includes(lname)){
                        filtered.push(person)
                    }
                }
                this.filteredEmployees = filtered
            }


        }
    }

    ngOnInit(): void {
        this.filterFunction()
    }
    ngOnChanges(changes: SimpleChanges){
        this.filterFunction()
    }
}

type Employee = {
    FirstName: string;
    LastName: string;
    JobTitle: string;
    Phone: string;
    Email: string;
};
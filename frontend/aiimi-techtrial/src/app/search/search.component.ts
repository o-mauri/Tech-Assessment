import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'att-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']

})
export class SearchComponent {
    @Input() searchAreaStatus: boolean = true;
    @Input() justNames: Array<string> = []
    searchQuery: string = ''
    suggestedNames: Array<Array<string>> = []

    @Output() notifyStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() notifyQuery: EventEmitter<string> = new EventEmitter<string>();

    handleSearchClick(): void {
        this.searchAreaStatus = false
        this.suggestedNames = []
        this.notifyStatus.emit(this.searchAreaStatus)
        this.notifyQuery.emit(this.searchQuery)
        
    };
    updateSearchQuery(): void {
        var suggestedNames = []
        if (this.searchQuery.length > 1){
            for (var name of this.justNames){
                var fullname = name[0]+ ' ' + name[1]
                if (name[0].toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
                    var formattedName = []
                    formattedName.push(this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1).toLowerCase());
                    formattedName.push(name[0].toLowerCase().replace(this.searchQuery.toLowerCase(),''))
                    formattedName.push('')
                    formattedName.push(name[1])

                    suggestedNames.push(formattedName);
                } else if (fullname.toLowerCase().startsWith(this.searchQuery.toLowerCase())){
                    var formattedName = []
                    formattedName.push(name[0]);
                    formattedName.push('')
                    var lastNamePart = this.searchQuery.toLowerCase().replace(name[0].toLowerCase()+' ', '')
                    if (lastNamePart.length) {
                        formattedName.push(lastNamePart.charAt(0).toUpperCase() + lastNamePart.slice(1).toLowerCase())
                        formattedName.push(name[1].toLowerCase().replace(lastNamePart.toLowerCase(), ''))
                    }
                    else {
                        formattedName.push('')
                        formattedName.push(name[1])
                    }
                    suggestedNames.push(formattedName);
                }
                if (name[1].toLowerCase().startsWith(this.searchQuery.toLowerCase())) {
                    var formattedName = []
                    formattedName.push('')
                    formattedName.push(name[0])
                    formattedName.push(this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1).toLowerCase())
                    formattedName.push(name[1].toLowerCase().replace(this.searchQuery.toLowerCase(), ''))
                    
                    suggestedNames.push(formattedName);
                }

            }
        }
        this.suggestedNames = suggestedNames
    };
    clickSuggestion(name: Array<string>): void {
        this.suggestedNames = []
        if (name[0].length && name[2].length) {
            this.searchQuery = name[0]+name[1]+ ' ' + name[2] + name[3]
        } else if (name[0].length) {
            this.searchQuery = name[0]+name[1]
        } else if (name[2].length) {
            this.searchQuery = name[2] + name[3]
        }

        this.handleSearchClick()

    }
}
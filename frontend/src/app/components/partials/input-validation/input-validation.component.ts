import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any = {
    required: "Devrait pas être vide",
    email: "Email est invalide"
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit, OnChanges{

    @Input() 
    control!: AbstractControl;
    @Input() 
    showErrorsWhen: boolean = true;
    errorMessages: string[] = [];
    formControls: any;
    isSubmitted: any;

    constructor(){}
    ngOnChanges(changes: SimpleChanges): void {
        this.checkValidation();
    }
    ngOnInit(): void {
        this.control.statusChanges.subscribe(() => {
            this.checkValidation();
        });
        this.control.valueChanges.subscribe(() => {
            this.checkValidation();
        })
    }

    checkValidation(){
        const errors = this.control.errors;
        if(!errors){
            this.errorMessages = [];
            return;
        }

        const errorKeys = Object.keys(errors);
        this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
    }
}

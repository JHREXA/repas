import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent implements OnInit{
    
    @Input()
    type: 'submit' | 'button' = 'submit';
    @Input()
    text: string = 'Submit';
    @Input()
    color: string = 'white';
    @Input()
    bgColor = 'blue';
    @Input()
    fontSizeRem = 1.3;
    @Input()
    widthRem = 12;
    @Output()
    onClick = new EventEmitter();

    constructor(){}    
    
    ngOnInit(): void {}
    
}

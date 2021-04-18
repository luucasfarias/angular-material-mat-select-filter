import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StateButton } from './utils/properties-button.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() styleButtonType = StateButton.DefaultStyle;
  @Input() color: string;

  @Input() isDisabled = false;
  @Input() matIcon = false;
  @Input() matIconName: string;
  @Input() buttonSubmit = false;

  @Output() buttonClick: EventEmitter<any>;

  buttonType: string;

  constructor() {
    this.buttonClick = new EventEmitter<any>();
    this.buttonType = this.buttonSubmit
      ? StateButton.Submit
      : StateButton.Button;
  }

  ngOnInit(): void {
    this.text = this.text ? this.text : StateButton.NoText;
  }

  onClick(): any {
    if (this.isDisabled) {
      return;
    }
    return this.buttonClick.emit(`${this.text} clicked`);
  }
}

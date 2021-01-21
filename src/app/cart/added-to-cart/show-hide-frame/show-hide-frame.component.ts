import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-hide-frame',
  templateUrl: './show-hide-frame.component.html',
  styleUrls: ['./show-hide-frame.component.scss']
})
export class ShowHideFrameComponent implements OnInit {

  @Output() showFrame = new EventEmitter();
  @Output() hideFrame = new EventEmitter();
  
  constructor() {
   }

  ngOnInit(): void {
    this.showFrame.emit();
  }
}

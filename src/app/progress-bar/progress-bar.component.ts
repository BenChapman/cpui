import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  inputs: ['step']
})
export class ProgressBarComponent implements OnInit {
  public step: number;

  constructor() { }

  ngOnInit() {
  }

}

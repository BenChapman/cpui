import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-flight',
  templateUrl: './pre-flight.component.html',
  styleUrls: ['./pre-flight.component.css']
})
export class PreFlightComponent implements OnInit {
  public dob: string

  constructor() { }

  ngOnInit() {
  }

  u13() {
    var ageDifMs = Date.now() - new Date(this.dob).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970) < 13;
  }

}

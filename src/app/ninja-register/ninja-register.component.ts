import { Component, OnInit } from '@angular/core';

import { Ninja } from '../ninja';
import { NinjaService } from '../ninja.service';

@Component({
  selector: 'app-ninja-register',
  templateUrl: './ninja-register.component.html',
  styleUrls: ['./ninja-register.component.css'],
  providers: [ NinjaService ]
})
export class NinjaRegisterComponent implements OnInit {
  public ninjas: Ninja[];
  public dojos: { value: number; label: string }[] = [{value: 1, label: "Dublin"},{value: 2, label: "Cork"},{value: 3, label:"DCU"}]

  constructor(private ninjaService: NinjaService) {}

  ngOnInit() {
    this.ninjas = [new Ninja()];
    this.ninjaService.getNinjas().subscribe(res => {this.ninjas = res})
  }

  onSubmit() {
    this.ninjas = this.ninjaService.createNinjas(this.ninjas);
  }

  addNinja() {
    if (this.ninjas.length >= 4) { return false; }
    this.ninjas.push(new Ninja());
  }
  removeNinja(index: number) {
    if (this.ninjas.length <= 1) { return false; }
    this.ninjaService.deleteNinja(this.ninjas[index]);
    this.ninjas.splice(index,1);
  }

  parseDate(date: string): string {
    return new Date(date).toISOString()
  }

  u13(dob: Date): boolean {
    var ageDifMs = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970) < 13;
  }
}

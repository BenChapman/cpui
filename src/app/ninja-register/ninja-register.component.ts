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

  constructor(private ninjaService: NinjaService) {}

  ngOnInit() {
    this.ninjas = [new Ninja()];
    this.ninjaService.getNinjas().subscribe(res => this.ninjas = res)
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
}

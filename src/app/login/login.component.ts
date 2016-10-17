import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ SessionService ]
})
export class LoginComponent implements OnInit {

  constructor(private sessionService:SessionService, private router:Router) { }

  ngOnInit() {
    let currentSession:string = this.sessionService.getSession()
    if(!currentSession) {
      this.sessionService.newSession()
    }
    this.router.navigateByUrl('register/ninja')
  }

}

import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'Applicacion';
  menuRequired = false;
  constructor(private router: Router) {}

  ngDoCheck(): void {
    if (this.router.url == '/login') {
      this.menuRequired = false;
    } else {
      this.menuRequired = true;
    }
  }
}

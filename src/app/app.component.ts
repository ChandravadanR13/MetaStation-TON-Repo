import { Component, HostListener, AfterViewInit } from '@angular/core';
import { ShareServiceService } from './modules/shared/share-service.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private loginClass = 'login-page-class';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.updateBodyClass();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBodyClass();
      }
    });
  }

  private updateBodyClass() {
    const isLoginPage = this.router.url === '/login';

    if (isLoginPage) {
      document.body.classList.add(this.loginClass);
      localStorage.setItem('bodyClass', this.loginClass);
    } else {
      document.body.classList.remove(this.loginClass);
      localStorage.removeItem('bodyClass');
    }
  }
}

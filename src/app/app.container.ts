import { Component, OnInit } from '@angular/core';
import {
  Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router
} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.template.html'
})
export class AppContainer implements OnInit {
  // Sets initial value to true to show loading spinner on first load
  loading: boolean = true;
  private timeout: any;

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  constructor(
    private router: Router
  ) {}

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd) {
      this.timer();
    }

    if (event instanceof NavigationCancel) {
      this.timer();
    }

    if (event instanceof NavigationError) {
      this.timer();
    }

    // Always scroll to top
    document.body.scrollTop = 0;
  }

  timer() {
    this.timeout = setTimeout(() => {
      this.loading = false;
      clearTimeout(this.timeout);
    }, 400);
  }
}

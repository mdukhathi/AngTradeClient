import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar *ngIf="isLoggedIn"></app-navbar>
    <div class="container-fluid mt-3">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'AngTradeClient';
  isLoggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    
    // Listen for authentication state changes
    this.msalBroadcastService.msalSubject$
      .pipe(takeUntil(this._destroying$))
      .subscribe((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS) {
          const payload = event.payload as AuthenticationResult;
          this.authService.instance.setActiveAccount(payload.account);
          this.isLoggedIn = true;
        }
        
        if (event.eventType === EventType.LOGOUT_SUCCESS) {
          this.isLoggedIn = false;
        }
      });
  }

  checkLoginStatus(): void {
    const accounts = this.authService.instance.getAllAccounts();
    this.isLoggedIn = accounts.length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }
}
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;

  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const accounts = this.authService.instance.getAllAccounts();
    this.isLoggedIn = accounts.length > 0;
    
    if (this.isLoggedIn) {
      const account = this.authService.instance.getActiveAccount();
      this.username = account?.name || account?.username || null;
    }
  }

  login(): void {
    this.authService.loginPopup().subscribe();
  }

  logout(): void {
    this.authService.logoutPopup().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.username = null;
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }
}
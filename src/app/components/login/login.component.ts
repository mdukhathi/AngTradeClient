import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow">
            <div class="card-header bg-primary text-white text-center">
              <h4 class="mb-0">
                <i class="fas fa-sign-in-alt me-2"></i>TradeHub - Azure AD Login
              </h4>
            </div>
            
            <div class="card-body p-5 text-center">
              <div class="mb-4">
                <i class="fas fa-cloud fa-4x text-primary mb-3"></i>
                <h5>Azure Active Directory Authentication</h5>
                <p class="text-muted">
                  Sign in with your organization account to access TradeHub
                </p>
              </div>
              
              <button class="btn btn-primary btn-lg w-100" (click)="login()">
                <i class="fab fa-microsoft me-2"></i>Sign in with Microsoft
              </button>
              
              <div class="mt-4">
                <div class="alert alert-info">
                  <i class="fas fa-info-circle me-2"></i>
                  <small>
                    You will be redirected to Microsoft's login page.
                    Use your organization credentials.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  constructor(private authService: MsalService) {}

  ngOnInit(): void {
    // Check if already logged in
    const accounts = this.authService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  login(): void {
    this.authService.loginPopup()
      .subscribe({
        next: (result: AuthenticationResult) => {
          console.log('Login successful', result);
          this.authService.instance.setActiveAccount(result.account);
        },
        error: (error) => {
          console.error('Login failed', error);
          alert('Login failed. Please try again.');
        }
      });
  }
}
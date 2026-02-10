import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// MSAL imports
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, protectedResources } from './auth-config'; // Correct path
//import { msalConfig, protectedResources } from './guards/auth-config';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductListComponent,
    ProductFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    
    // MSAL Module Configuration
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Redirect, // Or Popup
        authRequest: {
          scopes: protectedResources.tradehubApi.scopes
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [
            protectedResources.tradehubApi.endpoint,
            protectedResources.tradehubApi.scopes
          ]
        ])
      }
    )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
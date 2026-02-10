import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfig {
  getApiUrl(): string {
    return environment.apiUrl;
  }

  getAzureApiUrl(): string {
    return environment.azureApiUrl;
  }

  isProduction(): boolean {
    return environment.production;
  }
}
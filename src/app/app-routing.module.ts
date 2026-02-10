import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'products', 
    component: ProductListComponent,
    canActivate: [MsalGuard] // Use MSAL guard
  },
  { 
    path: 'products/create', 
    component: ProductFormComponent,
    canActivate: [MsalGuard]
  },
  { 
    path: 'products/edit/:id', 
    component: ProductFormComponent,
    canActivate: [MsalGuard]
  },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
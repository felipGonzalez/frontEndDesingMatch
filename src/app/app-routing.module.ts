import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminCompanyComponent } from './components/admin-company/admin-company.component';
import { CreateDraftComponent } from './components/create-draft/create-draft.component';
import { CompanyComponent } from './components/company/company.component';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'company', component: AdminCompanyComponent },
  { path: 'draft', component: CreateDraftComponent },
  { path:  ':name' , component: CompanyComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

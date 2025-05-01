import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';

const routes: Routes = [
{path: 'home', component: HomePageComponent},
{path:'stats'  , component:StatisticPageComponent},
{
  path:'contact', component:ContactPageComponent, children: [
      { path: 'edit', component: ContactEditComponent },
      { path: 'edit/:contactId', component: ContactEditComponent },
  ]
},
{path:'contact/:contactId', component:ContactDetailsComponent},
{ path: '', pathMatch: 'full', redirectTo: 'home' },
{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

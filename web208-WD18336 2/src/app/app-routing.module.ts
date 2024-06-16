import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './layout/client/client.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { Page404Component } from './components/page404/page404.component';
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { adminGuard } from './Guard/admin.guard';
import { EditproductComponent } from './components/admin/editproduct/editproduct.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CtspComponent } from './components/ctsp/ctsp.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { DsspComponent } from './components/admin/dssp/dssp.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'ctsp/:id', component: CtspComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    children: [
      { path: 'add-product', component: AddproductComponent },
      { path: 'edit-product/:id', component: EditproductComponent },
      { path: 'danhmuc', component: CategoriesComponent },
      { path: 'dssp', component: DsspComponent },
    ],
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

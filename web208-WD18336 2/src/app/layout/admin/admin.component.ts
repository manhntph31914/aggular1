import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from '../../interface/menu';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  router = new Router();
  LogOut = () => {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  };
  menus: IMenu[] = [
    {
      id: 1,
      name: 'home',
      path: '',
      parent: 0,
    },
    {
      id: 2,
      name: 'Add Product',
      path: 'admin/add-product',
      parent: 0,
    },
    {
      id: 3,
      name: 'dssp',
      path: 'admin/dssp',
      parent: 0,
    },

    {
      id: 6,
      name: 'danhmuc',
      path: 'admin/danhmuc',
      parent: 0,
    },
  ];
  checkChildren = (id: number, menus: IMenu[]) => {
    let check: boolean = false;
    for (let item of menus) {
      if (item.parent == id) {
        check = true;
        break;
      }
    }
    return check;
  };
}

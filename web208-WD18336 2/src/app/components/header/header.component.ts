import { Component } from '@angular/core';
import { IMenu } from '../../interface/menu';
import { IProduct } from '../../interface/product';
import { ProductsService } from '../../products.service';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menus: IMenu[] = [
    {
      id: 1,
      name: 'Home',
      path: '',
      parent: 0,
    },
    {
      id: 2,
      name: 'About us',
      path: 'about-us',
      parent: 0,
    },
    {
      id: 3,
      name: 'Products',
      path: 'products',
      parent: 0,
    },
    {
      id: 4,
      name: 'Fashion',
      path: 'fashion',
      parent: 3,
    },
    {
      id: 5,
      name: 'Jewelry',
      path: 'jewelry',
      parent: 3,
    },
    {
      id: 6,
      name: 'Contact',
      path: 'contact',
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

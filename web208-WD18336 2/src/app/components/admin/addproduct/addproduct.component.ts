import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../interface/product';
import { ProductsService } from '../../../products.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesService } from '../../../categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  products: IProduct[] = [];
  categories: any[] = [];
  router = new Router();

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  productform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(7)]),
    image: new FormControl('', Validators.required),
    cat_id: new FormControl('', Validators.required),
    price: new FormControl(1000, [Validators.required, Validators.min(1000)]),
  });

  ngOnInit() {
    this.productService.Get_All_Products().subscribe((data) => {
      this.products = data;
    });
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit = (event: Event) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        if (this.productform.valid) {
          const productdata = this.productform.value as IProduct;
          this.productService.add_Product(productdata).subscribe((data) => {
            this.products.push(data);
            setTimeout(() => {
              this.router.navigate(['admin/dssp']);
            }, 2000);
          });
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Thêm sản phẩm thành công',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Thêm sản phẩm fail',
          life: 3000,
        });
      },
    });
  };
}

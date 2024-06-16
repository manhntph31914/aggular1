import { Component } from '@angular/core';
import { IProduct } from '../../../interface/product';
import { ProductsService } from '../../../products.service';
import { CategoriesService } from '../../../categories.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dssp',
  templateUrl: './dssp.component.html',
  styleUrl: './dssp.component.css',
})
export class DsspComponent {
  products: IProduct[] = [];
  categories: any[] = [];

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

  onSubmit = () => {
    if (this.productform.valid) {
      const productdata = this.productform.value as IProduct;
      this.productService.add_Product(productdata).subscribe((data) => {
        alert('Thêm sản phẩm thành công');
        this.products.push(data);
      });
    } else {
      alert('Form is invalid');
    }
  };

  onDelete = (id: any, event: Event) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: async () => {
        try {
          await this.productService.Delete_Product(id).toPromise();
          this.products = this.products.filter((product) => product.id !== id);
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Record deleted',
          });
        } catch (error) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete record',
          });
        }
      },

      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  };
}

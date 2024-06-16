import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../../interface/product';
import { ProductsService } from '../../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../categories.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css'],
})
export class EditproductComponent implements OnInit {
  products: IProduct[] = [];
  categories: IProduct[] = [];

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  productform = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    cat_id: new FormControl(1),
    price: new FormControl(2000, Validators.min(2000)), // Điều chỉnh giá trị khởi tạo hoặc validate
  });

  productid = this.route.snapshot.params['id'];

  ngOnInit() {
    this.productService.Get_Product_BY_ID(this.productid).subscribe((data) => {
      console.log(data);
      this.productform.controls['name'].setValue(data.name);
      this.productform.controls['image'].setValue(data.image);
      this.productform.controls['cat_id'].setValue(data.cat_id);
      this.productform.controls['price'].setValue(data.price);
    });
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit = async (event: Event) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        const productdata = this.productform.value as IProduct;
        this.productService
          .Update_Product(this.productid, productdata)
          .subscribe((data) => {
            this.products.push(data);
            setTimeout(() => {
              this.router.navigate(['admin/dssp']);
            }, 2000);
          });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Cập nhật sản phẩm thành công',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Cập nhật thất bại',
          life: 3000,
        });
      },
    });
  };
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../interface/product';
import { ProductsService } from '../../products.service';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-ctsp',
  templateUrl: './ctsp.component.html',
  styleUrls: ['./ctsp.component.css'],
})
export class CtspComponent implements OnInit {
  products: IProduct[] = [];
  categories: IProduct[] = [];
  productDetail: IProduct | undefined;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      this.getProductDetail(productId);
    });
  }

  getProductDetail(productId: string) {
    this.productService.Get_Product_BY_ID(productId).subscribe((data) => {
      this.productDetail = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}

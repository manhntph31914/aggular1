import { Component, Input, OnInit, inject } from '@angular/core';
import { IProduct } from '../../interface/product';
import { ProductsService } from '../../products.service';
import { CategoriesService } from '../../categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  searchKeyword: string = '';
  showProducts: boolean = false; // Biến để kiểm soát việc hiển thị sản phẩm
  selectedCategory: any = null; // Danh mục đã chọn
  selectedCategoryProducts: any[] = []; // Danh sách sản phẩm thuộc danh mục đã chọn

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.productService.Get_All_Products().subscribe((data) => {
      this.products = data;
      // Set default products to show all
      this.filteredProducts = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  filterProductsBySearch(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredProducts = this.products;
      this.showProducts = false;
    } else {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
      this.showProducts = true;
    }
  }
  filterProductsByCategory(): void {
    if (!this.selectedCategory) {
      this.selectedCategoryProducts = [];
    } else {
      this.selectedCategoryProducts = this.products.filter(
        (product) => product.cat_id === this.selectedCategory
      );
    }
  }
}

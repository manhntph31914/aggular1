import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../categories.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryForm: FormGroup;
  router = new Router();

  constructor(
    private fb: FormBuilder, // Use FormBuilder instead of FormGroup
    private categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.categoryForm = this.fb.group({
      // Use the group method of FormBuilder
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  onSubmitCategory(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        if (this.categoryForm.valid) {
          this.categoryService
            .addCategory(this.categoryForm.value)
            .subscribe((response) => {
              console.log('Danh mục mới đã được thêm:', response);
              this.categoryForm.reset();
              console.log(response);
              setTimeout(() => {
                this.router.navigate(['admin/add-product']);
              }, 2000);
            });
        }
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Thêm danh mục thành công',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'Thêm danh muc thất bại',
          life: 3000,
        });
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId?: number;
  isLoading = false;
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
   
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.isEditMode = !!this.productId;

      if (this.isEditMode && this.productId) {
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          categoryId: product.categoryId
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load product. Please try again.';
        this.isLoading = false;
        console.error('Error loading product:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      if (this.isEditMode && this.productId) {
        this.updateProduct();
      } else {
        this.createProduct();
      }
    } else {
      this.markFormGroupTouched(this.productForm);
    }
  }

  private createProduct(): void {
    this.productService.createProduct(this.productForm.value).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.handleError(error, 'creating');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private updateProduct(): void {
    if (!this.productId) return;
    
    this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.handleError(error, 'updating');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  private handleError(error: any, action: string): void {
    console.error(`Error ${action} product:`, error);
    this.errorMessage = `Failed to ${action} product. ${error.message || 'Please try again.'}`;
    this.isSubmitting = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Form getters for easy access in template
  get name() { return this.productForm.get('name'); }
  get description() { return this.productForm.get('description'); }
  get price() { return this.productForm.get('price'); }
  get stockQuantity() { return this.productForm.get('stockQuantity'); }
  get categoryId() { return this.productForm.get('categoryId'); }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
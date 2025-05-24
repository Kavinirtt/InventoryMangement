import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { API_LIST } from '../variables/api-list';
import { ProductArray, Product } from '../variables/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ROLE } from '../variables/enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService)
  private apiList = API_LIST
  private route = inject(ActivatedRoute);

  productForm!: FormGroup;
  products: ProductArray = [];

  role: string = 'admin';

  isEditMode = false;
  editingId: number | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    this.getRoleFromToken();
    this.initForm();
    this.fetchProducts();
  }

  getRoleFromToken() {
    this.route.paramMap.subscribe(params => {
      const roleId = +params.get('role_id')!;
      this.role = roleId === ROLE.ADMIN ? 'admin' : 'staff';
    })
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      product_code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9\-]+$/i)]],
      quantity: [null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]], 
      price: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  goToLogin() {
    localStorage.clear();
    this.router.navigate(['/login']); 
  }

  fetchProducts() {
    this.apiService.get(this.apiList.PRODUCT_LIST).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.products = res.data;
        } else {
          console.warn('Unexpected status:', res.message);
        }
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      }
    });
  }



  onSubmit() {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;
    if (this.isEditMode && this.editingId !== null) {
      this.apiService.put(this.apiList.PRODUCT_UPDATE(this.editingId), formValue).subscribe(() => {
        this.fetchProducts();
        this.cancelEdit();
      });
    }
    else {
      this.apiService.post(this.apiList.PRODUCT_CREATE, formValue).subscribe(() => {
        this.fetchProducts();
        this.productForm.reset();
      });
    }
  }

  onEdit(product: Product) {
    if (this.role !== 'admin') return;

    this.isEditMode = true;
    this.editingId = product.id;
    this.productForm.patchValue(product);
  }

  onDelete(id: number) {
    if (this.role !== 'admin') return;
    this.apiService.delete(this.apiList.PRODUCT_DELETE(id)).subscribe(() => {
      this.fetchProducts();
    });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editingId = null;
    this.productForm.reset();
  }
}

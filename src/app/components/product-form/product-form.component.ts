import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnChanges {
  @Input() data: Product | null = null;
  @Output() onCloseModal = new EventEmitter();

  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      handle: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      sku: new FormControl('', [Validators.required]),
      grams: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      compare_price: new FormControl('', [Validators.required]),
      barcode: new FormControl('', []),
    });
  }

  onClose() {
    this.onCloseModal.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.productForm.patchValue({
        handle: this.data.handle,
        title: this.data.title,
        description: this.data.description,
        sku: this.data.sku,
        grams: this.data.grams,
        stock: this.data.stock,
        price: this.data.price,
        compare_price: this.data.compare_price,
        barcode: this.data.barcode,
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.data) {
        this.productService
          .updateProduct(this.productForm.value, this.data.id)
          .subscribe({
            next: (response: any) => {
              this.resetProductForm();
              this.toastr.success(response.message);
            },
          });
      } else {
        this.productService.addProduct(this.productForm.value).subscribe({
          next: (response: any) => {
            this.resetProductForm();
            this.toastr.success(response.message);
          },
        });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  resetProductForm() {
    this.productForm.reset();
    this.onClose();
  }
}

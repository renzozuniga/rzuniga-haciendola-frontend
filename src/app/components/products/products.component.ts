import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  isModalOpen = false;
  listProduct: Product[] = [];
  product: Product;
  formModal: any;

  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const myModal = document.getElementById('myModal')!;
    this.formModal = new Modal(myModal);
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe((data) => {
      this.listProduct = data;
    });
  }

  loadProduct(product: Product) {
    this.product = product;
    this.openModal();
  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.toastr.success(response.message);
        this.getProducts();
      },
    });
  }

  openModal() {
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide();
    this.getProducts();
  }
}

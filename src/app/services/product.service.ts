import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from './api.config';
import { ProductReadDto } from '../models/product-read.dto';
import { ProductCreateDto } from '../models/product-create.dto';
import { ProductUpdateDto } from '../models/product-update.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) {
    this.baseUrl = `${this.apiConfig.getApiUrl()}/products`;
  }

  // Get all products
  getAllProducts(): Observable<ProductReadDto[]> {
    return this.http.get<ProductReadDto[]>(this.baseUrl);
  }

  // Get single product by ID
  getProductById(id: number): Observable<ProductReadDto> {
    return this.http.get<ProductReadDto>(`${this.baseUrl}/${id}`);
  }

  // Create new product
  createProduct(product: ProductCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Update existing product
  updateProduct(id: number, product: ProductUpdateDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Delete product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
export interface ProductUpdateDto {
  name?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  categoryId?: number;
}
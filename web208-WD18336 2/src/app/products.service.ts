import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from './interface/product';
import { IUser } from './interface/user';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  API_URL = 'http://localhost:3000/products';
  API_USER = 'http://localhost:3000/users';

  Get_All_Products = (): Observable<any> => {
    return this.http.get(this.API_URL);
  };

  Get_Product_BY_ID = (id: string): Observable<any> => {
    return this.http.get(`${this.API_URL}/${id}`);
  };
  add_Product = (data: IProduct): Observable<any> => {
    return this.http.post(this.API_URL, data);
  };

  Update_Product = (id: string, data: IProduct): Observable<any> => {
    return this.http.put(`${this.API_URL}/${id}`, data);
  };
  Delete_Product = (id: string): Observable<any> => {
    return this.http.delete(`${this.API_URL}/${id}`);
  };
}

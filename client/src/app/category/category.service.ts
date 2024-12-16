import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  saveCategory(category: Category): Observable<Category> {
    return of(null);
  }

  deleteCategory(idCategory : number): Observable<any> {
    return of(null);
  } 
}
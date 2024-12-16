import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(CATEGORY_DATA);
  }

  saveCategory(category: Category): Observable<Category> {
    return of(null);
  }

  deleteCategory(idCategory : number): Observable<any> {
    return of(null);
  } 
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Author } from './model/Author';
import { AuthorPage } from './model/AuthorPage';
import { AUTHOR_DATA_LIST } from './model/mock-authors-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseUrl = 'http://localhost:8080/author';

  constructor(private http: HttpClient) {}

  getAuthors(pageable: Pageable): Observable<AuthorPage> {
    return this.http.post<AuthorPage>(this.baseUrl, { pageable: pageable });
  }

  saveAuthor(author: Author): Observable<Author> {
    const { id } = author;
    const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
    return this.http.put<Author>(url, author);
  }

  deleteAuthor(idAuthor: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idAuthor}`);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
}
}

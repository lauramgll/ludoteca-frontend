import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoanPage } from './model/LoanPage';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
    private baseUrl = 'http://localhost:8080/loan';
    
    constructor(private http: HttpClient) { }

    getLoans(idClient?: number, idGame?: number, date?: string, pageable?: Pageable): Observable<LoanPage> {
      return this.http.post<LoanPage>(this.baseUrl, { idClient, idGame, date, pageable });
    }

    saveLoan(loan: Loan): Observable<void> {
        const { id } = loan;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;

        return this.http.put<void>(url, loan);
    }

    deleteLoan(idLoan: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${idLoan}`);
    }
}
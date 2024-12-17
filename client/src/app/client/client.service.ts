import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Client } from './model/Client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/client';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  saveClient(client: Client): Observable<Client> {
    return this.getClients().pipe(
      map((clients: Client[]) => {
        // Validar si el nombre ya existe en la lista de clientes
        const nameExists = clients.some(c => c.name === client.name && c.id !== client.id);
        if (nameExists) {
          throw new Error('El nombre del cliente ya existe');
        }
        return client;
      }),
      switchMap(() => {
        const { id } = client;
        const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        return this.http.put<Client>(url, client);
      }),
      catchError((error) => {
        console.error('Error al guardar el cliente:', error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  deleteClient(idClient : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idClient}`);
  } 
}
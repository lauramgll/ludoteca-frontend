import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Client } from '../model/Client';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { ShowOnDirtyErrorStateMatcher } from '../model/ShowOnDirtyErrorStateMatcher'; 
import { CommonModule } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }]
})
export class ClientEditComponent implements OnInit {
client: Client;
errorMessage: string = '';
matcher = new ShowOnDirtyErrorStateMatcher();

    constructor(
        public dialogRef: MatDialogRef<ClientEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {client: Client},
        private clientService: ClientService
    ) {}

    ngOnInit(): void {
        this.client = this.data.client ? Object.assign({}, this.data.client) : new Client();
    }

    onSave() {
      if (!this.client.name) {
        this.errorMessage = 'El nombre no puede estar vacío';
        return; 
      }
    
      this.clientService.saveClient(this.client).subscribe({
        next: (response) => {
          console.log('Cliente guardado exitosamente:', response);
          this.dialogRef.close();
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    }

    onClose() {
        this.dialogRef.close();
    }
}

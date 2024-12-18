import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Client } from '../../client/model/Client';
import { Game } from '../../game/model/Game';
import { LoanService } from '../loan.service';
import { ClientService } from '../../client/client.service';
import { GameService } from '../../game/game.service';
import { MatDialog } from '@angular/material/dialog';
import { Loan } from '../model/Loan';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pageable } from '../../core/model/page/Pageable';
import { DialogConfirmationComponent } from '../../core/dialog-confirmation/dialog-confirmation.component';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';

@Component({
  selector: 'app-loan-list',
  standalone: true,
    imports: [
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      CommonModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule ,
      MatPaginator
    ],
    providers: [  
      MatDatepickerModule,  
    ],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent implements OnInit {
  clients: Client[];
  games: Game[];
  loans: Loan[];
  filterClient: Client;
  filterGame: Game;
  filterDate: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'gameName', 'clientName', 'startDate', 'endDate', 'action'];

  constructor(
      private loanService: LoanService,
      private clientService: ClientService,
      private gameService: GameService,
      public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));

    this.gameService
      .getGames()
      .subscribe((games) => (this.games = games));
      
    this.loadPage(); 
  }

  onCleanFilter(): void {
      this.filterClient = null;
      this.filterGame = null;
      this.filterDate = null;
      this.loadPage();
  }

  onSearch(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent): void {
    const pageable: Pageable = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sort: [
            {
                property: 'id',
                direction: 'ASC',
            },
        ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const clientId =
        this.filterClient != null ? this.filterClient.id : null;

    const gameId =
    this.filterGame != null ? this.filterGame.id : null;

    const selectedDate = this.filterDate ? this.filterDate.toISOString().split('T')[0] : null;

    this.loanService.getLoans(clientId, gameId, selectedDate, pageable).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  createLoan() {
      const dialogRef = this.dialog.open(LoanEditComponent, {
          data: {},
      });

      dialogRef.afterClosed().subscribe((result) => {
          this.ngOnInit();
      });
  }

  deleteLoan(loan: Loan) {
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: {
              title: 'Eliminar préstamo',
              description:
                  'Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?',
          },
      });

      dialogRef.afterClosed().subscribe((result) => {
          if (result) {
              this.loanService.deleteLoan(loan.id).subscribe((result) => {
                  this.ngOnInit();
              });
          }
      });
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { DobavljacDialogComponent } from '../dialogs/dobavljac-dialog/dobavljac-dialog.component';

@Component({
  selector: 'app-dobavljac',
  templateUrl: './dobavljac.component.html',
  styleUrls: ['./dobavljac.component.css']
})
export class DobavljacComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'adresa', 'kontakt', 'naziv', 'actions'];
  dataSource!: MatTableDataSource<Dobavljac>; 
  subscription!: Subscription;

  constructor(private dobavljacService: DobavljacService, 
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.dobavljacService.getAllDobavljacs().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, 
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }

  public openDialog(flag: number, id?: number, adresa?: string, kontakt?: string, naziv?: string): void {
    const dialogRef = this.dialog.open(DobavljacDialogComponent, {data:{id,adresa, kontakt, naziv}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    })
  }
}

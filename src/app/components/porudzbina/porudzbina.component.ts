import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { PorudzbinaDialogComponent } from '../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit, OnDestroy {

  displayedColumns= ['id', 'datum', 'isporuceno', 'iznos', 'placeno', 'dobavljac' , 'actions'];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<Porudzbina>;
  selektovanaPorudzbina!: Porudzbina;

  constructor(private porudzbinaService: PorudzbinaService, 
    public dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  selectRow(row: any) {
    this.selektovanaPorudzbina = row;
  }

  public loadData(): void {
    this.subscription = this.porudzbinaService.getAllPorudzbinas().subscribe(data =>
      {
        this.dataSource = new MatTableDataSource(data);
      }, (error:Error) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  public openDialog(flag:number, id?:number, datum?:Date, isporuceno?:Date, iznos?:number, placeno?: boolean, dobavljac?:Dobavljac) {
    const dialogRef = this.dialog.open(PorudzbinaDialogComponent, {data:{id,datum, isporuceno, iznos, placeno, dobavljac}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1) {
        this.loadData();
      }
    })
  }


}

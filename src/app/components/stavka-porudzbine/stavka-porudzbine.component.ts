import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Artikl } from 'src/app/models/artikl';
import { Porudzbina } from 'src/app/models/porudzbina';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';
import { StavkaPorudzbineDialogComponent } from '../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';


@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns= ['id', 'redniBroj', 'kolicina', 'jedinicaMere',
   'cena', 'porudzbina' , 'artikl', 'actions'];
  subscription!: Subscription;
  dataSource!: MatTableDataSource<StavkaPorudzbineComponent>;
  @Input() selektovanaPorudzbina!: Porudzbina;

  constructor(private stavkaPorudzbineService: StavkaPorudzbineService,
    private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.selektovanaPorudzbina.id) {
      this.loadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscription = this.stavkaPorudzbineService.getStavkeZaPorudzbinaID(this.selektovanaPorudzbina.id)
      .subscribe(data => 
        {
          this.dataSource = new MatTableDataSource(data);
        }, (error: Error) => {
          console.log(error.name + ' '+ error.message);
        });
  }

  openDialog(flag:number, id?:number, redniBroj?: number, kolicina?:number,
      jedinicaMere?:string, cena?:number, porudzbina?: Porudzbina, artikl?: Artikl) {

        const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, 
          {data: {id,redniBroj, kolicina, jedinicaMere, cena, porudzbina, artikl}});
        
        dialogRef.componentInstance.flag = flag;
        if(flag === 1) {
          dialogRef.componentInstance.data.porudzbina = this.selektovanaPorudzbina;
        }

        dialogRef.afterClosed().subscribe(res => {
          if (res === 1)
          this.loadData();
        });
  }

}

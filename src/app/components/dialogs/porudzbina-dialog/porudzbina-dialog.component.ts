import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { DobavljacService } from 'src/app/services/dobavljac.service';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit, OnDestroy {

  flag!:number;
  subscription!: Subscription;
  dobavljaci!: Dobavljac[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Porudzbina,
    public dobavljacService: DobavljacService,
    public porudzbinaService: PorudzbinaService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljacs().subscribe(data => {
      this.dobavljaci = data;
    });
  }
  compareTo(a:any, b:any) {
    return a.id == b.id;
  }

  public add(): void {
    this.subscription = this.porudzbinaService.addPorudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat porudzbina: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja nove porudzbine!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public update(): void {
    this.subscription = this.porudzbinaService.updatePorudzbina(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjena porudzbina: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene postojeće porudzbine!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public delete(): void {
    this.subscription = this.porudzbinaService.deletePorudzbina(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana porudzbina: ' + this.data.id, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojećee porudzbine!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene.', 'Zatvori', {duration: 1000});
  }
}

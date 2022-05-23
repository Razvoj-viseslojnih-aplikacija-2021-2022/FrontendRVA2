import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {
  public flag!: number;
  subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Dobavljac,
    public dobavljacService: DobavljacService) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.subscription = this.dobavljacService.addDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat dobavljač: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom dodavanja novog dobavljača!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public update(): void {
    this.subscription = this.dobavljacService.updateDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen dobavljač: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom izmene postojećeg dobavljača!', 'Zatvori', {
        duration:2500
      })
    }
    );
  }

  public delete(): void {
    this.subscription = this.dobavljacService.deleteDobavljac(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan dobavljač: ' + this.data.naziv, 'OK', {
        duration:2500
      })
    },
    (error: Error) => {
      this.snackBar.open('Došlo je do greške prilikom brisanja postojećeg dobavljača!', 'Zatvori', {
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

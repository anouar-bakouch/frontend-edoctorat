import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/models/Commission';
import { Examiner } from 'src/app/models/Examiner';
import Result from 'src/app/models/Result';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-resultat]',
  templateUrl: './prof-resultat.component.html',
  styleUrls: ['./prof-resultat.component.css']
})
export class ProfResultatComponent implements OnInit {
  public page: number = 1;
  itemsCount: number | undefined;
  public alert: AlertData | undefined = undefined;
  public loading: boolean = true;
  public resultats: Examiner[] = [];
  public resultat: Result<Examiner> = {
    count: 0,
    next: '',
    previous: '',
    results: []
  }
  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.getResultats()
  }
  getResultats() {
    this.operationsService.getResultats().then(data => {
      this.loading = false;
      this.alert = {
        type: 'success',
        message: 'success',
      };
      this.resultat = data as Result<Examiner>;
      this.itemsCount = this.resultat.count
      this.resultats = this.resultat.results
    }).catch((err) => {
      console.log(err);
      this.alert = {
        type: 'error',
        message: "error lors de l'ajout",
      };
    }).finally(() => {
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

  onIndexChange(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService.getResultats(offset).then(data => {
      this.loading = false;
      this.alert = {
        type: 'success',
        message: 'success',
      };
      this.resultat = data as Result<Examiner>;
      this.resultats = this.resultat.results
    }).catch((err) => {
      console.log(err);
      this.alert = {
        type: 'error',
        message: "error lors de l'ajout",
      };
    }).finally(() => {
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }
}

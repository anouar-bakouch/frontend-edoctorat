import { Component, OnInit } from '@angular/core';
import { Examiner } from 'src/app/models/Examiner';
import Result from 'src/app/models/Result';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-resultat]',
  templateUrl: './prof-resultat.component.html',
  styleUrls: ['./prof-resultat.component.css']
})
export class ProfResultatComponent implements OnInit {
  public resultats: Examiner[] = [];
  public resultat:Result<Examiner> = {
    count: 0,
    next: '',
    previous: '',
    results: []
  }
  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.getResultats()
  }
  getResultats() {
    this.operationsService.getResultats().subscribe(data => {
      // console.log(data)
      this.resultat = data;
      this.resultats = this.resultat.results
    })
  }
}

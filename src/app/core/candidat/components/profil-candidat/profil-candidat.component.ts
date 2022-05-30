import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Candidat } from 'src/app/models/Candidat';
import { environment } from 'src/environments/environment';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css'],
})
export class ProfilCandidatComponent implements OnInit {
  public candidat!: Candidat;
  public isFetchingInfo: boolean = true;
  public errorText: string = '';
  public id: number;
  public str: string = environment.API_URL
  constructor(
    public candidatService: CandidatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((e) => {
      this.id = e['id'];
    });
    this.getInfo(this.id);
  }

  getInfo(id:number) {
    this.candidatService.getCandidatProfile(id).then((res) => {
      this.isFetchingInfo = false;
      this.candidat = res;
      console.log(this.candidat)
      console.log(res)
    });
  }
}

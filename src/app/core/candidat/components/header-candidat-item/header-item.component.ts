import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: '[app-header-item]',
  templateUrl: './header-item.component.html',
  styleUrls: ['./header-item.component.css']
})
export class HeaderItemComponent implements OnInit {

  
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['fr', 'ar']);
    translate.setDefaultLang('fr');
  }

  ngOnInit(): void {
   
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}

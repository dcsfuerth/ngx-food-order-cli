import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcs-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavigationComponent implements OnInit {
  public isLoggedIn = true;

  constructor() {}

  ngOnInit() {}

  public setLocale(locale: string) {
    console.log('setting locale', locale);
  }
}

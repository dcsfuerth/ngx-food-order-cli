import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dcs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    console.log('Site load:', performance.now().toFixed(2), 'ms!!');
  }
}

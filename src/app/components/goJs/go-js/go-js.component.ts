import { Component, OnInit } from '@angular/core';
import { GoJsService } from 'src/app/services/goJs/go-js.service';


@Component({
  selector: 'app-go-js',
  templateUrl: './go-js.component.html',
  styleUrls: ['./go-js.component.scss']
})
export class GoJsComponent implements OnInit {
  constructor(
    public goJsSevice: GoJsService
  ) { }

  ngOnInit() {
    this.goJsSevice.init()
  }

}

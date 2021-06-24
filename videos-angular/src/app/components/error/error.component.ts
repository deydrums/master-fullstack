import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  page_title: string
  constructor() {
    this.page_title = "404 página no encontrada"
   }

  ngOnInit(): void {
  }

}

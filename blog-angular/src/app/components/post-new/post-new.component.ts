import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = 'Crear una nueva entrada';
   }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  public page_title: string;

  constructor() {
    this.page_title = "Editar Entrada";
   }

  ngOnInit(): void {
  }

}

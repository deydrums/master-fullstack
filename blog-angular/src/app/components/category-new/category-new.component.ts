import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css']
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  constructor() { 
    this.page_title = 'Crear nueva categoria';
  }

  ngOnInit(): void {
  }

}

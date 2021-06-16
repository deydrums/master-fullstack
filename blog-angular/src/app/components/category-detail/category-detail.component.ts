import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Category } from '../../models/category'
import { CategoryService } from 'src/app/services/category.service';
import {global} from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title!: string;
  public category!: Category;
  public posts: any;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService
  ) { 
    this.url = global.url;

  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      this._categoryService.getCategory(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.category = response.category;

          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    });
  }

}

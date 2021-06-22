import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { TopicService } from 'src/app/services/topic.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService]
})
export class TopicsComponent implements OnInit {
  public page_title: string;
  public topics: Topic[] = [];
  public totalPages!:any;
  public page!:any;
  public next_page!:any;
  public prev_page!:any;
  public number_pages!:any;
  public apage!: any;
  constructor(
    private _topicService: TopicService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Temas";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var page = +params['page'];
      if(!page || page == null || page == 0 || page == undefined){
        page = 1;
        this.prev_page =1;
        this.next_page =2;
      }
      this.getTopics(page);
    });
  }

  getTopics(page = 1){
    this._topicService.getTopics(page).subscribe(
      response => {
        if(response.topics){
          this.topics = response.topics;
          //Navegacion de paginacion
          this.totalPages = response.totalPages;
          var number_pages =[];
          for(var i = 1; i <= this.totalPages; i++){
            number_pages.push(i);
          }
          this.number_pages = number_pages;
          if(page >= 2){
            this.prev_page = page - 1;

          }else{
            this.prev_page = 1;
          }
          if(page < this.totalPages){
            this.next_page = page + 1;
          }else{
            this.next_page = this.totalPages;
          }

          this.apage = page;
        }else{
          this._router.navigate(['/inicio'])
        }
      },
      error => {
        console.log(<any>error);
      }
    
    );
  }

}

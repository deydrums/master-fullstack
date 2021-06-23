import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Topic } from '../../models/topic';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [TopicService]
})
export class SearchComponent implements OnInit {
  public page_title: string;
  public topics: Topic[] = [];
  public message!: string;
  public status!: string;
  public search!:any;
  constructor(
    private _topicService: TopicService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Resultados para: ";
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var search = params['search'];
      console.log(search);
      this.search = search;
      this.getTopic(search);
    });
  }

  getTopic(search: any){
    this._topicService.search(search).subscribe(
      response =>{
        if(response.topics){
          this.topics = response.topics;
        }
      },
      error =>{
        console.log(<any>error);
        this.message = error.error.message;
        this.status = 'error';
        this.topics = [];
      }
    )
  }

}

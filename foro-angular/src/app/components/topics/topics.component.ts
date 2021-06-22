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
  constructor(
    private _topicService: TopicService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Temas";
  }

  ngOnInit(): void {
  }

}

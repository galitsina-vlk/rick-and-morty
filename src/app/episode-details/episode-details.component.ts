import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app-service/app-service.component';
import { IEpisode } from '../../types/types';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css'],
})
export class EpisodeDetailsComponent implements OnInit {
  episode!: IEpisode;
  characters: string[] = [];

  constructor(private route: ActivatedRoute, private appService: AppService) {}

  ngOnInit() {
    // Retrieve the episode id from the route
    const episodeId: number = parseInt(
      this.route.snapshot.paramMap.get('id') || '0',
      10
    );

    // Use the id to fetch the episode details from your service
    this.appService.getEpisodeDetailsById(episodeId).subscribe((data) => {
      if (data) {
        this.episode = data;
        this.characters = data.characters;
        console.log(data);
      } else {
        alert('Something went wrong');
      }
    });

  
  }

    
}

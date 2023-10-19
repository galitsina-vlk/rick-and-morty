import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app-service/app-service.component';
import { IEpisode, ICharacter } from '../../types/types';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css'],
})
export class EpisodeDetailsComponent implements OnInit {
  episode!: IEpisode;
  characters: ICharacter[] = [];

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
        // Fetch character details for each character URL
        this.fetchCharacterDetails(this.episode.characters);
      } else {
        alert('Something went wrong');
      }
    });
  }

  fetchCharacterDetails(characterUrls: string[]) {
    characterUrls.forEach((characterUrl: string) => {
      this.appService
        .getCharacterDetails(characterUrl)
        .subscribe((characterData) => {
          if (characterData) {
            this.characters.push(characterData);
          } else {
            alert('Something went wrong while fetching character data');
          }
        });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { getEpisode } from 'rickmortyapi';
import { AppService } from '../app-service/app-service.component';
import { IEpisode } from '../../types/types';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  episodes: IEpisode[] = [];
  page = 1;

  constructor(private appService: AppService) {}

  loadEpisodes() {
    this.appService.getEpisode(this.page).subscribe((data) => {
      this.episodes = data.results;
    });
  }

  ngOnInit() {
    this.loadEpisodes();
  }

  goToPrevious() {
    this.page--;
    this.loadEpisodes();
  }

  goToNext() {
    this.page++;
    this.loadEpisodes();
  }

  fetchCharacterNames() {
    if (this.episodes && this.episodes.length > 0) {
      this.episodes.forEach((episode) => {
        const characterUrls = episode.characters;
        const characterNames: string[] = [];

        characterUrls.forEach((characterUrl: string) => {
          this.appService.getCharacterDetails(characterUrl).subscribe((characterData) => {
            characterNames.push(characterData.name);
          });
        });

        episode.characters = characterNames;
      });
    }
  }
}
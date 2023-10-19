import { Component, OnInit } from '@angular/core';
import { getEpisode } from 'rickmortyapi';
import { AppService } from '../app-service/app-service.component';
import { IEpisode } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  episodes: IEpisode[] = [];
  page = 1;
  totalPages: number | null = null; 

  constructor(private appService: AppService,
    private router: Router
  ) {}

  loadEpisodes() {
    this.appService.getEpisode(this.page).subscribe((data) => {
      this.episodes = data.results;
      this.totalPages = data.info.pages;
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

  viewEpisodeDetails(episode: IEpisode) {
    // Set the selected episode in the AppService
    this.appService.selectedEpisode = episode;
    
    // Navigate to the character details page
    this.router.navigate(['/character-details']);
  }
}
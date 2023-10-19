import { Component } from '@angular/core';
import { getLocation } from 'rickmortyapi';
import { AppService } from '../app-service/app-service.component';
import { ILocation } from '../../types/types';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  locations: ILocation[] = [];
  page = 1;
  totalPages: number | null = null; 

  constructor(private appService: AppService) {}

  loadLocation() {
    this.appService.getLocation(this.page).subscribe((data) => {
      this.locations = data.results;
      this.totalPages = data.info.pages;
    });
  }

  ngOnInit() {
    this.loadLocation();
  }

  goToPrevious() {
    this.page--;
    this.loadLocation();
  }

  goToNext() {
    this.page++;
    this.loadLocation();
  }
}


  


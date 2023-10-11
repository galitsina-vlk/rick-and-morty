
import { Component } from '@angular/core';
import { AppService } from '../app-service/app-service.component';
import { ICharacter } from '../../types/types';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
  characters: ICharacter[] = [];
  page = 1;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.appService.getCharacters(this.page).subscribe((data) => {
      this.characters = data.results;
    });
  }
  
  goToPrevious() {
    this.page--;
    this.loadCharacters();
  }

  goToNext() {
    this.page++;
    this.loadCharacters();
  }
}



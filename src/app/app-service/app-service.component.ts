import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICharacterData, IEpisodeData, ILocationData } from '../../types/types'; 
@Injectable({
  providedIn: 'root',
})

export class AppService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getLocation(page: number): Observable<ILocationData> {
    return this.http.get<ILocationData>(`${this.apiUrl}/location/?page=${page}`);
  }

  getCharacters(page: number): Observable<ICharacterData> {
    return this.http.get<ICharacterData>(`${this.apiUrl}/character/?page=${page}`);
  }

  getEpisode(page: number): Observable<IEpisodeData> {
    return this.http.get<IEpisodeData>(`${this.apiUrl}/episode/?page=${page}`);
  }

  getCharacterDetails(characterUrl: string): Observable<any> {
    return this.http.get<any>(characterUrl);
  }
}

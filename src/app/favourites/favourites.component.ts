import { Component, OnInit } from '@angular/core';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any> = [];
  favouritesSub: any;

  constructor(private music_Service: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.music_Service.getFavourites()
    .subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void {
    this.favouritesSub.unsubscribe();
  }

  removeFromFavourites(id: string): void {
    this.favouritesSub = this.music_Service.removeFromFavourites(id).subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

}

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any = [];
  albumsSub: any;

  artist: any = [];
  artistSub: any;

  routeSub: any;

  constructor(
    private music_Service: MusicDataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {

      this.artistSub = this.music_Service.getArtistById(params.id)
      .subscribe(
        (data) => {
          this.artist = data;
        },
        (err) => {
          console.error('Error occur');
        }
      );

      this.albumsSub = this.music_Service.getAlbumsByArtistId(params.id)
        .subscribe(
          (data) => {            
            this.albums = removeDuplicates(data.items, 'name');
          },
          (err) =>
            console.error('Error')
        );
    });
  }


}

const removeDuplicates = (array: Array<any>, key: any) => {
  return array.reduce((arr, item) => {
    const removed = arr.filter((i: any) => i[key] !== item[key]);
    return [...removed, item];
  }, []);
};

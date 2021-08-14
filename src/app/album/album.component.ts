import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any = [];
  albumSub: any;
  routeSub: any;

  constructor(
    private music_Service: MusicDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.albumSub = this.music_Service.getAlbumById(params.id).subscribe(
        (data) => {
          this.album = data;
        },
        (error) => {
          console.error('Error occur');
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

  addToFavorites(trackID: string): void {

    this.music_Service.addToFavourites(trackID).subscribe(
      (success) =>{
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },(error) => {
        this.snackBar.open(
          'Unable to add song to Favourites',
          'Done',
          {
            duration: 1500,
          }
        );
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: Array<any> = [];
  releasesSub: any;

  constructor(private music_Service: MusicDataService) { }

  ngOnInit(): void {
    this.releasesSub = this.music_Service.getNewReleases().subscribe((data) => {
      this.releases = data.albums.items;
    });
  }

  ngOnDestroy(): void {
    this.releasesSub.unsubscribe();
  }

}


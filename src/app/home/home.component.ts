import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Media } from '../models/media';
import { MediaType } from '../models/media-type';
import { ActorService } from '../services/actor.service';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  apiUrl = environment.apiUrl;
  contentType: boolean = false;
  media: any[] = [];
  loader = false;
  searchInput: string = '';
  pageNumber = 1;
  constructor(private mediaService: MediaService) {}

  ngOnInit(): void {
    this.getMedia();
  }

  getMedia() {
    let mediaType = !this.contentType ? MediaType.MOVIE : MediaType.TV_SHOW;
    this.loader = true;
    this.mediaService
      .getMedia(
        mediaType,
        this.pageNumber,
        this.searchInput.length > 1 ? this.searchInput : ''
      )
      .subscribe((paginatedMedia) => {
        paginatedMedia.medias.forEach((m: Media) => {
          this.media.push(m);
        });
        this.pageNumber = paginatedMedia.nextPage;
        this.loader = false;
        if (paginatedMedia.currentPage > 1) {
          setTimeout(() => {
            document.querySelector('#loadMoreButton')?.scrollIntoView();
          }, 500);
        }
      });
  }

  switchMedia() {
    this.searchInput = '';
    this.resetMedia();
  }

  resetMedia() {
    this.pageNumber = 1;
    this.media = [];
    this.getMedia();
  }

  getMediaBySearch() {
    if (this.searchInput.length > 1 || this.searchInput == '') {
      this.resetMedia();
    }
  }
}

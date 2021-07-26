import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css'],
})
export class MovieRatingComponent implements OnInit, AfterViewChecked {
  apiUrl = environment.apiUrl;
  loader = true;
  media: any[] = [];
  constructor(private mediaService: MediaService) {}
  ngAfterViewChecked(): void {
    this.media.forEach((m) => {
      let starCover = document.querySelector<HTMLElement>(`.movie${m.id}`);
      if (starCover) {
        starCover.style.width = `${90 - (m.overallRating / 5) * 90}px`;
      }
    });
  }

  ngOnInit(): void {
    this.getAllMedia();
  }

  getAllMedia() {
    this.loader = true;
    this.mediaService.getAll().subscribe((data: any) => {
      this.media = data;
      this.loader = false;
    });
  }

  rate(mediaId: number) {
    var ratingEl = document.querySelector<HTMLSelectElement>(
      `#mediaRating${mediaId}`
    );
    if (ratingEl) {
      this.mediaService.rate(mediaId, +ratingEl.value).subscribe((data) => {
        var mediaItem = this.media.find((m) => m.id == data.id);
        mediaItem.overallRating = data.overallRating;
      });
    }
  }
}

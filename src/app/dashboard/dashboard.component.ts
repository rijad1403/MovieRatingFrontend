import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actor } from '../models/actor';
import { Media } from '../models/media';
import { MediaType } from '../models/media-type';
import { ActorService } from '../services/actor.service';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  newMediaForm = new FormGroup({});
  newActorForm = new FormGroup({});
  actors: any[] = [];
  selectedActors: Number[] = [];
  file: any;
  constructor(
    private actorService: ActorService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.newMediaForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      mediaType: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required]),
      coverImage: new FormControl('', [Validators.required]),
      actors: new FormControl(this.selectedActors, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });

    this.newActorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
    });

    this.getActors();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
      var formData = new FormData();
      formData.append('file', file);
      this.mediaService.uploadImage(formData).subscribe(
        (data) => {
          this.newMediaForm.patchValue(
            {
              coverImage: data.fileName,
            },
            {
              emitEvent: true,
            }
          );
        },
        (error) => {}
      );
      console.log(this.newMediaForm.value);
    }
  }

  addMedia() {
    let media: Media = {
      title: this.newMediaForm.value.title,
      description: this.newMediaForm.value.description,
      mediaType: this.newMediaForm.value.mediaType,
      releaseDate: this.newMediaForm.value.releaseDate,
      coverImage: this.newMediaForm.value.coverImage,
      actors: this.newMediaForm.value.actors,
    };

    this.mediaService.addMedia(media).subscribe((data) => {
      this.newMediaForm.reset();
      let form = document.querySelector<HTMLFormElement>('#newMediaForm');
      form?.reset();
      this.selectedActors = [];
      document.querySelectorAll('.actorCheckbox').forEach((c: any) => {
        c.checked = false;
      });
      var newMediaInfo = document.querySelector('.newMediaInfo');
      newMediaInfo?.classList.remove('d-none');
      setTimeout(() => {
        newMediaInfo?.classList.add('d-none');
      }, 1000);
    });
  }

  addActor() {
    let actor: Actor = {
      name: this.newActorForm.value.name,
      surname: this.newActorForm.value.surname,
    };
    this.actorService.add(actor).subscribe((data) => {
      this.getActors();
      this.newActorForm.reset();
      var newActorInfo = document.querySelector('.newActorInfo');
      newActorInfo?.classList.remove('d-none');
      setTimeout(() => {
        newActorInfo?.classList.add('d-none');
      }, 1000);
    });
  }

  getActors() {
    this.actorService.getAll().subscribe((data) => {
      this.actors = data;
    });
  }

  selectActors(event: any, actorId: Number) {
    if (event.target.checked) {
      this.selectedActors.push(actorId);
    } else {
      this.selectedActors = this.selectedActors.filter((a) => a != actorId);
    }

    this.newMediaForm.patchValue(
      {
        actors: this.selectedActors,
      },
      {
        emitEvent: true,
      }
    );
    console.log(this.selectedActors);
    console.log(this.newMediaForm.value);
  }
}

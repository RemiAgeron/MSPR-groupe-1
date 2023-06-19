import { Component, OnInit } from '@angular/core';
import { Publication, PublicationService } from 'src/app/service/publication.service';

@Component({
  selector: 'app-publications',
  template: `
    <ion-list>
      <ion-item *ngFor="let publication of publications">
        <img [src]="publication.imageUrl" />
        <h2>{{ publication.description }}</h2>
        <ion-list>
          <ion-item *ngFor="let comment of publication.comments">
            {{ comment.text }}
          </ion-item>
        </ion-list>
      </ion-item>
    </ion-list>
  `
})

export class PublicationsComponent {
  publications: Publication[];

  constructor(private publicationService: PublicationService) {
    this.publications = publicationService.getPublications();
  }
}
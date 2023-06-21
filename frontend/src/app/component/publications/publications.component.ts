import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicationService } from 'src/app/service/publication.service';
import { IonModal, IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-publications',
  standalone:true,
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  imports: [IonicModule, CommonModule, SharedModule],
})
export class PublicationsComponent {

  publications: any[] = [];
  showFullDescription: { [key: string]: boolean } = {};
  postComment: any;
  showComment = false;
  isModalOpen = false;

  constructor(
    private publicationService : PublicationService,
    public modalController: ModalController
    ) {  }

  ngOnInit() {
    this.getPublications()
    }


  getPublications(){
    this.publicationService.getPublications().subscribe({
      next: (res: any) => {
        this.publications.push(...res)
        this.publications.forEach((publication) => {
          this.publicationService.getUserNameById(publication.senderId).subscribe((data: any) => {
            publication.firstname = data.firstname;
          });
          this.publicationService.getCommentByPostId(publication.id).subscribe((data: any) => {
            publication.comments = data.content;
            console.log(this.publications)
          });
        });
      }
    })
  }

  toggleDescription(publicationId: string): void {
    this.showFullDescription[publicationId] = !this.showFullDescription[publicationId];
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
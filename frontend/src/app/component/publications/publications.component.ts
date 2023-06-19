import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicationService } from 'src/app/service/publication.service';
import { IonicModule } from '@ionic/angular';
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

  constructor(private publicationService : PublicationService) {
    this.getPublications()
  }

  ngOnInit() {
    this.getPublications()
  }


  getPublications(){
    this.publicationService.getPublications().subscribe({
      next: (res: any) => {
        this.publications.push(...res)
        console.log(this.publications);
      }
    })
  }
  
  // fetchPublications(): void {
  //   this.http.get<Publication[]>('http://localhost:8100/api/post')
  //     .subscribe((data: Publication[]) => {
  //       this.publications = data;
  //     });
  // }
}
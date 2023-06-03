import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Publications {
  description: string;
  plant: string; 
}

interface Review {
  user: User;
  message: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  biography: string;
  publications: Publications[];
  reviews: Review[];
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class UserDetailComponent {

  public user: User = {
    id: 8,
    firstname: "Dimitry",
    lastname: "Neutron",
    biography: "Voici une petite description de qui je suis...",
    publications: [
      {
        description: "Belle plante",
        plant: "Avocatier"
      },
      {
        description: "Belle plante",
        plant: "Avocatier"
      },
      {
        description: "Belle plante",
        plant: "Avocatier"
      },
      {
        description: "Belle plante",
        plant: "Avocatier"
      },
      {
        description: "Belle plante",
        plant: "Avocatier"
      },
    ],
    reviews: [
      {
        user: {id: 1, firstname: "Rémi", lastname: "Ageron", biography: "Voici ma description...", publications: [], reviews: []},
        message: "Personnes de confiance, donne de très bons conseils."
      }
    ]
  }

  public segmentChoice: string = "publication";

  handleChange(event: any) {
    this.segmentChoice = event.target.value;
    console.log(this.segmentChoice);
  }
}

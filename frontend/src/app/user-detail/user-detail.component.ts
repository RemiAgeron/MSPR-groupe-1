import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

interface User {
  id: number;
  isAdmin: boolean;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  description?: string;
  user_picture?: string;
  created_at: Date;
  publications: Post[];
  reviews: Review[];
}

interface Post {
  id: number;
  title: string;
  content: string;
  tags?: string;
  picture?: string;
  senderId: number;
  created_at: Date;
  updated_at: Date;
}

interface Review {
  id: number;
  content: string;
  senderId: number;
  botanistId: number;
  created_at: Date;
  reviewer?: User;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class UserDetailComponent {

  constructor(public http: HttpClient, private platform: Platform) {
    this.getData();
  }

  public user?: User;
  public segmentChoice: string = "publication";
  public id: string = this.platform.url().substring(this.platform.url().lastIndexOf('/') + 1);

  getData() {
    this.http.get<User>('http://127.0.0.1:5000/api/user/' + this.id, {})
      .subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Erreur :', error);
        }
      )
  }

  handleChange(event: any) {
    this.segmentChoice = event.target.value;
  }
}

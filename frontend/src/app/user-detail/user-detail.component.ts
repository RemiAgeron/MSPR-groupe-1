import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

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
  Botanist: Botanist[];
  Post: Post[];
  Review?: Review[];
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

interface Botanist {
  id: number;
  userId: number;
  address: string;
  company_name: string;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HeaderComponent],
})
export class UserDetailComponent {

  constructor(public http: HttpClient, private platform: Platform) {
    this.getUser();
  }

  public user?: User;
  public segmentChoice: string = "publication";
  public id: string = this.platform.url().substring(this.platform.url().lastIndexOf('/') + 1);

  public pageTitle: string = "User";
  public icon: string = '';

  getUser() {
    return this.http.get<User>('http://127.0.0.1:5000/api/user/profile/' + this.id, {})
      .subscribe(
        (response) => {
          console.log(response);
          this.user = response;
          this.pageTitle = this.user.firstname + " " + this.user.lastname;
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

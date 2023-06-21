import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor( private http: HttpClient) { }

  getPublications(){
    return this.http.get(environment.baseUrl + 'post')
  }

  getUserNameById(userId: string) {
    return this.http.get(environment.baseUrl + 'user/' + userId);
  }

  getCommentByPostId(postId: string) {
    return this.http.get(environment.baseUrl + 'comment/post/' + postId);
  }

}


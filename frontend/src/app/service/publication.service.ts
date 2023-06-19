import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private publications: Publication[] = [];

  constructor() { }

  getPublications(): Publication[] {
    return this.publications;
  }

  addPublication(publication: Publication): void {
    this.publications.push(publication);
  }

  deletePublication(publication: Publication): void {
    const index = this.publications.indexOf(publication);
    if (index > -1) {
      this.publications.splice(index, 1);
    }
  }
}

export class Publication {
  constructor(
    public id: number,
    public imageUrl: string,
    public description: string,
    public comments: Comment[]
  ) {}
}

export class Comment {
  constructor(
    public id: number,
    public text: string
  ) {}
}

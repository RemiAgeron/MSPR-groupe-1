import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

interface Item {
  id: number,
  name: string,
  type: 'user' | 'botanist' | 'plant',
  link?: string
}

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule, HeaderComponent]
})
export class SearchPage {
  publications!: Item[];

  constructor(public http: HttpClient) {}
  public pageTitle: string = 'Rechercher';
  public icon: string = '';

  public data: Item[] = [];
  public results: Item[] = [];
  public inputQuery?: string;
  public segmentQuery: string = "all";

  setLink(item: Item) {
    item.link = item.type === "plant" ? "plant/" : "user/" + item.id;
    return item
  }

  setData() {
    if ((this.inputQuery || "").length > 0) {
      this.http.post<Item[]>('http://127.0.0.1:5000/api/search/', {input: this.inputQuery})
        .subscribe(
          (response) => {
            this.data = response.map(item => this.setLink(item));
            this.setResults();
            return;
          },
          (error) => {
            console.error('Erreur :', error);
          }
        )
    }

    this.data = [];
    this.setResults();
  }

  setResults() {
    if (this.segmentQuery !== "all") {
      this.results = this.data.filter((d) => d.type.toLowerCase() === this.segmentQuery);
    } else {
      this.results = this.data;
    }
  }

  handleInput(event: any) {
    this.inputQuery = event.target.value.toLowerCase();
    this.setData();
  }

  handleChange(event: any) {
    this.segmentQuery = event.target.value.toLowerCase();
    this.setResults();
  }

}

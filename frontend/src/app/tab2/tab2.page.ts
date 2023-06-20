import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Item {
  id: number,
  name: string,
  type: 'user' | 'botanist' | 'plant'
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})
export class Tab2Page {
  publications!: Item[];

  constructor(public http: HttpClient) {
    this.setData();
  }

  public data: any[] = [];
  public results: any[] = [];
  public inputQuery?: string;
  public segmentQuery: string = "all";

  setData() {
    // const url = 'http://127.0.0.1:5000';
    // const body = {input: this.inputQuery};

    if ((this.inputQuery || "").length > 0) {
      this.http.post<Item[]>('http://127.0.0.1:5000', {input: this.inputQuery}, {})
        .subscribe(
          (response) => {
            console.log('Réponse :', response);
            this.data = response;
            return;
          },
          (error) => {
            console.error('Erreur :', error);
          }
        )
    }

    this.data = [];
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

  handleClick(item: any) {
    console.log(item);
  }

}

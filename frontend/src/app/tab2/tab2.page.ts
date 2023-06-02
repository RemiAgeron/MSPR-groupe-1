import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

interface Item {
  name: string;
  type: "user" | "plant" | "botanist";
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})
export class Tab2Page {

  public data: Item[] = [
    {name: "Mary Wonder", type: "user"},
    {name: "John Doe", type: "user"},
    {name: "Kyle Wonder", type: "user"},
    {name: "Rose Award", type: "user"},
    {name: "Rémi Ageron", type: "user"},
    {name: "Mary Jam", type: "botanist"},
    {name: "Jane Doe", type: "botanist"},
    {name: "Henry Dubois", type: "botanist"},
    {name: "Théo Robillard", type: "botanist"},
    {name: "ABIES SAPIN", type: "plant"},
    {name: "ACER ERABLE", type: "plant"},
    {name: "BETULA BOULEAU", type: "plant"},
    {name: "FAGUS HETRE", type: "plant"},
    {name: "FRAXINUS FRENE", type: "plant"},
    {name: "MORUS MURIER", type: "plant"},
    {name: "PYRUS POIRIER", type: "plant"},
    {name: "QUERCUS CHENE", type: "plant"},
  ];
  public results: Item[] = [];
  public inputQuery?: string;
  public segmentQuery: string = "all";

  setResults() {
    let filteredResults = this.data;
    if (this.segmentQuery !== "all") {
      filteredResults = filteredResults.filter((d) => d.type.toLowerCase() === this.segmentQuery);
    }
    if (this.inputQuery) {
      filteredResults = filteredResults.filter((d) => d.name.toLowerCase().indexOf(this.inputQuery || "") > -1);
    }
    this.results = filteredResults;
  }

  handleInput(event: any) {
    this.inputQuery = event.target.value.toLowerCase();
    this.setResults();
  }

  handleChange(event: any) {
    this.segmentQuery = event.target.value;
    this.setResults();
  }

  handleClick(item: Item) {
    console.log(item);
  }

}

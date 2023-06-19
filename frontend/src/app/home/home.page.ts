import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, HeaderComponent],
})
export class HomePage {
  pageTitle: string = 'Découvir';
  icon: string = 'add';
  constructor() {}
}

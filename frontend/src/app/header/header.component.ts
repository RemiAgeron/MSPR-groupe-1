import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone:true,
  imports: [IonicModule],
})
export class HeaderComponent  implements OnInit {
  @Input() title!: string;
  @Input() icon!: string;

  constructor() { }

  ngOnInit() {}

}

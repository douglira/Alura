import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AluraPic'

  photos = [
    {
      url: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519__340.jpg',
      description: 'Leão africano'
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519__340.jpg',
      description: 'Leão africano'
    },
    {
      url: 'https://cdn.pixabay.com/photo/2017/10/25/16/54/african-lion-2888519__340.jpg',
      description: 'Leão africano'
    },
  ]
}

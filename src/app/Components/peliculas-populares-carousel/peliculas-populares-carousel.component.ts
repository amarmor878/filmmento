import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiTmdbPeliculasService } from 'src/app/Services/api-tmdb-peliculas.service';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-peliculas-populares-carousel',
  templateUrl: './peliculas-populares-carousel.component.html',
  styleUrls: ['./peliculas-populares-carousel.component.css']
})
export class PeliculasPopularesCarouselComponent implements OnInit {
  peliculas: any[] = [];
  generos: any[] = [];
  faPlay = faPlay;
  currentPage = 1;

  constructor(private peliculasService: ApiTmdbPeliculasService) { }
  ngOnInit(): void {
    this.peliculasService.getPeliculasPopulares(this.currentPage).subscribe(peliculasData => {
      this.peliculas = peliculasData.results;
    });

    this.peliculasService.getGenerosPeliculas().subscribe(generosData => {
      this.generos = generosData.genres;
    });
  }

  getGeneroById(id: number) {
    const genero = this.generos.find(g => g.id === id);
    return genero ? genero.name : '';
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1140: {
        items: 5
      }
    },
    nav: false
  };


}

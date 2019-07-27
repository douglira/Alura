import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/photo';

@Pipe({
  name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {
  transform(photos: Photo[], descriptionQuery: string) {
    const inputFilter = descriptionQuery.trim().toLowerCase();

    if (inputFilter) {
      return photos
        .filter(photo => photo.description.toLowerCase().includes(inputFilter));
    };

    return photos
  }
}

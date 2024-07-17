import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchKey: string): any[] {
    const result: any = []

    if (!items || searchKey == "") {
      return items
    }
    items.forEach((item: any) => {
      if (item.category.trim().toLowerCase().includes(searchKey.trim().toLowerCase())) {
        result.push(item)
      }
    })
    return result
  }

}

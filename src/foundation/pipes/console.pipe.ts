import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'console'
})
export class ConsolePipe implements PipeTransform {
  transform(value: any, group: string): string {
    console.group(`TEMPLATE LOG: ${group}`);
    console.dir(value);
    console.groupEnd();

    return '';
  }
}

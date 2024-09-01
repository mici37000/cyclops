import { DomSanitizer } from '@angular/platform-browser';
import { PipeTransform, Pipe } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Pipe({
  name: 'stockChange',
  standalone: true
})
export class StockChangePipe implements PipeTransform {
  private percentPipe = new PercentPipe('en-US');

  constructor(private sanitized: DomSanitizer) {}

  transform(value: number) {
    const className: string = value >= 0 ? 'up' : 'down';
    const template: string = `<span class="${className}">${this.percentPipe.transform(value)}</span>`;
    return this.sanitized.bypassSecurityTrustHtml(template);
  }
}

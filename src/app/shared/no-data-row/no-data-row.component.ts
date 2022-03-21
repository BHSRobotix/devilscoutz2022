import { Component, Input } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'dbtz-no-data-row',
  template: `
    <div class="no-data-row">
      <fa-icon [icon]="icon"></fa-icon><span>{{ text }}</span>
    </div>
  `,
  styles: [
    '.no-data-row { margin: 8px 12px; }',
    '.no-data-row * { margin-left: 4px; }'
  ]
})
export class NoDataRowComponent {
  @Input() icon: IconDefinition = faInfoCircle;
  @Input() text = 'There are no results to display.';
}

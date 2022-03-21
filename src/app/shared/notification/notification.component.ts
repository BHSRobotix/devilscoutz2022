import { Component, Input } from '@angular/core';
import {
  faInfoCircle,
  faExclamationTriangle,
  faCheckCircle,
  faStopCircle
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export type NotificationLevel = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'dbtz-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input() level: NotificationLevel = 'info';

  iconMap = {
    info: faInfoCircle,
    warning: faExclamationTriangle,
    error: faStopCircle,
    success: faCheckCircle
  };

  constructor() { }

  get icon(): IconDefinition {
    return this.iconMap[this.level];
  }

}

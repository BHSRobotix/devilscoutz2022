import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/firebase/config.service';

@Injectable({
  providedIn: 'root'
})
export class EventSelectorService {

  currentEventKey: string;
  // TODO - make this real
  eventLocked = true;

  constructor(private readonly configService: ConfigService) {
    // TODO - remove this hack and figure out a better way
    this.currentEventKey = '2022marea'; // this.configService.currentEventKey;
  }

}

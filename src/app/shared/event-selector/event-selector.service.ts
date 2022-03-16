import { Injectable } from '@angular/core';
import { ConfigService } from '../../services/firebase/config.service';

@Injectable({
  providedIn: 'root'
})
export class EventSelectorService {

  currentEventKey: string;

  constructor(private readonly configService: ConfigService) {
    this.currentEventKey = this.configService.currentEventKey;
  }

}

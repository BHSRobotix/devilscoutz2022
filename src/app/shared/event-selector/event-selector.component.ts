import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfigService } from '../../services/firebase/config.service';
import { TbaSimpleEvent } from '../../services/tba/the-blue-alliance.types';
import { EventsService } from '../../services/firebase/events.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EventSelectorService } from './event-selector.service';
import { shortenEventName } from '../util.methods';

@Component({
  selector: 'dbtz-event-selector',
  templateUrl: './event-selector.component.html',
  styleUrls: ['./event-selector.component.scss']
})
export class EventSelectorComponent implements OnInit {

  @Output() eventChanged: EventEmitter<string> = new EventEmitter();

  currentEventKey = '';
  currentEvent: TbaSimpleEvent | undefined;
  isLocked = true;
  isEditing = false;
  possibleEvents: TbaSimpleEvent[] = [];
  faEdit = faEdit;

  constructor(private readonly configService: ConfigService,
              private readonly eventsService: EventsService,
              private readonly eventSelectorService: EventSelectorService) { }

  ngOnInit(): void {
    // TODO - figure out which of the next two lines makes more sense
    // this.isLocked = this.configService.eventLocked;
    this.isLocked = this.eventSelectorService.eventLocked;
    // Get the current event from the local service which saves is, and emit
    this.currentEventKey = this.eventSelectorService.currentEventKey;
    this.eventChanged.emit(this.currentEventKey);
    this.eventsService.getEvents().subscribe((querySnapshot) => {
        querySnapshot.forEach((doc: any) => {
          const evt: TbaSimpleEvent = doc.data() as TbaSimpleEvent;
          this.possibleEvents.push(evt);
          if (evt.key === this.currentEventKey) {
            this.currentEvent = evt;
          }
        });
        this.possibleEvents.sort((a: TbaSimpleEvent, b: TbaSimpleEvent) =>
          a.start_date > b.start_date ? 1 : -1
        );
      },
      (error) => {
        console.error('Error getting documents: ', error);
      });
  }

  startEdit(): void {
    this.isEditing = !this.isLocked;
  }

  stopEdit(): void {
    this.isEditing = false;
  }

  updateCurrentEvent(): void {
    // console.log('updating current event to', this.currentEventKey);
    this.updateServiceValue();
    this.currentEvent =
      this.possibleEvents.find(evt => evt.key === this.currentEventKey);
    this.isEditing = false;
  }

  updateServiceValue(): void {
    this.eventSelectorService.currentEventKey = this.currentEventKey;
    this.eventChanged.emit(this.currentEventKey);
  }

  shorten(eventName: string): string {
    return shortenEventName(eventName);
  }

}

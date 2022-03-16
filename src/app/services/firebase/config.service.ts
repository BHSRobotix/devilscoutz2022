import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';

export interface ScoutingConfig {
  currentEventKey: string;
  eventLocked: boolean;
}

const CURRENT_CONFIG_DOCID = 'current';

const DEFAULT_CURRENT_EVENT_KEY = '2022nhgrs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  currentConfig: ScoutingConfig;
  configLoaded = false;

  constructor(private firestore: AngularFirestore) {
    this.currentConfig = { currentEventKey: '', eventLocked: false };
    this.updateConfig();
  }

  get currentEventKey(): string {
    return this.currentConfig?.currentEventKey || DEFAULT_CURRENT_EVENT_KEY;
  }

  get eventLocked(): boolean {
    return this.currentConfig?.eventLocked || false;
  }

  private updateConfig(): void {
    this.firestore.collection('config').doc(CURRENT_CONFIG_DOCID)
      .get()
      .subscribe((snapshot: firebase.firestore.DocumentSnapshot<unknown>) => {
          this.currentConfig = snapshot.data() as ScoutingConfig;
          this.configLoaded = true;
        },
        (error) => {
          console.error('Error getting config document: ', error);
        });
  }

}

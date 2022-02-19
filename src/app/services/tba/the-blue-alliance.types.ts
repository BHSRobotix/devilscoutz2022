export interface TbaDistrict {
  abbreviation: string;
  display_name: string;
  key: string;
  year: number;  // TODO - what is this? is a 0 in the data?
}

export interface TbaWebcast {
  type: string; // TODO - enumerate? "youtube", etc.
  channel: string;
  date: string;
  file: string;
}

export interface TbaSimpleEvent {
  key: string;
  name: string;
  event_code: string;
  event_type: number; // TODO - this seems to always be 0?
  district: TbaDistrict | null;
  city: string;
  state_prov: string;
  country: string;  // todo - could prob become it's own type? "Canada"
  start_date: string; // convertible to Date
  end_date: string; // convertible to Date
  year: number; // sanity checkable - 4 digits
}

export interface TbaEvent extends TbaSimpleEvent {
  address: string;
  postal_code: string;
  week: number; // ranged - should be 0 to 8 or 9 at most, right?
  division_keys: string[]; // todo - this is a guess
  event_type_string: string; // todo - could become a type possibly "Regional"
  first_event_code: string;
  first_event_id: string | null;
  short_name: string;
  timezone: string; // could probably be enumerated
  webcasts: TbaWebcast[];
  website: string;
  location_name: string;
  gmaps_place_id: string;  // looks like a quid of sorts?
  gmaps_url: string;  // should look like a URL
  lat: number; // does typescript have this much precision?
  lng: number; // ditto
  parent_event_key: string;
  playoff_type: number;
  playoff_type_string: string;
}

export interface TbaSimpleTeam {
  key: string;
  team_number: number;
  nickname: string;
  name: string;
  city: string;
  state_prov: string;
  country: string;
}

export interface TbaTeam extends TbaSimpleTeam  {
  school_name: string;
  address: string;
  postal_code: string;
  gmaps_place_id: string;
  gmaps_url: string;
  lat: number;
  lng: number;
  location_name: string;
  website: string;
  rookie_year: number;
  motto: string;
  home_championship: any; // it's not clear to me what this object is
}

export interface TbaVideo {
  type: string;
  key: string;
}

export interface TbaAllianceMatchBreakdown {
  score: number;
  team_keys: string[];
  surrogate_team_keys: string[];
  dq_team_keys: string[];
}

export interface TbaSimpleMatch {
  key: string;
  comp_level: string;  // enumerable like "qm", ?
  set_number: number;
  match_number: number;
  alliances: {
    red: TbaAllianceMatchBreakdown;
    blue: TbaAllianceMatchBreakdown;
  };
  winning_alliance: 'red' | 'blue' | '';  // tie appears to be ''
  event_key: string;
  time: number;
  actual_time: number;
  predicted_time: number;
  post_result_time: number;
  score_breakdown: any; // TODO - not clear what this is
  videos: TbaVideo[];
}

// There doesn't appear to be a difference in match vs simple-match
// export interface TbaMatch extends TbaSimpleMatch {
// }

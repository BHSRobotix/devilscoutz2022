// Note: Only specifying regions that are not first two letters or first letter of 2 words
const stateExceptions: string[][] = [
  ['Alaska', 'AK'],
  ['American Samoa', 'AS'],
  ['Arizona', 'AZ'],
  ['Connecticut', 'CT'],
  ['District Of Columbia', 'DC'],
  ['Georgia', 'GA'],
  ['Hawaii', 'HI'],
  ['Iowa', 'IA'],
  ['Kansas', 'KS'],
  ['Kentucky', 'KY'],
  ['Louisiana', 'LA'],
  ['Maine', 'ME'],
  ['Maryland', 'MD'],
  ['Minnesota', 'MN'],
  ['Mississippi', 'MS'],
  ['Missouri', 'MO'],
  ['Montana', 'MT'],
  ['Nevada', 'NV'],
  ['Pennsylvania', 'PA'],
  ['Tennessee', 'TN'],
  ['Texas', 'TX'],
  ['Vermont', 'VT'],
  ['Virginia', 'VA']
];

// Canada and the US have completely distinct abbreviations
const provinceExceptions: string[][] = [
  ['Alberta', 'AB'],
  ['Manitoba', 'MB'],
  ['Newfoundland', 'NF'],
  ['Prince Edward Island', 'PE'],
  ['Quebec', 'QC'],
  ['Saskatchewan', 'SK'],
  ['Yukon', 'YT']
];

const states: string[][] = [
  ['Alabama', 'AL'],
  ['Alaska', 'AK'],
  ['American Samoa', 'AS'],
  ['Arizona', 'AZ'],
  ['Arkansas', 'AR'],
  ['Armed Forces Americas', 'AA'],
  ['Armed Forces Europe', 'AE'],
  ['Armed Forces Pacific', 'AP'],
  ['California', 'CA'],
  ['Colorado', 'CO'],
  ['Connecticut', 'CT'],
  ['Delaware', 'DE'],
  ['District Of Columbia', 'DC'],
  ['Florida', 'FL'],
  ['Georgia', 'GA'],
  ['Guam', 'GU'],
  ['Hawaii', 'HI'],
  ['Idaho', 'ID'],
  ['Illinois', 'IL'],
  ['Indiana', 'IN'],
  ['Iowa', 'IA'],
  ['Kansas', 'KS'],
  ['Kentucky', 'KY'],
  ['Louisiana', 'LA'],
  ['Maine', 'ME'],
  ['Marshall Islands', 'MH'],
  ['Maryland', 'MD'],
  ['Massachusetts', 'MA'],
  ['Michigan', 'MI'],
  ['Minnesota', 'MN'],
  ['Mississippi', 'MS'],
  ['Missouri', 'MO'],
  ['Montana', 'MT'],
  ['Nebraska', 'NE'],
  ['Nevada', 'NV'],
  ['New Hampshire', 'NH'],
  ['New Jersey', 'NJ'],
  ['New Mexico', 'NM'],
  ['New York', 'NY'],
  ['North Carolina', 'NC'],
  ['North Dakota', 'ND'],
  ['Northern Mariana Islands', 'NP'],
  ['Ohio', 'OH'],
  ['Oklahoma', 'OK'],
  ['Oregon', 'OR'],
  ['Pennsylvania', 'PA'],
  ['Puerto Rico', 'PR'],
  ['Rhode Island', 'RI'],
  ['South Carolina', 'SC'],
  ['South Dakota', 'SD'],
  ['Tennessee', 'TN'],
  ['Texas', 'TX'],
  ['US Virgin Islands', 'VI'],
  ['Utah', 'UT'],
  ['Vermont', 'VT'],
  ['Virginia', 'VA'],
  ['Washington', 'WA'],
  ['West Virginia', 'WV'],
  ['Wisconsin', 'WI'],
  ['Wyoming', 'WY'],
];

const provinces: string[][] = [
  ['Alberta', 'AB'],
  ['British Columbia', 'BC'],
  ['Manitoba', 'MB'],
  ['New Brunswick', 'NB'],
  ['Newfoundland', 'NF'],
  ['Northwest Territory', 'NT'],
  ['Nova Scotia', 'NS'],
  ['Nunavut', 'NU'],
  ['Ontario', 'ON'],
  ['Prince Edward Island', 'PE'],
  ['Quebec', 'QC'],
  ['Saskatchewan', 'SK'],
  ['Yukon', 'YT'],
];

const regionExceptions = stateExceptions.concat(provinceExceptions);
const regions = states.concat(provinces);

export function regionNameToAbbr(regionName: string): string {
  const input = regionName.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  for (const exception of regionExceptions) {
    if (exception[0] === input) {
      return (exception[1]);
    }
  }
  // If we hit here, it's not an exception
  // If it's exactly two words, return first letter of each
  const regionWords = regionName.split(' ');
  if (regionWords.length === 2) {
    return regionWords[0].charAt(0).concat(regionWords[1].charAt(0)).toUpperCase();
  }
  return regionName.slice(0, 2).toUpperCase();
}

export function regionAbbrToName(regionAbbr: string): string {
  for (const region of regions) {
    if (region[1] === regionAbbr) {
      return (region[0]);
    }
  }
  return '';
}

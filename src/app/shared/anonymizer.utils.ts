import { User } from '../services/auth/auth.service';

const ADJECTIVES = [
  'Awkward', 'Bouncy', 'Comical', 'Diluted', 'Emphatic', 'Funky', 'Gracious', 'Happy',
  'Inquisitive', 'Jive', 'Kind', 'Leaping', 'Manic', 'Nocturnal', 'Organized', 'Proud'
];
const ANIMALS = [
  'Aardvark', 'Barracuda', 'Caribou', 'Dingo', 'Elephant', 'Ferret', 'Gopher', 'Hippo',
  'Ibex', 'Jackal', 'Kangaroo', 'Lemming', 'Monkey', 'Narwhal', 'Orangutan', 'Penguin'
];
const ANONYMOUS_PHOTO_URL = 'https://icon-library.com/images/generic-user-icon/generic-user-icon-11.jpg';

const randomAdjective = () => ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
const randomAnimal = () => ANIMALS[Math.floor(Math.random() * ANIMALS.length)];

export function getRandomDisplayName(): string {
  return `${ randomAdjective() } ${ randomAnimal() }`;
}

export function getUnauthenticatedUser(): User {
  return {
    uid: `unauth${ Date.now() }`,
    email: '',
    displayName: getRandomDisplayName(),
    photoURL: ANONYMOUS_PHOTO_URL,
    emailVerified: false,
    authenticated: false,
    guest: true
  };
}

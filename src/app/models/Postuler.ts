import { Sujet } from './Sujet';

export interface Postuler {
  pathFile: string | undefined;
  sujet: Sujet;
  id: number;
}

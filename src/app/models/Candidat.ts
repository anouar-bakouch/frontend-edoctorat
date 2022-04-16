import { CompteUser } from './CompteUser';
import { Pays } from './Pays';

export interface Candidat {
  cne: string;
  pays: Pays;
  cin: string;
  nomCandidatAr: string | undefined;
  prenomCandidatAr: string | undefined;
  adresse: string;
  adresseAr: string | undefined;
  sexe: string;
  villeDeNaissance: string;
  villeDeNaissanceAr: string | undefined;
  ville: string;
  dateDeNaissance: string;
  typeDeHandiCape: string;
  academie: string | undefined;
  telCandidat: string;
  pathCv: string | undefined;
  pathPhoto: string | undefined;
  user: CompteUser;
  etatDossier: number | undefined;
  situation_familiale: string | undefined;
}

import { Professeur } from "./Professeur";


export interface Commission {

   id:number;
   dateCommission:string;
   heure:string; 
   valider:boolean;
   lieu:string;
   labo:number; 
   participants:Professeur[];
}
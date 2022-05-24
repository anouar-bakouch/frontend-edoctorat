import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { Diplome } from 'src/app/models/Diplome';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import swal from 'sweetalert';


@Component({
  selector: '[app-sujers]',
  templateUrl: './sujers.component.html',
  styleUrls: ['./sujers.component.css']
})

export class SujersComponent implements OnInit {

  public sujets:Postuler[] = [];
  public alert: AlertData | undefined = undefined;
  public message:string = 'aucun sujet n\'est choisi pour le moment,les sujets choisies vont apparaitre ici';
  public NoSujets:boolean = false; 
  public errorText:string = '';
  public PROJET_THESE = 'dfile';
  public ProjetTheseFileLink: string | undefined;
  public diplome: Diplome | undefined;
  public isFetchingItems:boolean  = true;
  public postuler!:Postuler;
  public isUpdating:boolean = false;
 
  public Sujetform = <RxFormGroup>this.fservice.group({  
   pathFile : ['']
  })

  constructor(public candidat:CandidatPostulerService,private fservice: RxFormBuilder,) {}

  ngOnInit(): void {

    this.candidat.getSelectedSubjects().subscribe(res=>{
    this.isFetchingItems = false; 
    this.sujets = res.results;
    if(this.sujets.length <= 0) this.NoSujets = ! this.NoSujets;

    })

  }


  public delete(s:Postuler){

    this.candidat.deletePostule(s.id).then(x=>{
        const index = this.sujets.indexOf(s);
        this.sujets.splice(index,1);

          this.alert = {
            type: 'loading',
            message: "supprimé avec succès",
          }
          if(this.sujets.length <= 0) this.NoSujets = ! this.NoSujets;
          
    }).then(()=>{
      if(this.sujets.length <= 0) this.NoSujets = ! this.NoSujets;
    }).catch((_)=>{
      this.alert = {
        type: 'loading',
        message: "error lors de la suppression",
      };
    })
    .finally(()=>{
      if(this.sujets.length <= 0) this.NoSujets = ! this.NoSujets;
      setTimeout(() => (this.alert = undefined), 3000);
    })
  }

  updatePostuler(){
    this.isUpdating = true;
    const formData = this.Sujetform.toFormData();
    formData.set('pathFile', formData.get('pathFile[0]'));
    formData.delete('pathFile[0]');
    if (formData.get('pathFile') === 'null') {
      formData.delete('pathFile');
    }
   this.candidat.updatePostuler(formData,this.postuler.id)
   .then((_) =>
   swal({
     icon: 'success',
   })
 )
 .catch((_) => {
   this.errorText =
     "Une erreur s'est produite de notre côté, réessayez plus tard.";
 })
 .finally(() => (this.isUpdating = false));

}

  onFileSelected(event: Event, type: string) {
    this.errorText = undefined;
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 4194304) {
        if (type === this.PROJET_THESE) {
          this.Sujetform.controls['diplomeFile'].setValue('');
          this.errorText =
            'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo';
        } else if (type === this.PROJET_THESE) {
          this.Sujetform.controls['relevefile'].setValue('');
          this.errorText =
            'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
        }
        return;
      }
    }
  }





}

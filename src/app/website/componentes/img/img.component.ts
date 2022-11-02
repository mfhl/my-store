import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
//importar uso de outputos y eventemitter para comunicar al padre

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  //esto sirve para cuando hay varios input saber de que input esta llegando y asi trabajarlo
  img: string = ''
  @Input('img')//llegada del valor del padre---- se declara dentro de('') el nombre de variable como esta en component html
  set changeImage(newImg:string){
    this.img=newImg;
    //console.log('change jus img =>', this.img);
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>(); // enviar informacion al padre declaracion de variable
  imgDefault: string = '../assets/default.png';
  // counter=0;
  // counterFn:number|undefined;

  constructor() {
    //corre antes de renderizar y noasync
    //console.log('constructor', 'imgValue=>', this.img);
  }
  ngOnChanges(changes:SimpleChanges) {
    //estar actualizando los cambios de los imputs
    //corre antes de render
    //console.log('ngOnChanges', 'imgValue=>', this.img);
    //console.log('changes',changes);
    // if(changes.){
    //   code
    // }
  }

  ngOnInit(): void {
    //corre antes del render y puede correr async corre una sola vez
   // console.log('ngOnInit', 'imgValue=>', this.img);
  }
  ngAfterViewInit() {
    //corre despues de que todo este renderizado aqui se manejan los hijos
    //console.log('ngAfterViewInit', 'imgValue=>', this.img);

    // this.counterFn=window.setInterval(()=>{
    //   this.counter+= 1;
    //   console.log('run counter');
    // },1000);
  }
  ngOnDestroy() {
    //destruye el componente
    console.log('ngOnDestroy', 'imgValue=>', this.img);
   // window.clearInterval(this.counterFn);
  }
  imgError() {
    this.img = this.imgDefault;
  }
  //enviar infotmacion al padre
  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img); // emitir el evento de enviar la imagen
  }

}

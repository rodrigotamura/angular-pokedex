import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRollPokeball]'
})
export class RollPokeballDirective {

  @HostListener('window:scroll', []) rollBall(){

    const prop = `translateY(-50%) rotateZ(${window.scrollY/15}deg)`;

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      prop
    );

  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

}

const hamburger = document.getElementById('hamburger');
const hide = document.getElementById('hide');
const siteNav = document.getElementById('siteNav');
const testPath = hamburger.querySelector('path:nth-of-type(1)');
const centralPath = hamburger.querySelector('path:nth-of-type(2)');
const navButtons = document.querySelectorAll('.nav-button');

navButtons.forEach(b=>{

    function tEnter(e){
        if(e.pseudoElement === '::after'){
            b.removeEventListener('transitionend',tEnter);
            b.classList.add('reverse-hover');
        };
    };

    function tLeave(){
        b.removeEventListener('transitionend',tLeave);
        b.classList.remove('reverse-hover');
    };
    
    b.addEventListener('mouseenter',()=>{
        b.addEventListener('transitionend',tEnter);
    });

    b.addEventListener('mouseleave',()=>{
        b.addEventListener('transitionend',tLeave);
    });
});

const onClick = function(){

    this.removeEventListener('click',onClick);

        if(this.classList.contains('to-cross')){

            function toLine(){
    
                centralPath.style.removeProperty('visibility');
                testPath.removeEventListener('transitionend',toLine);
                testPath.addEventListener('transitionend',toBurger);
                hamburger.classList.remove('to-line');
            };

            function toBurger(){
                testPath.removeEventListener('transitionend',toBurger);
                hamburger.addEventListener('click',onClick);
            };
    
            testPath.addEventListener('transitionend',toLine);
    
            hamburger.classList.remove('to-cross');
           
        }else{

            function toLine(){
    
                testPath.removeEventListener('transitionend',toLine);
                testPath.addEventListener('transitionend',toCross);
                centralPath.style.visibility = 'hidden';
                hamburger.classList.add('to-cross');
            };
    
            function toCross(){
                testPath.removeEventListener('transitionend',toCross);
                hamburger.addEventListener('click',onClick);
            };

            testPath.addEventListener('transitionend',toLine);
    
            hamburger.classList.add('to-line');
    
        };


        hide.style.visibility = 'visible';
        hide.classList.toggle('is-visible');
        siteNav.classList.remove('no-transition');
        siteNav.classList.toggle('is-visible');
        document.body.classList.toggle('is-fixe');
}

hamburger.addEventListener('click',onClick);

hide.addEventListener('transitionend',function(){
    if(!hide.classList.contains('is-visible')) hide.style.removeProperty('visibility');
});

const setHideWidth = function(noOffset){
   
    let offsetR, offsetT;

    if(noOffset){
        offsetT = offsetR = 0;
    }else{
        offsetR = window.innerWidth - hamburger.offsetLeft - hamburger.offsetWidth;
        offsetT = hamburger.offsetTop + hamburger.offsetHeight/2;
    };
    
    let w = 2*Math.sqrt(Math.pow(window.innerWidth,2) + Math.pow(window.innerHeight,2)) - (offsetR+offsetT)/2;
    hide.style.width = hide.style.height = w+'px';
    hide.style.borderRadius = w/2+'px';
    hide.style.top = -w/2 + offsetT + 'px';
    hide.style.right = -w/2 + offsetR + 'px';
};
setHideWidth();

window.addEventListener('resize',()=>{

    if(window.matchMedia('(min-width : 1000px)').matches){

        hamburger.classList.remove('to-line');
        hamburger.classList.remove('to-cross');
        centralPath.style.removeProperty('visibility');
        siteNav.classList.remove('is-visible');
        siteNav.classList.add('no-transition');
        setHideWidth(true);
        hide.classList.remove('is-visible');
        hide.style.visibility = 'visible';
        document.body.classList.remove('is-fixe');    

    }else setHideWidth();
});
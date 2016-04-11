$ = function (e) { return document.querySelector(e); };

var openModal=$('button.openModal');
var modal=$('.modal');
var modalContent=$('.modal-content');
var okBtn=$('.ok');
var cancelBtn=$('.cancel');
var close=$('.close');

addEvent('click', openModal, function(){
    modal.style.display="block";
    modalContent.style.display="block";
});
addEvent('click', close, function(){
    modal.style.display="none";
    modalContent.style.display="none";
});
addEvent('click', cancelBtn, function(){
    modal.style.display="none";
    modalContent.style.display="none";
});
addEvent('click', window, function(e){
    var e=e||window.event;
    var target= e.target|| e.srcElement;
    if(target==modal){
        modal.style.display="none";
        modalContent.style.display="none";
    }
});

/* 拖拽功能 */
var modalHeader=$(".modal-header");
var mouseOffsetX= 0,mouseOffsetY= 0,isDragble=false;

addEvent('mousedown',modalHeader ,function(e){
    var e = e||window.event;
    stopDefault(e);
    mouseOffsetX= e.pageX-modalHeader.offsetLeft;   //鼠标相对于浮层的位置
    mouseOffsetY= e.pageY-modalHeader.offsetTop;    //鼠标相对于浮层的位置
    isDragble=true;
});
addEvent('mouseup', modal , function(e){
    isDragble=false;
});
addEvent('mousemove', modal , function(e){
    var e = e||window.event;
    stopDefault(e);
    var mouseX= e.pageX;
    var mouseY= e.pageY;
    var moveX= 0,moveY=0;
    if(isDragble){
        alert(moveX);
        var maxX=document.documentElement.clientWidth-modal.offsetWidth;
        var maxY=document.documentElement.clientHeight-modal.offsetHeight;
        moveX=Math.min(maxX,Math.max(0,moveX));
        moveY=Math.min(maxY,Math.max(0,moveY));
        modal.style.left=moveX+'px';
        modal.style.top=moveY+'px';
    }
});

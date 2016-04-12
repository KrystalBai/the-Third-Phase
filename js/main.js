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
var dialogObj, onMoveStartId, mousePos={x:0,y:0};

//addEvent('mousedown',modalHeader ,function(e){
//    var e = e||window.event;
//    stopDefault(e);
//    mouseOffsetX= e.pageX-modalHeader.offsetLeft;   //鼠标相对于浮层的位置
//    mouseOffsetY= e.pageY-modalHeader.offsetTop;    //鼠标相对于浮层的位置
//    isDragble=true;
//});
//addEvent('mouseup', document , function(e){
//    dialogObj=false;
//    clearInterval(onMoveStartId);
//});

function dialogInitial(dragEle,moveEle){
    var obj={};
    obj.dragElement=dragEle;
    obj.moveELement=moveEle;

    obj.mouseOffsetLeft=0;
    obj.mouseOffsetTop=0;

    addEvent('mousedown',obj.dragElement,function(e){
        var e=e||window.event;
        dialogObj=obj;
        obj.mouseOffsetLeft= e.pageX-obj.moveELement.offsetLeft;
        obj.mouseOffsetTop= e.pageY-obj.moveELement.offsetTop;

        onMoveStartId=setInterval(onMoveStart,10);
        return false;
    });
    return obj;
}

document.onmouseup=function(e){
    dialogObj=false;
    clearInterval(onMoveStartId);
};


document.onmousemove=function(e){
   var e=e||window.event;
    mousePos.x= e.clientX;
    mousePos.y= e.clientY;

    e.stopPropagation&& e.stopPropagation();
    e.cancelBubble=true;
    e=this.originalEvent;
    e&&(e.preventDefault? e.preventDefault(): e.returnValue=false);
    document.body.style.MozUserSelect='none';
};

function onMoveStart(){
    var obj=dialogObj;
    if(obj){
        var maxX=document.documentElement.clientWidth-obj.moveELement.offsetWidth;
        var maxY=document.documentElement.clientHeight-obj.moveELement.offsetHeight;

        obj.moveELement.style.left=Math.min(Math.max((mousePos.x-obj.mouseOffsetLeft),0),maxX)+'px';
        obj.moveELement.style.top=Math.min(Math.max((mousePos.y-obj.mouseOffsetTop),0),maxY)+'px';
    }
}

dialogInitial(modalHeader,modalContent);

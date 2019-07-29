/*javascript*/
window.onload = function(){
    mv.app.toTip();
    mv.app.tobanner();
    mv.app.toSel();
    mv.app.torun();
};
var mv = {};
mv.tools = {};
mv.tools.getbyclass = function(oParent,sClass){
    var aEle = oParent.getElementsByTagName('*');
    var arr = [];
    for(var i=0;i<aEle.length;i++){
        if(aEle[i].className == sClass){
            arr.push(aEle[i]);
        }
    }
    return arr;
};

mv.tools.getstyle = function(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,false)[attr];
    }
};

mv.ui = {};
mv.ui.textchange = function(obj,str){
    obj.onfocus = function(){
        if(this.value == str){
            this.value ='';
        }
    };
    obj.onblur = function(){
        if(this.value == ''){
            this.value = str;
        }
    };
};
mv.ui.fadein = function(obj){
    var iCur = mv.tools.getstyle(obj,'opacity');
    if(iCur == 1){
        return false; 
    }
    var value = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var ispeed = 5;
        if(value == 100){
            clearInterval(obj.timer);
        }
        else{
            value += ispeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity='+value+')';
        }
    },30); 
};
mv.ui.fadeout = function(obj){
    var iCur = mv.tools.getstyle(obj,'opacity');
    if(iCur == 0){
        return false; 
    }
    var value = 100;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var ispeed = -5;
        if(value == 0){
            clearInterval(obj.timer);
        }
        else{
            value += ispeed;
            obj.style.opacity = value/100;
            obj.style.filter = 'alpha(opacity='+value+')';
        }
    },30);
};

mv.ui.moveleft = function(obj,old,now){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var iSpeed = (now-old)/10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if(now == old){
            clearInterval(obj.timer);
        }
        else{
            old += iSpeed;
            obj.style.left = old + 'px';
        }
    },30);
};

mv.app = {};
mv.app.toTip = function(){
    var oText1 = document.getElementById('text1');
    var oText2 = document.getElementById('text2');
    
    mv.ui.textchange(oText1,'Search website');
    mv.ui.textchange(oText2,'Search website');

};

mv.app.tobanner = function(){
    var oDd = document.getElementById('ad');
    var aLi = oDd.getElementsByTagName('li');

    var oPrev = mv.tools.getbyclass(oDd,'prev')[0];
    var oNext = mv.tools.getbyclass(oDd,'next')[0];
     
    var iNow = 0;

    var timer = setInterval(auto,3000);
    
    function auto (){
        if(iNow == aLi.length-1){
            iNow = 0;
        }
        else{
            iNow++;
        }
        for(var i=0;i<aLi.length;i++){
            mv.ui.fadeout(aLi[i]);
        }
        mv.ui.fadein(aLi[iNow]);
    }

    function autoprev (){
        if(iNow == 0){
            iNow = aLi.length-1;
        }
        else{
            iNow--;
        }
        for(var i=0;i<aLi.length;i++){
            mv.ui.fadeout(aLi[i]);
        }
        mv.ui.fadein(aLi[iNow]);
    }
};

mv.app.toSel = function(){
    var oSel = document.getElementById('sel1');
    var aDd = oSel.getElementsByTagName('dd');
    var aUl = oSel.getElementsByTagName('ul');
    var aH2 = oSel.getElementsByTagName('h2');
    for(var i=0;i<aDd.length;i++){
        aDd[i].index = i;
        aDd[i].onclick = function(ev){
            var ev = ev || window.event;
            var This = this;
            for(var i=0;i<aUl.length;i++){
                aUl[i].style.display = 'none';
            }
            aUl[this.index].style.display = 'block';
            document.onclick = function(){
                aUl[This.index].style.display = 'none'
            };
            ev.cancelBubble = true;
        };
    }
    for(var i=0;i<aUl.length;i++){
        aUl[i].index = i;
        (function(ul){
            var aLi = ul.getElementsByTagName('li');
            for(var i=0;i<aLi.length;i++){
                aLi[i].onmouseover = function(){
                    this.className = 'active';
                };
                aLi[i].onmouseout = function(){
                    this.className = '';
                };
                aLi[i].onclick = function(ev){
                    var ev = ev || window.event;
                    aH2[this.parentNode.index].innerHTML = this.innerHTML;
                    ev.cancelBubble = true;
                    this.parentNode.style.display = 'none';
                };
            }
        }) (aUl[i]);
    }
};

mv.app.torun = function(){
    var oRun = document.getElementById('run1');
    var oUl = oRun.getElementsByTagName('ul')[0];
    var aLi = oUl.getElementsByTagName('li');
    var oPrev = mv.tools.getbyclass(oRun,'prev')[0];
    var oNext = mv.tools.getbyclass(oRun,'next')[0];
    var iNow = 0;
    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi.length * aLi[0].offsetWidth + 'px';
    mv.ui.moveleft(oUl,3,4);
    oPrev.onclick = function(){
        if(iNow == 0){
            iNow = aLi.length/2;
            oUl.style.left = -oUl.offsetWidth/2 + 'px';
        }
        mv.ui.moveleft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
        iNow--;
    };
    oNext.onclick = function(){
        if(iNow == aLi.length/2){
            iNow = 0;
            oUl.style.left = 0;
        }
        mv.ui.moveleft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
        iNow++;
    };


};
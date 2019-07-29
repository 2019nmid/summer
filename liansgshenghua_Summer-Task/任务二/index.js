// document.onselectstart=function(){return false;}
    window.onload = function(){
        var lis = document.getElementsByClassName('li1');
        
        var dives = document.getElementsByClassName('start');
        var footer = document.getElementsByClassName('account-footer')
        var tab = document.getElementsByClassName('account-tabs')
    
        for (var i =0; i < lis.length; i++){
            lis[i].index = i;
            lis[i].onclick = function (){
                for (var i =0; i < lis.length; i++){
                  
                     lis[i].style.color =' #9b9b9b';      
                     lis[i].style.border ='none';           
                     dives[i].style.display='none';
                     
                };
                // if(i=3){
                //     footer[0].style.display='none';
                //     tab[0].style.display='none';
                //  }
                //  if(i=!3){
                //     tab[0].style.display='block';
                //  }
                this.style.color='#333';
                this.style.borderBottom='1px';
                this.style.borderBottomColor='#333';
                this.style.borderBottomStyle='solid';
                dives[this.index].style.display = "block";

            };
           

        };
 
    }; 
    var y=0;
//    function li3(){
//     console.log(y);
//     var footer = document.getElementsByClassName('account-footer')
//         var tab = document.getElementsByClassName('account-tabs')
//         var lis = document.getElementsByClassName('li1');
//        if(y==1)
//         {           
//            tab[0].style.display='block';
//            footer[0].style.display='block';
//              y=0;                        
//         }
       
//        else{
//          tab[0].style.display='none';
//          footer[0].style.display='none';        
//         y=y+1;
        
    
//     }
      
       
//     }
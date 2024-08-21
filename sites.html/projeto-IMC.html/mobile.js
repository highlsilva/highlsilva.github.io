function start () { 
    var buttonCalculateImc = document.querySelector("#button-Caculete-Imc");
    buttonCalculateImc.addEventListener ("click",handlebuttonclick);
  
}
function CalculateImc(weight,heignt) { 
    return weight / (heignt * heignt);
    
}
function handlebuttonclick(){ 
   var imcResult = document.querySelector("#imc-result");

   var inputweight = document.querySelector("#input-weight");
   var inputheight = document.querySelector("#input-height");
 
   var weight = Number (inputweight.value);
   var height = Number (inputheight.value);
   
   var Imc = CalculateImc (weight , height);
   var formattedImc = Imc.toFixed(2).replace(".", ","); 

   imcResult.textContent = formattedImc;
   
 } 

 

start();

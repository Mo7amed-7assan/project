let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let create=document.getElementById("create");


//total

function getTotal(){


    if(price.value!=''){
        let res=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=res;
        total.style.background="green";

    }
    else{
        total.style.background="rgb(142, 39, 39)";
        total.innerHTML='';
    }
}


//create Product

let datepro;
let mood='create';
let temp;

if(localStorage.product!=null){
    datepro=JSON.parse(localStorage.product);
}
else{
    datepro=[];
}


create.onclick=function(){
let newpro={
title:title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase(),
}

if(title.value!=''&&price.value!=''&&category.value!=''){

    if(mood=='create'){
if(newpro.count>1){
    for (let i = 0; i < newpro.count; i++) {
    datepro.push(newpro);
    }
}
else{
datepro.push(newpro);
}
}
else{
    datepro[temp]=newpro;
    count.style.display='block';
    create.innerHTML='create';
    mood='create';

}

clearDate();
}
localStorage.setItem('product',JSON.stringify(datepro));




showDate();

}


//clearDate

function clearDate(){
title.value='';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

//read


function showDate(){

getTotal();

let table='';


for (let i = 0; i < datepro.length; i++) {

table+=`
<tr>

<td>${i+1}</td>
<td>${datepro[i].title}</td>
<td>${datepro[i].price}</td>
<td>${datepro[i].taxes}</td>
<td>${datepro[i].ads}</td>
<td>${datepro[i].discount}</td>
<td>${datepro[i].total}</td>
<td>${datepro[i].category}</td>

    <td> <button onclick="updateData(${i})" id="update">update</button></td>
    <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>


</tr>
`
}

document.getElementById("tbody").innerHTML=table;

let btnDel=document.getElementById("deleteAll");
if(datepro.length>0){
btnDel.innerHTML=`<button onclick="deleteAll()">Delete All (${datepro.length})</button>`
}
else{
btnDel.innerHTML='';
}


}

showDate()




//delete

function deleteData(i){

datepro.splice(i,1);

localStorage.product=JSON.stringify(datepro);
showDate()


}


function deleteAll(){
    localStorage.clear();
    datepro.splice(0);
    showDate();

}

//update

function updateData(i){
title.value=datepro[i].title;
price.value=datepro[i].price;
taxes.value=datepro[i].taxes;
ads.value=datepro[i].ads;
discount.value=datepro[i].discount;
category.value=datepro[i].category;
create.innerHTML='update';

getTotal();
count.style.display='none';

mood='update';
temp=i;
scroll({
    top:0,
    behavior: 'smooth',
})


}


//search
let searchMood='title';

function getSearch(id){
    let search=document.getElementById('search')

    if(id=='searchTitle'){
searchMood='title'; console.log(searchMood);

    }
    else{
searchMood='category';

    }
search.placeholder='search by '+searchMood;
    search.focus();
    search.value='';
    showDate();



}


function searchData(value){
let table='';
for (let i = 0; i < datepro.length; i++) {



    
        if(searchMood=='title'&&datepro[i].title.includes(value.toLowerCase())){
table+=`
<tr>

<td>${i}</td>
<td>${datepro[i].title}</td>
<td>${datepro[i].price}</td>
<td>${datepro[i].taxes}</td>
<td>${datepro[i].ads}</td>
<td>${datepro[i].discount}</td>
<td>${datepro[i].total}</td>
<td>${datepro[i].category}</td>

    <td> <button onclick="updateData(${i})" id="update">update</button></td>
    <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>


</tr>
`
        }


        
else{

        if(datepro[i].category.includes(value.toLowerCase())){
table+=`
<tr>
<td>${i}</td>
<td>${datepro[i].title}</td>
<td>${datepro[i].price}</td>
<td>${datepro[i].taxes}</td>
<td>${datepro[i].ads}</td>
<td>${datepro[i].discount}</td>
<td>${datepro[i].total}</td>
<td>${datepro[i].category}</td>

    <td> <button onclick="updateData(${i})" id="update">update</button></td>
    <td> <button onclick="deleteData(${i})" id="delete">delete</button></td>


</tr>
`

        }
        
    }


}

document.getElementById("tbody").innerHTML=table;

}

//cleandata


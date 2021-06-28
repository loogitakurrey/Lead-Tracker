

let myLeads = [];
let listItems = '';
const inputEl = document.getElementById('input-el');

const ulEl = document.getElementById('ul-el');

const deleteBtn = document.getElementById('delete-btn');

const tabEl = document.getElementById('tab-el');


const localLeads = JSON.parse(localStorage.getItem('myLeads'));

var inputBtn = document.getElementById('button-el');

inputBtn.addEventListener('click', function(){
	var input = inputEl.value;
	saveLeads(input);
});

tabEl.addEventListener('click', function(){

	chrome.tab.query({active: true, currentWindow: true},function(tabs){
		saveLeads(tabs[0].url);
		
	})
});


if(localLeads){
	myLeads = localLeads;
	renderLeads(myLeads);
}


function renderLeads(leads){
	var listitems = '';
	for(i=0; i<leads.length;i++){
		listitems += `<li><a href='${leads[i]}' target="_blank">${leads[i]}</a></li>`;
	}
	ulEl.innerHTML = listitems;
}

deleteBtn.addEventListener('dblclick',function(){
	if(localLeads){
		localStorage.clear();
		myLeads = [];
		renderLeads(myLeads);
	}
});

function saveLeads(leadsData){
	myLeads.push(leadsData);
	localStorage.setItem('myLeads',JSON.stringify(myLeads));
	inputEl.value = ''
	renderLeads(myLeads);
}

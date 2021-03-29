const functions = require('firebase-functions');
const express = require('express');
const app = express();
var data =require('./main.json');
app.set('view engine', 'ejs')



app.get('/technical/:index/:page', function (req, res) {
	var temp=req.params.index;
	function GetSortOrder(prop) {
		return function(a, b) {  
			if (a[prop] < b[prop]) {  
				return 1;  
			} else if (a[prop] > b[prop]) {  
				return -1;  
			}  
			return 0;
		}
	}
	data.sort(GetSortOrder('marks'));
	var current=[]
	for(var x=temp;x< data.length;x++){
		if(data[x]["s"]!==undefined){
			var str=data[x]["s"].toLowerCase().trim();
			if(str.includes("technical")||str.includes("computer")||str.includes("engineering")||str.includes("technology")){
				current.push(data[x]);
			}
		}
		if(current.length===20){
			temp=x+1;
			break;
		}
	}
	var c=0,t=temp;
	for(x=temp;x< data.length;x++){
		if(data[x]["s"]!==undefined){
			str=data[x]["s"].toLowerCase().trim();
			if(str.includes("technical")||str.includes("computer")||str.includes("engineering")||str.includes("technology")){
				c++;
			}
		}
		if(c===20){
			t=x+1;
			break;
		}
	}
	console.log(current[0])
	res.render('listing',{d:current,ch:req.params.index,nh:temp,nh2:t,cc:req.params.page});
//		res.type('json').send(JSON.stringify(current, null, 2) + '\n'+temp)
})
app.get('/*', function (req, res) {
	res.render('index');
})
exports.app = functions.https.onRequest(app);
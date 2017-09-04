/**
 * Do row major traversals take less time to traverse than column major traversals?
 * In lower-level languages like C: yes. 
 * Does it matter in javascript? 
 * Let's find out
 *
 * Running this code:
 * (nodejs): time node row-vs-col.js <row|col> <local|notlocal>		#Run row or column traversal (respectively)
 */

var dataset = [];
var odds = 0;

function load_data_set(){
	for(var i=0;i < 50000;i++){ dataset[i] = [1,2,3,4,5,6,7,8,9,10]; }
}

function row_major_traversal(){
	for(var row=0; row < 50000; row++){
		for(var col=0;col < 10; col++){
			if(dataset[row][col] % 2 != 0){
				++odds;
			}
		}
	}
}


function col_major_traversal(){
	for(var row=0; row < 50000; row++){
		for(var col=0;col < 10; col++){
			if(dataset[col][row] % 2 != 0){
				++odds;
			}
		}
	}
}

function local_row_major_traversal(){
	var my_odds = 0;
	for(var row=0; row < 50000; row++){
		for(var col=0;col < 10; col++){
			if(dataset[row][col] % 2 != 0){
				++my_odds;
			}
		}
	}
}


function local_col_major_traversal(){
	var my_odds = 0;
	for(var row=0; row < 50000; row++){
		for(var col=0;col < 10; col++){
			if(dataset[col][row] % 2 != 0){
				++my_odds;
			}
		}
	}
}

load_data_set();
var type = null, locality = 'non-local';
process.argv.forEach(function(val,index){
	switch(index){
		case 2:
			type = val;
			break;
		case 3:
			locality = val;
			break;
	}
});

if(type == 'row'){
	if(locality == 'local'){
		for(var i=0; i < 100;i++)
			local_row_major_traversal();
	}else{
		for(var i=0; i < 100;i++)
			row_major_traversal();
	}
}
if(type == 'col'){
	if(locality == 'local'){
		for(var i=0; i < 100;i++)
			local_col_major_traversal();
	}else{
		for(var i=0; i < 100;i++)
			col_major_traversal();
	}
}

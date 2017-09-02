/* 
 * Reference Material: Introduction To Algorithms (Third Edition) by Cormen, Leiserson, Rivest, Stein
 */

 /**
  * Goal: Compute the maximum sub-array of a given set of values
  */
 
 /**
  * Prerequisite: Suppose that you have been offered an opportunity to invest money in stock. You are allowed to buy
  * one unit of stock only one time and then sell it at a later date, buying and selling after the close of the trading
  * for the day. To compensate for this restriction, you are allowed to learn what the price of the stock will be in the 
  * future. Your goal is to maximize your profit. Of course, you want to "buy low, sell high". Unfortunately, you might
  * not be able to buy at the lowest price, or sell at the highest price for a given period.
  * At first glance, you may think that finding the lowest point and working right to the highest point will be the best
  * way to find the best buy times. Figure 1-A shows a counterexample 
  * 
  *     | 
  *     |/\
  * 120 |  \                 |\
  *     |   \  /\            | \
  *     |    \/  \    /``\   /  \
  *     |         \  /    \_/    \
  *     |          \/             \
  *  60 |__________________________\
  *     0     5    10    15   20 
  *
  * Day 	|0		1	 2	  ... 10 ... 20  ... 25
  * ________|__________________________________________________________
  * Price   |120   130  120   ... 70 ... 110 ... 60
  * Change  |	   +10  +23   ...-10 ... 30  ...-10
  *
  * Figure 1-A: The lowest point occurs in time after the highest point. Thus making a buy time in the future and a sell
  * time in the past. Currently it is completely impossible to buy in the future and sell in the past with the current laws of our universe.
  * 
  * 
  */


function find_max_crossing_subarray(A,low,mid,high){
	var left_sum = 0;
	var right_sum = 0;
	var sum = 0;
	var max_left = 0;
	var max_right = 0;
	for(var i=mid; i > low;i--){
		sum = sum + A[i];
		if(sum > left_sum){
			left_sum = sum;
			max_left = i;
		}
	}
	sum = 0;
	for(var i = mid +1; i < high; i++){
		sum = sum + A[i];
		if(sum > right_sum){
			right_sum = sum;
			max_right = i;
		}
	}
	return {
		'low':max_left,
		'high':max_right,
		'sum':left_sum+right_sum
	};
}

function find_maximum_subarray(A,low,high){
	if(parseInt(high) == parseInt(low)){ return {'low':low,'high':high,'sum':A[low]}; }
	var mid = parseInt((low + high) / 2);
	var left_section = find_maximum_subarray(A,low,mid);
	var right_section = find_maximum_subarray(A,mid+1,high);
	var crossing = find_max_crossing_subarray(A,low,mid,high);
	if(left_section.sum >= right_section.sum && left_section.sum >= crossing.sum){
		return {'low': left_section.low,'high':left_section.high,'sum':left_section.sum};
	}else if(right_section.sum >= left_section.sum && right_section.sum >= crossing.sum){
		return {'low': right_section.low,'high': right_section.high,'sum': right_section.sum};
	}else{
		return {'low': crossing.low,'high': crossing.high,'sum': crossing.sum};
	}
}

/* Example Usage:
var dataset = {
	changes: [13,-3,-25,20,-3,-16,-23,18,20,-7,12,-5,-22,15,-4,7]
};
console.log(find_maximum_subarray(dataset.changes,0,dataset.changes.length)); 
*/

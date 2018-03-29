/**
 * Author: William Merfalen
 * Case Study: Shopify's obfuscated javascript
 * License: WTFPL (https://wtfpl.net)
 * Script: cdn.shopify.com/s/assets/checkout-<arbitrary hexadecimal string>.js
 * 
 * [ Let's start this off with an honest disclaimer ]
 * I had no idea that some of these things were legal in javascript. 
 * 
 */


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/* [ ITEM 1 ] :: -> 'use strict' can be used at the top of functions         */
/* [[ Explanation ]] :: -> 'use strict' is commonly placed at the top of     */
/*                          scripts and it's wise to use it. But apparently, */
/*                          it can be applied to a function's scope in case  */
/*                          you didn't want to affect the surrounding code   */
/*                          with the ramifications of using 'use strict'.    */
/*                          The only real case where I can see this being    */
/*                          used is where you are one of many programmers    */
/*                          hacking on a js script and they modularized your */
/*                          code to being self contained within a single     */
/*                          function. The developers before you didn't use   */
/*                          the 'use strict' affector globally for whatever  */
/*                          reason. However, your code is good and modern,   */
/*                          you use it within your self-contained function   */
/*                          without disrupting the ecosystem of the legacy   */
/*                          software.                                        */
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
(function(name){
   'use strict'
	/* Always had the close-minded notion 
	 * that you could only use this at the 
	 * top of scripts and not function scopes.
 	*/
	console.log(['hello',name].join(' '));
})('William');

/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/* [ ITEM 2 ] :: -> if(key in some_object)                                   */
/* [[ Explanation ]] :: -> You can reach into an object and see if a key     */
/*                         exists within it. if('foo' in {foo: 'bar'})       */
/*                         This code will evaluate to true.                  */
/*                         The very verbose way I used to do it:             */
/*                         if(some_object.hasOwnProperty('foo'))             */
/* See -> https://stackoverflow.com/questions/11040472/how-to-check-if-object-property-exists-with-a-variable-holding-the-property-name#comment14441170_11040508 */
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
var msg = (function(m){
	'use strict'
	if('row' in m) console.log('row is in m')	/* note lack of semicolon */
})({'row': ['foo','bar','fiz','fuz']});


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/* [ ITEM 3 ] :: -> Chained initialization and creative use of &&            */
/* [[ Explanation ]] :: -> You can chain initializations with comma. I think */
/*                         most of us already knew that. Spotify's js uses it*/
/*                         along with conditional execution at the end of it.*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
(function(m){
	m = {o : 'l'},
	f = 2.5,
	r = [],
	m.o === 'l' && console.log('this will print')
})({msg: 'hi'});
/**
 * My professors would have /killed/ me if I coded js like this. 
 * They were so straight-edge. Here's how the above closure would 
 * have to have been formatted were it to be turned in as a college assignment
 * (atleast at the college I went to)
 */
function main(m){
	m = {o: 'l'};
	f = 2.5;
	r = [];
	if(m.o === 'l'){
		console.log('this will print');
	}
}
main({msg: 'hi'});
/**
 * And there's nothing wrong with that. I look at that code and I can read it. 
 * It has it's value in that anyone can write code like that and 10 years down
 * the line the next coder who has to maintain this software can read that.
 * The variable names suck though.
 */


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/* [ ITEM 4 ] :: -> Unique looking return statements                         */
/* [[ Explanation ]] :: -> This stuck out to me just because it _looked cool_*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
ret = (function(){
	var fib = [1,1,2,3,5];
	return fib.forEach(function(element){
		/* Do some calculations */
		if('ctr' in this) ++this.ctr
		else this.ctr = 0
		console.log('fibonacci step [' + this.ctr + ']: ' + element);
	}),
	{
		foo: 'bar'
	}
})();
console.log(ret);	/** What does this print? */

/*
 * [[ Answer ]] :: -> { foo: 'bar' } 
 * [[ Explanation ]] :: -> Apparently the return value of .forEach is ignored
 */

/**
 * What if we returned multiple objects separated by comma? 
 * What then?
 */
ret = (function(){
	return {name: 'slime shady'},{name: 'nikola'}	// no semicolon -- I'm so hipster!
})();
console.log(ret);	/** Guess what this prints... */
/**
 * [[ Answer ]] :: -> {name: 'nikola'}
 * [[ Explanation ]] :: -> So the first value is completely ignored... meaning
 *                         we can stuff arbitrary statements after the return
 *                         separated by a comma and leave the very last object
 *                         as our return value. 
 */


/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
/* [ ITEM 5 ] :: -> Shorthand way of using true and false                    */
/* [[ Explanation ]] :: -> This stuck out to me just because it _looked cool_*/
/*-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
(function(value){
	console.log(value);	/** what does this print? */
})(!0);
/** [[ Answer ]] :: -> true */
/** Yeah. I know. So elite. 
 * The same can be done with !1
 */

console.log(
	(function(){ 
		return void 'bar'
	})()
);	/** What does this print? */

/** [[ Answer ]] :: -> undefined */
/** So I guess you can pretty much eliminate
 * a return value and always return undefined.
 * The obfuscation program (or my just the original coder)
 * REALLY likes using return. 
 * But the benefit here is the same pattern that we've seen
 * over and over throughout the spotify source code: concise and expressive.
 *
 * Take for example this code snippet: 
 * if (this.countryCode = m(), !h(this.countryCode)) return void (this.comboBox && this.comboBox.clearList());
 * 
 * The coder combines multiple expressions int the if statement (something i rarely seen done)
 * They return undefined and at the same time abuse the && operator to conditionall execute
 * this.comboBox.clearList() all on one line. It's concise, expressive, and eye opening.
 *
 */

/* Queue up some items to run at a specific point. 
 * This is just a wrapper to setTimeout
 */
var queue = {
    /* @param callback function is a closure that will be called. 
     * @param time int the time in miliseconds IN ADDITION to the previous queue item
     * @param group string if set, will set the group name that this function applies under. See usage for details
     * usage:
     *  queue.push(function(){ console.log('this is our first message 100 miliseconds AFTER run is called');},100);
     *  queue.push(function(){ console.log('this is our second message 300 miliseconds AFTER run is called');},200);
     *  queue.run();  //Run the functions. at 100ms first func is called, at 300ms 2nd func is called
     *
     *  //Using function groups:
     *  //Maybe you want to group all functions according to a certain name
     *  queue.push(function(){ location.href= 'http://www.google.com/'; },5000,'success');
     *  queue.push(function(){ console.log("so sorry bro..."); },500,'fail');
     *  queue.push(function(){ location.href= 'http://www.bing.com/'; },1000,'fail');
     *  //Maybe you want to do some ajax calls to grab a result
     *  $.ajax('/user',{'get_search':true}).done(function(msg){ 
     *    var obj = $.parseJSON(msg);
     *    if(obj.fail){
     *       queue.run('fail');
     *    }else{
     *       queue.run('success');
     *    }
     *   });
     *
     *  
     */
    
    push: function(callback,time,group){
        this.queue.push({'callback': callback,'time': time,'group': group});
    },
    queue: [],
    /* Run the queue items */
    run: function(){
        var my_time = 0;
        for(var i in this.queue){
            window.setTimeout(this.queue[i].callback,this.queue[i].time);
            my_time += this.queue[i].time;
        }
    }
};

/* Closure object 
 * usage:
 * 
 * //This is poor programming practice! DO NOT use a while until an item is defined! This is merely for
 * //an example!
 *
 * closure.while(function(){ return typeof Foobar.item == 'undefined'; });
 *
 *
 */
var closure = {
    while: function(callback){
        function anonymous_callback(){
            if(callback()){
                window.setTimeout(anonymous_callback,300);
            }
        }
    }
};
function foo(){
    closure.while(function(){ return typeof window.AgentFindUser == 'undefined'; });
}

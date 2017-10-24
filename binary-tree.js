var tree = (function(){
function tree(){

};

tree.prototype = { 
btree: function(root){
        return {
            'node': root,
            'left': null,
            'right': null, 
        };  
    },  
    btree_left: function(tree,node){
        tree.left = this.btree(node);
    },  
    btree_right: function(tree,node){
        tree.right = this.btree(node);
    },  
    decide: function(event_type,tree){
        var traverse = true;
        var direction = 'left';
        for(var i = tree; i; i = i[direction]){
            switch(direction = i.node(event_type)){
                case 'left': case 'right': continue;
                default:    /* purposeful fall-through behaviour */
                case 'abort': return null;
                case 'decision-made': return direction;
            }   
        }   
    }   
};
return tree;
})();
if(typeof module !== 'undefined'){
    module.exports = tree;
}
if(typeof window !== 'undefined'){
    window.btree = new tree();
}

/****************************
Something better for OpenSet for A*
*/
function PathNodeSet(length){
	
	var i;
	
	this.heapIndex=new Array(length);
	for (i=0;i<length;i++) this.heapIndex[i] = -1;

	this.parents = new Array(length);
	for (i=0;i<length;i++) this.parents[i] = -2;
	
	this.fcosts = new Array(length);
	for (i=0;i<length;i++) this.fcosts[i] = -1.0;
	
	this.gcosts = new Array(length);
	for (i=0;i<length;i++) this.gcosts[i] = -1.0;

	this.heap = new Array(length);
	for (i=0;i<length;i++) this.heap[i] = -1;	
	
	this.heapLength = 0;
	
	this.isClosed = isClosed;
	function isClosed(value){
		return (this.heapIndex[value] !== -1);
	}
	
	this.push = push;
	function push(graphIndex,parentIndex,fcost,gcost){
		if (this.heapIndex[graphIndex] === -1){
			this.parents[graphIndex] = parentIndex;
			this.fcosts[graphIndex] = fcost;
			this.gcosts[graphIndex] = gcost;
		
			this.heapLength ++;
			this.heap[this.heapLength] = graphIndex;
		
			var k = this.heapLength;
			this.heapIndex[graphIndex] = k;
			
			while((k>1) && (fcost<=this.fcosts[this.heap[k >> 1]])){
				this.heap[k] ^= this.heap[k >> 1];
				this.heap[k >> 1] ^= this.heap[k];
				this.heap[k] ^= this.heap[k >> 1];
				this.heapIndex[this.heap[k]] ^= this.heapIndex[this.heap[k >> 1]];
				this.heapIndex[this.heap[k >> 1]] ^= this.heapIndex[this.heap[k]];
				this.heapIndex[this.heap[k]] ^= this.heapIndex[this.heap[k >> 1]];
//			this.swap(k,k >>> 1);
				k >>= 1;
			}
		
			
		}
	}
	
	this.pop = pop; //Returns the graphindex, and removes the node from heap, but not the array.
	function pop(){
		
		this.heapIndex[this.heap[this.heapLength]] = 1;
		this.heapIndex[this.heap[1]] = 0;
		if (this.heapLength > 1){
		this.heap[1] ^= this.heap[this.heapLength];
		this.heap[this.heapLength] ^= this.heap[1];
		this.heap[1] ^= this.heap[this.heapLength];	
				
		var u,v;
		v = 1;
		
		while(1){
			u = v;
			//select v
			if (((u << 1) | 1) <= this.heapLength) {
				if(this.fcosts[this.heap[u]]>=this.fcosts[this.heap[u << 1]]) v=u << 1;
				if(this.fcosts[this.heap[v]]>=this.fcosts[this.heap[(u << 1) | 1]]) v=(u << 1) | 1;
			} else if (u << 1 < this.heapLength){
				if(this.fcosts[this.heap[u]]>=this.fcosts[this.heap[u << 1]]) v=u << 1;
			}
			//swap u and v
			if (u!==v){
				this.heap[u] ^= this.heap[v];
				this.heap[v] ^= this.heap[u];
				this.heap[u] ^= this.heap[v];
				this.heapIndex[this.heap[u]] ^= this.heapIndex[this.heap[v]];
				this.heapIndex[this.heap[v]] ^= this.heapIndex[this.heap[u]];
				this.heapIndex[this.heap[u]] ^= this.heapIndex[this.heap[v]];
	//			this.swap(u,v);
			} else break;
		}
		}
		this.heapLength--;
		return this.heap[this.heapLength+1];
	}
}

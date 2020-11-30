import pic from '@//static/FLAMING MOUNTAIN.JPG'
import piccss from '@/pic.css'
function vv(){
	const arr = [1,2];
	const cc = {a:1,b:1};
	console.log(cc?.a, Promise.allSettled)
	arr.map(x=>{
		console.log('hellowebpack'+x+1);
	})
	const dom = document.createElement('img');
	dom.src = pic;
	dom.style = piccss;
	document.body.appendChild(dom)
}
vv()


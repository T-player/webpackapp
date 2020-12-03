// import pic from '@//static/FLAMING MOUNTAIN.JPG'
import '@/pic.css'
import n,{getNum,test} from '@/ts'
import {join} from 'lodash'
function vv(){
	const arr = [1,3];
	const cc = {a:1,b:1};
	console.log(cc?.a, Promise.allSettled)
	console.log(getNum('1'));
	const t = new test(1)
	console.log(t.val,join(['Hello', 'webpack'], ' '))
	const dom = document.createElement('div');
	document.body.appendChild(dom);
}
vv();


import {sayHello} from "./modules/greet";

function showHello(divName: string, name: string) {
	console.log(sayHello(name));
}

showHello("greeting", "TypeScript");
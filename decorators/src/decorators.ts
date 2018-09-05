interface description {
  configurable?: boolean,
  writable?: boolean,
  enumerable?: boolean,
  value?: any,
  set?: Function | undefined,
  get?: Function  | undefined
}

interface factoryDesc {
	name: string, 
	age: number,  
	compony: string
	[propName: string]: string | number | undefined
}

const factory: factoryDesc = {
	name: 'bodhi',
	age: 25,
	compony: 'Azoya'	
}

function log (target: Function | Object, key: string, desc: description) : any {
	const originalFunc = desc.value

	originalFunc.value = function (...args: any[]) {
		console.log(`to be run ${key} method`)
		originalFunc.apply(this, args)	
	}

	return desc
}

function readonly(target: Function | Object, key: string) : any {
	let _value: number = 0

	return {
		set: function(newVal: number) {
			if(!_value){
				_value = newVal
			} else {
				console.log(`property ${key} is readonly`)
			}
		},
		get: function(){
			return _value
		}
	}
}

function inject(...args: any[]){
	return function injectHandler(target: Function | Object, key: string): any  {
		let _value: string | number = args.length === 0 ? factory[key] : args.join()

		return {
			get() {
				return _value
			},
			set(newValue: string){
				_value = newValue
			}
		}
	}
} 

function enity(Parent: Function){
	return function (target: any){
		let noop: any = function(){}
		Parent.call(target)
		noop.prototype = Parent.prototype
		target.prototype.__proto__ = new noop()
		return target
	}
}


export {log, readonly, inject, enity}
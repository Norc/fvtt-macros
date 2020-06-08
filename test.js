let str = '2d6 + 2 + 2d6 + 2'
let rageDmg = '2';
let patt = `\\s\\+\\s${rageDmg}($|[^0123456789dkrxcm(@{})])`;
console.log(`${patt}`);
//var patt = /\s\+\s2($|[^0123456789dkrxcm(@{})])/ig;
let result = str.search(patt);
console.log(result);
if (result !== -1) {
    var len = rageDmg.length;
    str = str.substring(0,result) + str.substring(result+3+len);	
}
console.log(`${str}`);
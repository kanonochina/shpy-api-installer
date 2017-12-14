




var x = {
    products: {
        id: "12345",
        name: "this is name",
        image: "imagepath",
        obj: {
            id: "43234",
            name: "name is"
        }
    }
}





function removeObjects([toremove], json) {
console.log(toremove.length);
    for (let i = 1; i < toremove.length; i++) {
        
        let strngit = JSON.stringify(json);
        // var rplaced = strngit.replace(/'"' + toremove + '"'\s*:\s*"(.+?)"(,|\s)/g, "");
        var replace = '"' + toremove + '"\s*:\s*"(.+?)"(,|\s)';
        var re = new RegExp(replace,"g");
        var rplaced = strngit.replace(re, "");
        console.log(JSON.parse(rplaced));
        console.log(rplaced);
        
    }        
   
}

removeObjects(["id"], x.products);
let fname = "Piyush";
// Cannot [redeclare] blcok-scoped variable 'fname'

function sayName() {
    // fname exists in the scope of this function
    // let fname = "Hitesh";
    // Inside the lexical scope of this function there is fname
    let lname = "Garg";
    console.log(`In sayName`, fname);

    function inner() {
        // Inside the lexical scope of this function there is fname and lname
        console.log(`Fname is`, fname, `Lname is`, lname);
        return;
    }
    inner();
}

console.log("Value of Fname is ", fname);
sayName();

function valid() {

    let fname = document.regform.fname;
    let sname = document.regform.sname;
    let email = document.regform.email;
    let dob = document.regform.dob;
    let sex = document.regform.gender;

    //validation
    fname_v(fname);
    sname_v(sname);
    email_v(email);
    dob_v(dob);
    sex_v(sex);
    skills_v();

    if(total == 6) {
        return true;
    }
    else {
        console.log(errors.length);
        for(let i=0; i < errors.length; i++) {
            let newli = document.getElementById('err1');
            newli.insertAdjacentHTML('afterbegin', `<li id="err${i}">${errors[i]}</li> `);
            
        }
    }
}

let errors = [];
let total = 0;


function fname_v(firstname) {
    if (firstname.value.length > 0) {
        total++;
        //return true;
    }
    else {
        errors.push(`${document.getElementById('fname').textContent} field is empty`)
        //return false;
    }
}

function sname_v(secondname) {
    if (secondname.value.length > 0) {
        total++;
        //return true;
    }
    else {
        errors.push(`${document.getElementById('sname').textContent} field is empty`)
        //return false;
    }
}

function email_v(mail) {
    if(mail.value.length > 0) {
        total++
        //return true;
    }
    else {
        errors.push(`${document.getElementById('email').textContent} field is empty`)
        //return false;
    }
}

function dob_v(dateofbirth) {
    console.log(dateofbirth);
    if(dateofbirth != undefined) {
        let dobsplit = dateofbirth.value.split('-');

        let dofb = new Date();
        dofb.setFullYear(dobsplit[0], dobsplit[1] - 1, dobsplit[2]);
        dofb.setHours(0);
        dofb.setMinutes(0);
        dofb.setSeconds(0);

        let now = new Date();
        now.setFullYear(now.getFullYear() - 18);

        if(dofb <= now) {
            total++;
            //return true;
        }
        else {
            errors.push(`less then 18 yo`);
            //return false;
        }
    }
    else {
        errors.push(`${document.getElementById('dob').textContent} not filled`)
        //return false;
    }
}

function sex_v(gen) {
    if(gen.value == '') {
        errors.push(`Choose at least one option at ${document.getElementById('sex').textContent} field`)
        //return false;
    }
    else {
        total++;
        //return true;
    }
}

function skills_v() {
    if(document.querySelectorAll("input[name='skills']:checked").length >= 3) {
        total++;
        //return true;
    }
    else {
        errors.push(`Must be chosen at least 3 ${document.getElementById('skills').textContent}`)
       // return false;
    }
}


// ................................................................................................................
// firebase check krlo k chal raha hai ya nai
// console.log(firebase)
// ................................................................................................................

var list = document.getElementById("list");

// ................................................................................................................
firebase.database().ref('todos').on('child_added', function (data) {
    console.log(data.val())

      // ab input ki value mujhe list main daalni hai tu maine html maine empty (li) banaya aur uski id list k naam se banadi aur list ko target krliya java main sno:4 pr check kr skty hain....

//  li text start............................
    
// ab js main (li) ko create kary gay phr....js main li ka tag is liye create kr rahe hain q k mujhe (li) chaheye aur mujhe 
    // nai pata k user kitna input add karay gaa tu (li) is liye java main create kiya taky jitny chaye (li) main naam likh skty hain
    var li = document.createElement('li') 

    // aur (li) ka tag js k through bana tu liya ab  hume text bhi add krna hai tu main text bhi create karoga...
    var liText = document.createTextNode(data.val().value);

    // phr ab (li) ko text k ander insert bhi tu krna hai wo appendChild se hoga mtlb (li) k ander (text) ko insert krdo...
    li.appendChild(liText)

//  li text end............................

    // delete button start........................

    // ab delete button create krna hai mujhe wo main javascript main he button banaoga
    // ye maine button create krliya
    var delBtn = document.createElement("button")
   
    // ab mujhe delete button main text create krna hai wo main same ussi tarha karo ga jse maine (li) k ander text create kiya tha
    var delText = document.createTextNode("DELETE")

    // set attribute 
    delBtn.setAttribute("class", "delete_button")
    
    delBtn.setAttribute('id', data.val().key)
    
    // ab main delete button pr onclick laga dyta hn k jb main deletebutton click karo tu wo cheez delete hojaye aur ye onclick
    // event main set setAttribute main he lagaoga...
    delBtn.setAttribute("onclick", "deleteItem(this)")



    // ab delete button may main daal donga delete text 
    delBtn.appendChild(delText)

    // ab delete button ko li k ander bhi insert krna hai 
    li.appendChild(delBtn)
    
    // delete button end........................

    // create edit button start.................
   
    var editBtn = document.createElement("Button")
    var editText = document.createTextNode("EDIT")
     editBtn.appendChild(editText)
    li.appendChild(editBtn)
    editBtn.setAttribute("onclick", "editItem(this)")
     editBtn.setAttribute('id', data.val().key)


    // create edit button end.................


    
    // phr maine (li)ko list main daal diya (li) main kya tha text node tha jisko maine ab list main daal diya
    list.appendChild(li);
    
})
// ................................................................................................................

// add item ka function banyga addtodo k naam se q k html main maine add item ka jo button banaya hai uska naam addtodo rakha hai 
// is liye main sb se phele addtodo ka fuction banaoga aur us function main INPUT add kar donga.....
function addtodo() {
    var todo_submit = document.getElementById("submit");
    // console.log(todo_submit.value)

// ................................................................................................................
// realtime database main daalny ka tareeka...............
    
    //  bar bar database likhny k bajye us ko variable main daal do
    var database = firebase.database().ref('todos')

    // tu ab hum apny input ko database main keys k throug bhejay gay
    var key = database.push().key;
    // console.log(key)

    var todo = {
        value: todo_submit.value,
        key: key
    }
    database.child(key).set(todo);

    
    
    
    // aur jb main input type karo aur add item karo tu mera search bar empty hojaye tu main ye code lagao ga
    todo_submit.value = ""
   
}
// ................................................................................................................

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function editItem(e) {
    // e.parentNode.firstChild.nodeValue = "fahad"
    // console.log(e.parentNode.firstChild)
    var val =prompt("enter update value", e.parentNode.firstChild.nodeValue)

    var editTodo = {
        value: val,
        key: e.id
   } 
    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;
}

function deleteAll() {
 list.innerHTML = ""
}
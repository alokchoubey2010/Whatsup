const firebaseConfig = {
  apiKey: "AIzaSyBtNChab23CAv6HmiJnMmyKb5ALQSOIn4s",
  authDomain: "group-chat-neuron-nerds.firebaseapp.com",
  databaseURL: "https://group-chat-neuron-nerds-default-rtdb.firebaseio.com",
  projectId: "group-chat-neuron-nerds",
  storageBucket: "group-chat-neuron-nerds.appspot.com",
  messagingSenderId: "900309631047",
  appId: "1:900309631047:web:583c5dce923fd4d43ff162"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function showCreateRoomForm(){
  // window.location.assign("./chat.html?action=create-room")
  confirm = confirm(`Do you want to create a room with ${localStorage.getItem("selectedContact")}?`)
  if(confirm){
    alert(`Room already exists !`)
  }else{
    alert("Operation cancelled by User!")
  }
}

document.querySelector(".inputMessage").addEventListener("input", () => {
  document.querySelector(".send").style.display = "block";
})

function sendMessage(){
  input = document.querySelector(".inputMessage");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      msg = input.value;
      sender = user.displayName;
      time = new Date();
      displaySend(msg);
      addMessageToFirebase(msg,sender,time)
    } else {
      alert(`An authentication error has occured make sure you are signed in!`)
    }
  });
}

document.querySelector(".name").innerHTML = localStorage.getItem("selectedContact");

function addMessageToFirebase(msg,sender,time) {
  database = firebase.database();
  currentRoom = localStorage.getItem("currentRoom");
  database.ref(`rooms/${currentRoom}`).set({
    message: msg,
    sender: sender,
    time: time
  });
}

function displaySend(msg){
  div = document.createElement("div");
  chatBox = document.querySelector(".chatBox");
  div.className = 'holder';
  p = document.createElement("p");
  p.className = "sent";
  p.innerHTML = msg;
  div.appendChild(p);
  chatBox.appendChild(div);
}
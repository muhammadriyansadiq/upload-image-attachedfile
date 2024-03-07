import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {  getStorage, ref ,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6eGSzNrNN72kPyNFbu-XwP0MuIRD9GAk",
    authDomain: "initialfirebaseproject-3adc9.firebaseapp.com",
    projectId: "initialfirebaseproject-3adc9",
    storageBucket: "initialfirebaseproject-3adc9.appspot.com",
    messagingSenderId: "174496080322",
    appId: "1:174496080322:web:152fd59a082abac01ab65b"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage();

 let url;

const uploadToStorage = async (file) => {
    return new Promise((resolve , reject) => {
      const fileName = file.name;
      const storageRef = ref(storage, "us/12kj45iu76yt");
      const uploadTask = uploadBytesResumable(storageRef, file);//
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
    
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
          
        (error) => {
          console.log(error.message)
          console.log(error.code)
          reject(error);
        },
    
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          });
        }
      );
    });
    }


    const uploadFile = async () => {
      const file = document.querySelector("#inputGroupFile02");
      const showImage = document.querySelector("#img");
      console.log(file.files[0]);// get from (input type file) file.files[0]
     url = await uploadToStorage(file.files[0]);//call function
      console.log("url: " + url);
      console.log(typeof(url));
      localStorage.setItem("Image" ,(url));
      showImage.classList.add("showImg")
      // urlfunction()
    } 

    const uploadBtn = document.querySelector("#uploadBtn");

    if (uploadBtn) {

      uploadBtn.addEventListener("click",uploadFile)  

    } 
    // DISPLAY REAL TIME UPLOADED IMAGE 
     const file = document.querySelector("#inputGroupFile02");
     if(file){
      file.addEventListener("change" , e => {
        const imageTarget = document.querySelector("#img");
        if(imageTarget){
            console.log(e.target.files[0],"url", URL.createObjectURL(e.target.files[0]));// to convert in url form
          imageTarget.src = URL.createObjectURL(e.target.files[0])
        }
      })
     }

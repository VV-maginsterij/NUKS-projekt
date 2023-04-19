import { useState } from 'react';
import './App.css';

export default function App() {
  const [page, setPageValue] = useState(1)
  const [userId, setUserId] = useState(0)
  
  if (page == 1){ 
    return (<FormComponent setPageValue={setPageValue} setUserId={setUserId}/>)
  } else if (page == 2){
    return(<Navbar setPageValue={setPageValue}/>)
  } else if (page == 3){
    return(<FormComponentProfil setPageValue={setPageValue} UserId={userId} setUserId={setUserId}/>)
  } else {
    return (<FormComponentCreate setPageValue={setPageValue} setUserId={setUserId}/>)
  }
}

function FormComponent ({ setPageValue, setUserId }){
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    fetch('http://localhost:8000/user/{uname, pword}?uname=' + formJson.username + '&pword=' + formJson.geslo)
    .then(response => response.json())
    .then(data => {
      if (data){
        setPageValue(2)
        setUserId(data)
      }
     })
    .catch(error => {
    
      console.error(error);
    });
  }

  function handleCreate(){
      setPageValue(4)
  }
    
  return (
    <>
    <form action="INDEX/index.php" onSubmit={handleSubmit}>
      <p><input type="text" name="username" placeholder="Uporabniško ime"/></p>
      <p><input type="password" name="geslo" placeholder="Geslo"/></p>
      <p><input id="prijava" type="submit" value="PRIJAVA"/></p>
    </form>
    <button onClick={handleCreate}>DODAJ NOV PROFIL</button>
    </>
    )
}

function Navbar({setPageValue}) {
  function handleProfil(){
    setPageValue(3)
  }
  function handleOdjava(){
    setPageValue(1)
  }
  return (
    <nav>
      <ul>
        <li>
          <button onClick={handleProfil}>Urejanje profila</button>
        </li>
        <li>
          <button onClick={handleOdjava}>Odjava</button>
        </li>
      </ul>
    </nav>
  );
}

function FormComponentProfil ({ setPageValue, UserId, setUserId}){
  const [reload, setValue] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    
    
    var flag = false
    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    
    if (formJson.username != ""){
      fetch('http://localhost:8000/update/user/'+ UserId + '?field=upime&newval=' + formJson.username, {method:'PUT'})
      .then(response => response.json())
      .then(data => {
        flag=true
      })
      .catch(error => {
    
        console.error(error);
       });
    }
    
    if (formJson.mail != ""){
      fetch('http://localhost:8000/update/user/'+ UserId + '?field=enaslov&newval=' + formJson.mail, {method:'PUT'})
      .then(response => response.json())
      .then(data => {
        flag=true
      })
      .catch(error => {
    
        console.error(error);
       });
    }

    if (formJson.geslo != ""){
      fetch('http://localhost:8000/update/user/'+ UserId + '?field=geslo&newval=' + formJson.geslo, {method:'PUT'})
      .then(response => response.json())
      .then(data => {
        flag=true
      })
      .catch(error => {
    
        console.error(error);
       });
    }

    if (flag){
      return () => setValue(!reload)
    }
    
  }

  function handleDelete(){
    fetch('http://localhost:8000/user/delete/' + UserId, {method:'DELETE'})
    .then(response => response.json())
    .then(data => {
      setPageValue(1)
      setUserId(0)
    })
    .catch(error => {
  
      console.error(error);
     });
  }
    
  return (
    <>
    <form action="INDEX/index.php" onSubmit={handleSubmit}>
      <p>Novo uporabniško ime: <input type="text" name="username" placeholder="Uporabniško ime"/></p>
      <p>Nov elektronski naslov: <input type="text" name="mail" placeholder="Uporabniško ime"/></p>
      <p>Novo geslo: <input type="password" name="geslo" placeholder="Geslo"/></p>
      <p><input id="prijava" type="submit" value="SPREMENI PODATKE"/></p>
    </form>
    <button onClick={handleDelete}>IZBRIŠI PROFIL</button>
    </>
    )
}

function FormComponentCreate ({ setPageValue, setUserId }){
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const data = {
      upime:formJson.username,
      geslo:formJson.geslo,
      enaslov:formJson.mail
    }

    fetch('http://localhost:8000/user/add', {method: 'POST', headers: {'Content-type': 'application/json'},body: JSON.stringify(data)})
    .then(response => response.json())
    .then(data => {
      if (data){
        setPageValue(2)
        setUserId(data)
      }
     })
    .catch(error => {
    
      console.error(error);
    });
  }
    
  return (
    <form action="INDEX/index.php" onSubmit={handleSubmit}>
      <p>Uporabniško ime: <input type="text" name="username" placeholder="Uporabniško ime"/></p>
      <p>Elektronski naslov: <input type="text" name="mail" placeholder="Uporabniško ime"/></p>
      <p>Geslo: <input type="password" name="geslo" placeholder="Geslo"/></p>
      <p><input id="prijava" type="submit" value="USTVARI PROFIL"/></p>
    </form>
    )
}
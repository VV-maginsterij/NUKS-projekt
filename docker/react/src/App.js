import { useState, useEffect, useRef } from 'react';
import './App.css';

const ip = `http://${window.location.host}`


export default function App() {
  const [page, setPageValue] = useState(1)
  const [userId, setUserId] = useState(0)
  
  if (page == 1){ 
    return (<FormComponent setPageValue={setPageValue} setUserId={setUserId}/>)
  } else if (page == 2){
    return(<Navbar setPageValue={setPageValue} UserId={userId}/>)
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

    fetch(ip + ':8000/user/{uname, pword}?uname=' + formJson.username + '&pword=' + formJson.geslo)
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

function Navbar({setPageValue, UserId}) {
  const [listData, setListData] = useState([]);


  const S1 = useRef(null);
  const S2 = useRef(null);
  const S3 = useRef(null);
  const S4 = useRef(null);
  const S5 = useRef(null);
  const S6 = useRef(null);
  const D1 = useRef(null);
  const D2 = useRef(null);
  const D3 = useRef(null);
  const D4 = useRef(null);
  const D5 = useRef(null);
  const D6 = useRef(null);

  const dolzina = [D1, D2, D3, D4, D5, D6]
  const sirina = [S1, S2, S3, S4, S5, S6]

  function handleProfil(){
    setPageValue(3)
  }
  function handleOdjava(){
    setPageValue(1)
  }

  function deleteMap(mapId){
    console.log(mapId)
    fetch(ip + ':8000/map/delete/' + mapId, {method:'DELETE'})
    .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
  
      console.error(error);
     });
  }

  function loadMap(mapId){
    
  
 
    fetch(ip + ':8000/map/' + mapId)
      .then((response) => response.json())
      .then((data) => {
        var tmp;
        for (let i = 0; i < data.length; i++){
          dolzina[i].current.value = data[i].dolzina
          sirina[i].current.value = data[i].sirina
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetch(ip + ':8000/map/list' + UserId)
      .then((response) => response.json())
      .then((data) => {
        var tmp;
        for (let i = 0; i < data.length; i++){
          tmp = (data[i].filename.split("."))[0]
          data[i].filename = tmp
        }
        setListData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [UserId]);

  function saveMap(){
    var data = [{"dolzina":D1.current.value, "sirina":S1.current.value},{"dolzina":D2.current.value, "sirina":S2.current.value},{"dolzina":D3.current.value, "sirina":S3.current.value},{"dolzina":D4.current.value, "sirina":S4.current.value},{"dolzina":D5.current.value, "sirina":S5.current.value},{"dolzina":D6.current.value, "sirina":S6.current.value}]
    const filedata= JSON.stringify(data)
    
    fetch(ip + ':8000/map/add?id='+UserId, {method: 'POST', body: filedata})
    .then(response => response.json())
    .then(data => {
      if (data){
      
      }
     })
    .catch(error => {
    
      console.error(error);
    });
  }
  function clearText(){
    for(let i = 0; i < dolzina.length; i++){
      dolzina[i].current.value = ""
      sirina[i].current.value = ""
    }
  }
  return (
    <>
    <section>
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
    </section>
    <section>
      <div>
        <p>Shranjene poti:</p>
        <ul>
          {listData.map((item) => (
            <li><button onClick={() => loadMap(item.id)}>{item.filename}</button><button onClick={() => deleteMap(item.id)}>IZBRIŠI</button></li>
          ))}
        </ul>
      </div>
    </section>
    <section>
      <table>
        <tr>
          <th>Točka</th>
          <th>Zemljepisna širina</th>
          <th>Zemljepisna dolžina</th>
        </tr>
        <tr>
          <td>1</td>
          <td><textarea ref={S1} rows="1"></textarea></td>
          <td><textarea ref={D1} rows="1"></textarea></td>
        </tr>
        <tr>
          <td>2</td>
          <td><textarea ref={S2} rows="1"></textarea></td>
          <td><textarea ref={D2} rows="1"></textarea></td>
        </tr>
        <tr>
          <td>3</td>
          <td><textarea ref={S3} rows="1"></textarea></td>
          <td><textarea ref={D3} rows="1"></textarea></td>
        </tr>
        <tr>
          <td>4</td>
          <td><textarea ref={S4} rows="1"></textarea></td>
          <td><textarea ref={D4} rows="1"></textarea></td>
        </tr>
        <tr>
          <td>5</td>
          <td><textarea ref={S5} rows="1"></textarea></td>
          <td><textarea ref={D5} rows="1"></textarea></td>
        </tr>
        <tr>
          <td>6</td>
          <td><textarea ref={S6} rows="1"></textarea></td>
          <td><textarea ref={D6} rows="1"></textarea></td>
        </tr>
      </table>
      <div><button onClick={saveMap}>SHRANI</button><button onClick={clearText}>POČISTI</button></div>
    </section>
    </>
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
      fetch(ip + ':8000/update/user/'+ UserId + '?field=upime&newval=' + formJson.username, {method:'PUT'})
      .then(response => response.json())
      .then(data => {
        flag=true
      })
      .catch(error => {
    
        console.error(error);
       });
    }
    
    if (formJson.mail != ""){
      fetch(ip + ':8000/update/user/'+ UserId + '?field=enaslov&newval=' + formJson.mail, {method:'PUT'})
      .then(response => response.json())
      .then(data => {
        flag=true
      })
      .catch(error => {
    
        console.error(error);
       });
    }

    if (formJson.geslo != ""){
      fetch(ip + ':8000/update/user/'+ UserId + '?field=geslo&newval=' + formJson.geslo, {method:'PUT'})
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
    fetch(ip + ':8000/user/delete/' + UserId, {method:'DELETE'})
    .then(response => response.json())
    .then(data => {
      setPageValue(1)
      setUserId(0)
    })
    .catch(error => {
  
      console.error(error);
     });
  }

  function handleReturn(){
      setPageValue(2)
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
    <button onClick={handleReturn}>NAZAJ</button>
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

    fetch(ip + ':8000/user/add', {method: 'POST', headers: {'Content-type': 'application/json'},body: JSON.stringify(data)})
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
  function handleReturn(){
    setPageValue(1)
}
  return (
    <>
    <form action="INDEX/index.php" onSubmit={handleSubmit}>
      <p>Uporabniško ime: <input type="text" name="username"/></p>
      <p>Elektronski naslov: <input type="text" name="mail"/></p>
      <p>Geslo: <input type="password" name="geslo" placeholder="Geslo"/></p>
      <p><input id="prijava" type="submit" value="USTVARI PROFIL"/></p>
    </form>
    <button onClick={handleReturn}>NAZAJ</button>
    </>
    )
}
# NUKS-projekt
Podatkovna baza projekta:  
tabela "uporabnik":  
id: Integer, primary key  
upime: String(20), not null  
geslo: String(30), not null  
enaslov: String(30), not null  
  
tabela "pot":  
id: Integer, primary key  
uporabnik: Integer, not null  
filename: String(37), not null  
  
API klici:  
/user/{uname, pword}: avtentikacija uporabnika v sistem  
/map/list{id}: izpis vseh poti uporabnika, določenega z id  
/map/{id}: pridobi datoteko poti  
/user/add dodajanje novega uporabnika v sistem  
/update/user/{id}: posodabljanje uporabnika  
/user/delete/{id}: izbris uporabnika  
/map/delete/{id}: izbris datoteke poti  
  
Projekt je pripravljen tako, da z datoteko NUKS-projekt/docker/docker-compose.yml ustvarimo docker kontejnerje. Na IP naslovu strežnika je nato potrebno najprej ustvariti nov uporabniški profil. V projektu je mišljeno, da bi uporabnik nato ustvaril pare točk z zemplepisno dolžino in širino, ki se jih s pritiskom na gumb nato shrani v datoteko na strežniku. Če je uporabnik že shranil kakšno datoteko, jo lahko s klikom na ime datoteke odpre, pri čemer se vsebina prikaže na istem mestu, kot bi uporabnik vpisoval točke za novo datoteko. Poleg tega lahko uporabnik tudi ureja svoj profil.  

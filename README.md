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
  
NA UPORABNIKOVI APLIKACIJI TRENUTNO UGOTAVLJAM, ZAKAJ SE NOČE POVEZATI NA API STREŽNIK. ČE NE BO ŠLO DRUGAČE, BOM FRONTEND PRESTAVIL NA SPLETNI STREŽNIK.

# NUKS-projekt
Podatkovna baza projekta:
tabela "uporabnik":
id: Integer, primary key
upime: String(20), not null
geslo: String(30), not null
enaslov: String(30), not null

API klici:
/user/{uname, pword}: avtentikacija uporabnika v sistem
map/list{id}: izpis vseh poti uporabnika, določenega z id (še ni narejeno)
map/{id}: pridobi datoteko poti (še ni narejeno)
/user/add dodajanje novega uporabnika v sistem
/update/user/{id}: posodabljanje uporabnika
/user/delete/{id}: izbris uporabnika
/map/delete/{id}: izbris datoteke poti (še ni narejeno)

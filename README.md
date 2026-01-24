# 📊Quotiva, egy modern árajánlat készítő platform.
> Modern árajánlat készítő platform vállalkozók számára.

## 🛠️Technológiai Stack
| Stack | Technológia |
| :--- | :---  |
| **Backend:** | Laravel PHP (11.x), SQLite |
| *Frontend:** | React (Typescript), TailwindCSS |
| **DevOps:** | Docker, Docker Compose, GitHub Actions, Fly.io |

## 🤔 Főbb funkciók: 
- Felhasználó kezelés
- Dinamikus árajánlat generálás
- Alprofilkezelő modul
- Bevétellel és az ajánlatokkal kapcsolatos monitoring modul
- PDF exportálás
- Reszponzív felület

## Architektúra és CI/CD:
### Docker alapú fejlesztés:
A projekt teljes mértékben konténerizált, így a fejlesztői környezet egyetlen paranccsal felállítható. Ez biztosítja, hogy a kódbázis minden gépen ugyanúgy fusson.

### Automatizált Pipeline (CI/CD):
A GitHub Actions munkafolyamat segítségével minden `main` ágra történő pull request és push során:
1. **Continous Integration (CI):**
   * **Frontend:** Automatikus függőségkezelés és **Typescript Type Check**.
   * **Backend:** Composer optimalizálás és **Automated Testing**.
   * **Adatbázis:** Migrációk ellenőrzése izolált környezetben.
2. **Continuous Deployment:**
   * Sikeres CI folyamat után a rendszer automatikusan deploy-ol a **Fly.io** platformra.
   * A frontend és backend különálló konténerként, de összehangolva frissül.
   * A titkosított kulcsok (Secrets) kezelése biztonságosan, a GitHub Actions környezetében történik.

## 4. 📥Telepítési útmutató:
 - Válasszuk ki azt a mappát vagy helyet ahová telepíteni szeretnénk a projektet, majd adjuk ki a git clone https://github.com/NemethTamas1/QuotivaProject.git parancsot.
 - Következőnek töltsük ki a környezeti (.env) változókat a .env.example alapján backenden és frontenden egyaránt.
 - Indítás:
   
   A fejlesztői környezet indításához használjuk a projekt gyökerében található ***docker-compose-dev.yaml*** fájlt. Először build-eljük a projektet:
   > docker compose -f docker-compose-dev.yaml build --no-cache
   
   Majd futtassuk is azt (paraméternek megadható -d flag, így detached módban fog elindulni):
   > docker compose -f docker-compose-dev.yaml up -d

   Ezt követően érdemes feltölteni a rendszert teszt adatokkal. Ehhez tegyük a következőt:
   - A projekt gyökeréből kiadva a ***docker ps*** parancsot láthatjuk a futó backend és frontend konténereket. Nekünk a backend konténerbe kell belépnünk. Ehhez figyeljük meg a backend konténer **nevét**, majd adjuk ki a következő parancsot:
     > docker compose exec -it quotiva-dev-backend-1 bash

     A backend konténerbe belépve pedig már csak a seed-elés maradt:
     > php artisan migrate:fresh --seed

     Ezzel lefutnak a migrációk, adatbázis táblák, kapcsolatok létrejönnek, és a DatabaseSeeder.php fájl is lefut, így egy teszt adatokkal ellátott adatbázist kapva.
   
   Leállításhoz adjuk ki a következő parancsot (ahhoz, hogy minden adatot, például seed-elt adatokat is töröljünk a leállítást követően, adjuk ki a -v, azaz verbose flag-et):
   > docker compose -f docker-compose-dev.yaml down -v

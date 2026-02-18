# 🧪 Tesztelési jegyzőkönyv: OffersTest.php

**Teszt fájl:** `Tests\Feature\OffersTest.php`
**Státusz:** ✅ PASS / ❌ FAILED

---

## 📝 Összefoglaló
Az ajánlatok, és azzal kapcsolatos biztonsági illetve funkcionális tesztjeinek dokumentálása.

---

## 🔍 Teszt Esetek

### 1. test_admin_can_get_all_offers_that_there_is
**Dátum:** 2026-02-02
**Cél:** Tesztelni, hogy az admin ranggal rendelkező felhasználó le tudja kérni az összes létező ajánlatot.
* **Bemenet (Arrange):**
    * 2 különböző felhasználó, egy-egy alprofillal.
    * Első felhasználóhoz tartozik ***2*** ajánlat.
    * Második felhasználóhoz tartozik ***1*** ajánlat.
* **Művelet (Act):** `GET /api/offers` hívás az admin nevében.
* **Elvárt eredmény (Assert):**
    * A JSON válaszban a `data` kulcs pontosan 3 elemet tartalmaz.
    * HTTP 200 Status.
* **Eredmény:** ✅ Sikeres

---

### 2. test_user_can_not_get_all_the_offers_there_is
**Dátum:** 2026-02-02
**Cél:** Tesztelni, hogy egy adott felhasználó ne tudja lekérni a mások által elkészített ajánlatokat, csak és kizárólag a sajátjait.
* **Bemenet (Arrange):**
    * 2 különböző felhasználó, egy-egy alprofillal.
    * Első felhasználóhoz tartozik ***2*** ajánlat.
    * Második felhasználóhoz tartozik ***1*** ajánlat.
* **Művelet (Act):** `GET /api/offers` hívás az első felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * A JSON válaszban a `data` kulcs pontosan 2 elemet tartalmazzon.
    * HTTP 200 Status.
* **Eredmény:** ✅ Sikeres

### 3. test_user_can__get_all_the_offers_they_created
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a felhasználó le tudja kérni a saját maga által létrehozott ajánlatokat, az összes saját profilból.
* **Bemenet (Arrange):**
    * Egy felhasználó, két alprofillal.
    * Az első profilhoz tartozik ***2*** ajánlat.
    * A második profilhoz tartozik ***1*** ajánlat.
* **Művelet (Act):** `GET /api/offers` hívás az első felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * A JSON válaszban a `data` kulcs pontosan 3 elemet tartalmazzon.
    * HTTP 200 Status.
* **Eredmény:** ✅ Sikeres

### 4. test_can_create_offer_with_correct_fields
**Dátum:** 2026-02-02
**Cél:** Tesztelni, hogy a felhasználó sikeresen létre tud hozni egy ajánlatot a korrekten kitöltött mezőkkel.
* **Bemenet (Arrange):**
    * Felhasználó és az ahhoz való alprofil létrehozása.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201 Status.
* **Eredmény:** ✅ Sikeres

### 5. test_created_offer_is_in_database
**Dátum:** 2026-02-02
**Cél:** Tesztelni, hogy a létrehozott ajánlat valóban benne van-e az adatbázisban..
* **Bemenet (Arrange):**
    * Felhasználó és az ahhoz való alprofil létrehozása.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201 Status.
    * Adatbázis tartalmazza az imént létrehozott ajánlatot.
* **Eredmény:** ✅ Sikeres

### 6. test_can_not_create_offer_with_invalid_offer_name_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen ajánlat név mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `offer_name` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 7. test_can_not_create_offer_with_invalid_status_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen státusz mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `status` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 8. test_can_not_create_offer_with_invalid_dated_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres mai dátum mezővel végbe menjen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `dated` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201 Status.
* **Eredmény:** ✅ Sikeres

### 9. test_can_not_create_offer_with_invalid_valid_until_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres "érvényes x-ig" mezővel végbe menjen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `valid_until` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201 Status.
* **Eredmény:** ✅ Sikeres



### 10. test_can_not_create_offer_with_invalid_currency_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen pénznem mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `currency` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 11. test_can_not_create_offer_with_invalid_tax_percent_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen ÁFA-kulcs mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `tax_percent` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 12. test_can_not_create_offer_with_pre_defined_net_total_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat előre megadott nettó összeg mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `net_total` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 13. test_can_not_create_offer_with_pre_defined_gross_total_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat előre megadott bruttó összeg mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `gross_total` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 14. test_can_not_create_offer_with_invalid_client_name_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen kliens név mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `client_name` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 15. test_can_not_create_offer_with_invalid_client_email_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen client_email mezővel elbukjon.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hibás `client_email` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content Status.
* **Eredmény:** ✅ Sikeres

### 16. test_can_create_offer_with_empty_client_email_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres client_email mezővel végbe menjen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `client_email` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201
* **Eredmény:** ✅ Sikeres

### 17. test_can_create_offer_with_empty_phone_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres kliens telefonszám mezővel végbe menjen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `client_phone` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201
* **Eredmény:** ✅ Sikeres

### 18. test_can_not_create_offer_with_too_long_client_phone_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú kliens telefonszám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `client_phone` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content.
* **Eredmény:** ✅ Sikeres

### 18. test_can_create_offer_with_empty_tax_number_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres adószám mezővel sikeres legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `tax_number` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 201
* **Eredmény:** ✅ Sikeres

### 19. test_can_not_create_offer_with_too_long_client_tax_number_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú adószám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `tax_number` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 20. test_can_not_create_offer_with_too_long_client_tax_number_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú adószám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `tax_number` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 21. test_can_not_create_offer_with_empty_client_zip_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres kliens irányítószám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `client_zip` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 22. test_can_not_create_offer_with_invalid_client_zip_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat szöveges kliens irányítószám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint szöveges `client_zip` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 23. test_can_not_create_offer_with_too_long_client_zip_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú kliens irányítószám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `client_zip` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

## `client_city` mező

### 23. test_can_not_create_offer_with_empty_client_city_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres kliens város mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `client_city` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 23. test_can_not_create_offer_with_invalid_client_city_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen kliens város mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint érvénytelen `client_city` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 24. test_can_not_create_offer_with_too_long_client_city_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú kliens város mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `client_city` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

## `client_street` mező
### 25. test_can_not_create_offer_with_empty_client_street_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres kliens utca mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `client_street` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 26. test_can_not_create_offer_with_too_long_client_street_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú kliens utca mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `client_street` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

## `client_house_number` mező
### 27. test_can_not_create_offer_with_empty_client_house_number_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat üres kliens házszám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint üres `client_house_number` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 27. test_can_not_create_offer_with_invalid_client_house_number_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat érvénytelen kliens házszám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint érvénytelen `client_house_number` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

### 27. test_can_not_create_offer_with_too_long_client_house_number_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat túl hosszú kliens házszám mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint túl hosszú `client_house_number` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

## `items` mező
### 28. test_can_not_create_offer_with_missing_items_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat hiányzó tételek mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hiányzó `items` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres

## `items.name` mező
### 29. test_can_not_create_offer_with_missing_item_name_field
**Dátum:** 2026-02-03
**Cél:** Tesztelni, hogy a létrehozott ajánlat hiányzó tételek név mezővel sikertelen legyen.
* **Bemenet (Arrange):**
    * Adott egy felhasználó, és annak alprofilja.
    * Ajánlat payload összeállítása.
    * Ajánlaton belüli tételek összeállítása, valamint hiányzó `items.name` mező illesztése.
* **Művelet (Act):** `POST /api/offers` hívás a felhasználó nevében.
* **Elvárt eredmény (Assert):** 
    * HTTP 422 Unprocessable Content
* **Eredmény:** ✅ Sikeres
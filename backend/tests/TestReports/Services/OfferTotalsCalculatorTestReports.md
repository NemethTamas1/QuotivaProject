# 🧪 Tesztelési jegyzőkönyv: OffersTest.php

**Teszt fájl:** `Tests\Feature\OffersTest.php`
**Státusz:** ✅ PASS / ❌ FAILED

---

## 📝 Összefoglaló
Az ajánlatok, és azzal kapcsolatos biztonsági illetve funkcionális tesztjeinek dokumentálása.

---

## 🔍 Teszt Esetek

### 1. test_calculates_net_correctly
**Dátum:** 2026-03-23
**Cél:** Tesztelni, az adott tételek segítségével a függvény kiszámolja-e a helyes nettó összeget.
* **Bemenet (Arrange):**
    * "items" tömb, melyben két darab teszt tétel található.
* **Művelet (Act):** `calculateNetTotal` függvény hívás.
* **Elvárt eredmény (Assert):**
    * A nettó végösszeg 5000 legyen.
* **Eredmény:** ✅ Sikeres

---

### 2. test_returns_zero_for_empty_items
**Dátum:** 2026-03-23
**Cél:** Tesztelni, hogy egy üres tömb esetén a nettó érték nulla legyen.
* **Bemenet (Arrange):**
    * Nincs bemenet.
* **Művelet (Act):** `calculateNetTotal` függvény hívás.
* **Elvárt eredmény (Assert):**
    * A nettó végösszeg 0 legyen.
* **Eredmény:** ✅ Sikeres

---

### 3. test_calculates_gross_correctly
**Dátum:** 2026-03-23
**Cél:** Tesztelni, az adott nettó és ÁFA értékekkel a bruttó összeg helyes vagy sem.
* **Bemenet (Arrange):**
    * Nettó érték (10000).
    * ÁFA érték (27).
* **Művelet (Act):** `calculateGrossTotal` függvény hívás.
* **Elvárt eredmény (Assert):**
    * A nettó végösszeg 12700 legyen.
* **Eredmény:** ✅ Sikeres

---




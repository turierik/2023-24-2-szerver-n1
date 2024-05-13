# Táblák

- animals
 - name: string
 - age: int, null
 - mammal: bool
 - chip: string, unique
- humans
 - name: string
 - contact: string
- food
 - name: string

# Kapcsolat

- Human N : 1 Animal
- Animal N : N Food

# REST API

1. GET /mammals
Add vissza az összes emlős adatait név szerint sorba rendezve!

2. GET /mammals-2
Add vissza az emlősök nevét és chipszámát, illetve a gazdi nevét és elérhetőségét!

3. GET /old
Add vissza a 10 évnél idősebb állatok nevét!

4. GET /animals/:id
- 400 ha id nem egész szám
- 404 ha nincs ilyen id-val állat
- 200 + adatok, ha jó minden

5. POST /humans
- 400, ha nincs meg minden adat tipushelyesen
- 201 + adatok, ha jó minden

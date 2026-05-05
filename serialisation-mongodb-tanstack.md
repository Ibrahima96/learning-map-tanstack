# 🔍 Pourquoi faut-il sérialiser les données MongoDB ?

## Le problème fondamental : deux mondes différents

Quand tu utilises **TanStack Start**, ton application tourne sur **deux runtimes** séparés :

```
┌─────────────────────────────┐        ┌─────────────────────────────┐
│        SERVEUR (Node.js)    │        │       CLIENT (Navigateur)   │
│                             │        │                             │
│  MongoDB → Mongoose         │  JSON  │  React → Affichage HTML     │
│  ObjectId, Date, Buffer...  │ ──────▶│  string, number, boolean... │
│                             │        │                             │
└─────────────────────────────┘        └─────────────────────────────┘
          loader()                          useLoaderData()
```

Pour traverser ce tunnel **Serveur → Client**, les données **doivent être converties en JSON pur**. C'est la seule façon de les transmettre via HTTP.

---

## Ce que Mongoose retourne réellement

Même avec `.lean()`, Mongoose ne retourne pas de vrais objets JSON simples.

### `_id` → ObjectId (pas une string)

```ts
// Ce que tu penses recevoir :
student._id  // "6639af2b3f1a2b3c4d5e6f7a"  ← string

// Ce que Mongoose retourne vraiment :
student._id  // ObjectId { _bsontype: 'ObjectId', id: <Buffer ...> }  ← objet BSON
```

> [!WARNING]
> `ObjectId` est une **classe JavaScript** propre à MongoDB/BSON.  
> JSON.stringify ne sait pas quoi en faire → il l'ignore ou lève une erreur.

### `createdAt` / `updatedAt` → Date (objet JavaScript)

```ts
student.createdAt  // Date { 2024-05-03T21:00:00.000Z }  ← instance de Date

// JSON.stringify({ date: new Date() }) → '{"date":"2024-05-03T21:00:00.000Z"}'
// Ça marche en JSON brut, mais TanStack Start vérifie le type AVANT sérialisation.
```

---

## Ce que TanStack Start fait avec le loader

```ts
export const Route = createFileRoute('/about')({
  loader: async () => {
    return await getstudentServerFn()  // ← exécuté côté SERVEUR
  },
})

function About() {
  const data = Route.useLoaderData()  // ← consommé côté CLIENT
}
```

TanStack Start exécute le `loader` sur le serveur, puis **sérialise le résultat** pour l'envoyer au navigateur. Si le résultat contient un `ObjectId` ou un `Buffer`, il affiche :

```
[Client] Warning: The value [object Object] of type "object" cannot be parsed/serialized.
```

Et les données n'arrivent **jamais** sur le client → `useLoaderData()` retourne `undefined`.

---

## La solution : tout convertir en primitives

Une **primitive** est une valeur que JSON comprend nativement :

| Type primitif | Exemple |
|---|---|
| `string` | `"abc"` |
| `number` | `42` |
| `boolean` | `true` |
| `null` | `null` |
| Tableau de primitives | `[1, 2, 3]` |
| Objet de primitives | `{ name: "Ali" }` |

```ts
// ❌ AVANT (non sérialisable)
const students = await Student.find().lean()
return { student: students }
//               ↑ contient des ObjectId et des Date → ERREUR

// ✅ APRÈS (sérialisé manuellement)
const students = await Student.find().lean()
const serialized = students.map((s) => ({
  _id: s._id.toString(),        // ObjectId  → string
  name: s.name,                 // string    → string ✓
  age: s.age,                   // number    → number ✓
  classe: s.classe,             // string    → string ✓
  createdAt: s.createdAt        // Date      → string ISO
    ? new Date(s.createdAt).toISOString()
    : null,
  updatedAt: s.updatedAt
    ? new Date(s.updatedAt).toISOString()
    : null,
}))
return { student: serialized }  // ✅ 100% JSON-safe
```

---

## Règle à retenir

> [!IMPORTANT]
> **Tout ce qui sort d'une Server Function TanStack Start doit être sérialisable en JSON.**  
> Cela exclut : `ObjectId`, `Buffer`, `Date` (parfois), `Map`, `Set`, les classes custom, les fonctions, les références circulaires.

En résumé : **le serveur parle BSON, le client parle JSON** — tu es l'interprète entre les deux. 🌉



```tsx
const toStudentDTO = (s: any) => ({
  id: s._id.toString(),
  name: s.name,
  age: s.age,
  classe: s.classe,
  createdAt: s.createdAt?.toISOString(),
});

// Dans votre handler :
return { students: students.map(toStudentDTO) };
`

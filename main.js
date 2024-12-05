// 1. Création de la base de données et de la collection
use bibliothequeDB
db.createCollection("livres")

// 2. Ajout de documents
db.livres.insertMany([
    {
        titre: "Dune",
        auteur: "Frank Herbert",
        genre: "Science-Fiction",
        date_publication: new Date("1965-08-01"),
        emprunte: false,
        notes: [5, 4, 5],
        emprunte_par: null
    },
    {
        titre: "1984",
        auteur: "George Orwell",
        genre: "Science-Fiction",
        date_publication: new Date("1949-06-08"),
        emprunte: true,
        notes: [5, 5, 4],
        emprunte_par: "user_123"
    },
    {
        titre: "Le Seigneur des Anneaux",
        auteur: "J.R.R. Tolkien",
        genre: "Fantasy",
        date_publication: new Date("1954-07-29"),
        emprunte: false,
        notes: [5, 5, 5],
        emprunte_par: null
    },
    {
        titre: "Harry Potter à l'école des sorciers",
        auteur: "J.K. Rowling",
        genre: "Fantasy",
        date_publication: new Date("1997-06-26"),
        emprunte: true,
        notes: [4, 5, 5],
        emprunte_par: "user_124"
    },
    {
        titre: "Fahrenheit 451",
        auteur: "Ray Bradbury",
        genre: "Science-Fiction",
        date_publication: new Date("1953-10-19"),
        emprunte: false,
        notes: [4, 4, 5],
        emprunte_par: null
    },
    {
        titre: "La Ferme des animaux",
        auteur: "George Orwell",
        genre: "Satire",
        date_publication: new Date("1945-08-17"),
        emprunte: false,
        notes: [3, 4, 4],
        emprunte_par: null
    },
    {
        titre: "Les Misérables",
        auteur: "Victor Hugo",
        genre: "Roman",
        date_publication: new Date("1862-04-03"),
        emprunte: false,
        notes: [5, 4, 5],
        emprunte_par: null
    },
    {
        titre: "L'Étranger",
        auteur: "Albert Camus",
        genre: "Philosophie",
        date_publication: new Date("1942-05-19"),
        emprunte: false,
        notes: [5, 3, 4],
        emprunte_par: null
    },
    {
        titre: "Le Petit Prince",
        auteur: "Antoine de Saint-Exupéry",
        genre: "Fable",
        date_publication: new Date("1943-04-06"),
        emprunte: true,
        notes: [5, 5, 5],
        emprunte_par: "user_125"
    },
    {
        titre: "Cosmos",
        auteur: "Carl Sagan",
        genre: "Science",
        date_publication: new Date("1980-09-01"),
        emprunte: false,
        notes: [5, 4, 5],
        emprunte_par: null
    }
])

// 3. Filtrage avec sous-documents
db.livres.find({ genre: "Science-Fiction", notes: { $elemMatch: { $gt: 4 } } })

// 4. Requête avec projection
db.livres.find({ emprunte: true }, { _id: 0, titre: 1, auteur: 1 })

// 5. Requête avec agrégation pour la note moyenne
db.livres.aggregate([
    { $unwind: "$notes" },
    { $group: { _id: "$titre", note_moyenne: { $avg: "$notes" } } }
])

// 6. Filtre avec dates
db.livres.find({ date_publication: { $gt: new Date("2000-01-01") } })

// 7. Tri et limitation
db.livres.aggregate([
    { $unwind: "$notes" },
    { $group: { _id: "$titre", note_moyenne: { $avg: "$notes" } } },
    { $sort: { note_moyenne: -1 } },
    { $limit: 5 }
])

// 8. Mise à jour multiple
db.livres.updateMany(
    { emprunte: true },
    { $set: { emprunte: true, emprunte_par: "user_999" } }
)

// 9. Opération de regroupement
db.livres.aggregate([
    { $group: { _id: "$genre", count: { $sum: 1 } } }
])

// 10. Suppression de documents
db.livres.deleteMany({ notes: { $size: 0 } })

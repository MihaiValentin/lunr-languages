module.exports = {
  fields: [
    {
      name: "title",
      config: { boost: 10 },
    },
    {
      name: "body",
    },
  ],
  documents: [
    {
      title: "Cietrzew",
      body: "Czego trzeba strzelcowi kowalowi do zestrzelenia cietrzewia drzemiącego w dżdżysty dzień na drzewie",
      id: 1,
    },
    {
      title: "Kowalowa",
      body: "Kowalowa Karolowa kazała kowalowi Karolowi karego konia kupić. Kowal Karol karego konia kuje, kowalowa Karolowa kowalem Karolem kieruje.",
      id: 2,
    },
  ],
  tests: [
    {
      what: "find the word %w",
      search: "kowalowi",
      found: 2,
    },
    {
      what: "find the word %w",
      search: "Karolowa",
      found: 1,
    },
    {
      what: "never find a word that does not exist, like %w",
      search: "szczebrzeszyn",
      found: 0,
    },
  ],
};

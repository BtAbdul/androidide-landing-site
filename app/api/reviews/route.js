const reviews = [
  {
    id: 0,
    quotes:
      "As the dev, i dont know what other people think, but i love the project. I have given so much of my time to it.",
    photo: "https://avatars.githubusercontent.com/u/46931079?v=4",
    name: "Itsaky",
    professions: ["Main Developer"],
  },
  {
    id: 1,
    quotes:
      "AndroidIDE have been my favorit tools for developing android apps. I could code whenever and wherever i want.",
    photo: "https://avatars.githubusercontent.com/u/68449470?v=4",
    name: "BanDroid",
    professions: ["Contributor", "Translator", "Front End Engineer"],
  },
  {
    id: 2,
    quotes:
      "As the dev, i dont know what other people think, but i love the project. I have given so much of my time to it.",
    photo: "https://avatars.githubusercontent.com/u/46931079?v=4",
    name: "Itsaky",
    professions: ["Main Developer"],
  },
  {
    id: 3,
    quotes:
      "As the dev, i dont know what other people think, but i love the project. I have given so much of my time to it.",
    photo: "https://avatars.githubusercontent.com/u/46931079?v=4",
    name: "Itsaky",
    professions: ["Main Developer", "Professional Android Developer"],
  },
];

export async function GET(request) {
  return new Response(JSON.stringify(reviews));
}

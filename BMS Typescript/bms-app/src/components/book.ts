export class book {
  cover: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  description: string;

  constructor(
    cover: string,
    title: string,
    author: string,
    price: number,
    rating: number,
    description: string
  ) {
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.price = price;
    this.rating = rating;
    this.description = description;
  }
}

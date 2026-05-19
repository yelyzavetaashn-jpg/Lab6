class LargeDataStream {
  constructor(limit) {
    this.limit = limit;
  }

  async *generate() {
    for (let i = 1; i <= this.limit; i++) {
      yield {
        id: i,
        value: Math.floor(Math.random() * 1000)
      };
    }
  }
}
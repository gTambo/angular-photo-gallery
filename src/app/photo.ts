export class Photo {
    constructor(
        public id: number,
        public url: string,
        public file?: File | string,
        public description?: string
    ) {}
}
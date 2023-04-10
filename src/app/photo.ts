export class Photo {
    constructor(
        public id: number,
        public url: string,
        public filepath?: string,
        public description?: string
    ) {}
}
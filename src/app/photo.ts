export class Photo {
    constructor(
        public id: number | string,
        public url: string,
        public filepath?: string,
        public description?: string
    ) {}
}
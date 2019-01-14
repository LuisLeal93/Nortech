
// like the Database
export class Credito {

    constructor(
        public username: string,
        public plazo?: number,
        public monto?: number,
        public id?: string,
        public estado?: string,
        public pInteres?: number,
        public interes?: number,
        public total?: number
    ) {}

}

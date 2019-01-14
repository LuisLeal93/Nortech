
// like the Database
export class Usuario {

    // El orden importa, pues en este orden van a tener que ser inicializadas.
    // constructor permite inicializar, agregar metodos y hederar propiedades.
    // una vez definida una opcion como opcional, todas las consecuentes deben serlo
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public edad: string,
        public img?: string
    ) {}

}

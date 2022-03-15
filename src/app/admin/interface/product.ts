export interface Productos {
    _id:        string;
    nombre:     string;
    descripcion:string;
    usuario:    Categoria;
    precio:     number;
    categoria:  Categoria;
    disponible: boolean;
    talle?:     string;
    img:        string;
    cantidad?:  number;
}

export interface Categoria {
    _id:    string;
    nombre: string;
}

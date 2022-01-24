export interface Productos {
    _id:        string;
    nombre:     string;
    usuario:    Categoria;
    precio:     number;
    categoria:  Categoria;
    disponible: boolean;
    img:        string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
}

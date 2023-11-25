export class CreateRestoranDto {
    readonly ad: string;
    readonly aciklama: string;
    readonly logo: string;
    readonly adres: {
        il: string;
        ilce: string;
        acikAdres: string;
    };
    readonly lokasyon: {
        lat: number;
        lon: number;
    };
    // Diğer alanlar...
}

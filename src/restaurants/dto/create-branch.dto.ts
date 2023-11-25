export class CreateBranchDto {
    readonly ad: string;
    readonly adres: {
        il: string;
        ilce: string;
        acikAdres: string;
    };
    readonly lokasyon: {
        lat: number;
        lon: number;
    };
}
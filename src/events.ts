export enum EventType {
    info = 'info',
    critical = 'critical'
}

export enum SizeType {
    s = 's',
    m = 'm',
    l = 'l'
}

export type HomeEventData = ChartData | EnviromentData | MusicData | DialogData | CameraData;

export interface HomeEvent {
    type: EventType;
    title: string;
    source: string;
    time: string;
    description: string | null,
    icon: string;
    size: SizeType;
    data?: HomeEventData;
    timeMinutes?: number;
}

export interface ChartData {
    type: string;
    values: Array<Record<string, [string, number][]>>;
}

export interface EnviromentData {
    temperature: number;
    humidity: number;
}

export interface MusicData {
    albumcover: string;
    artist: string;
    track: {
        name: string,
        length: string
    },
    volume: number;
}

export interface DialogData {
    buttons: [string, string];
}

export interface CameraData {
    image: string;
}

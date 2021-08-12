export class Timer {
    private readonly timeOut: number;
    private readonly repeat: boolean;
    private readonly callback: (args:any[]) => void;
    private id: NodeJS.Timer | null = null;

    constructor(timeOut: number, repeat: boolean, callback: (...args:any[]) => void) {
        this.timeOut = timeOut;
        this.repeat = repeat;
        this.callback = callback;
    }

    public Start(...args:any[]) : void {
        if (this.repeat) {
            this.id = setInterval(this.callback, this.timeOut, args);
        } else {
            this.id = setTimeout(this.callback, this.timeOut, args);
        }
    }

    public Stop() : void {
        if (!this.id) return;

        if (this.repeat) {
            clearInterval(this.id);
        } else {
            clearTimeout(this.id);
        }
        this.id = null;
    }

    public get IsRunning() : boolean {
        return this.id !== null;
    }
}

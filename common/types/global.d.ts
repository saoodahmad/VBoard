export declare global {
  interface CtxOptions {
    lineWidth: number;
    lineColor: string;
  }

  interface Server2ClientEvents {
    client_draw: (newMoves: [number, number][], options: CtxOptions) => void;
  }

  interface Client2ServerEvents {
    server_draw: (moves: [number, number][], options: CtxOptions) => void;
  }
}

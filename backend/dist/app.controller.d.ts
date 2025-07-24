export declare class AppController {
    private openai;
    handlePergunta(pergunta: string): Promise<{
        resposta: string;
    }>;
}

import { Controller, Post, Body } from '@nestjs/common';
import OpenAI from 'openai';

@Controller('chat')
export class AppController {
  private openai = new OpenAI({
    apiKey: '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',
  });

  @Post()
  async handlePergunta(@Body('pergunta') pergunta: string): Promise<{ resposta: string }> {
    const prompt = `Responde apenas com "SIM" ou "NÃO". Se a pergunta não puder ser respondida com "SIM" ou "NÃO", diz: 
    "Por favor, reformule a pergunta para que possa ser respondida com SIM ou NÃO."
    Pergunta: "${pergunta}"
    Resposta:`;

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });

    const resposta = completion.choices[0].message?.content?.trim() || 'Erro ao gerar resposta.';

    return { resposta };
  }
}
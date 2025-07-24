"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
let AppController = class AppController {
    openai = new openai_1.default({
        apiKey: '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',
    });
    async handlePergunta(pergunta) {
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('pergunta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "handlePergunta", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('chat')
], AppController);
//# sourceMappingURL=app.controller.js.map
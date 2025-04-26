import { Body, Controller, Post } from '@nestjs/common';
import { HttpCustomService } from './provider/http/http.custom.service';

@Controller()
export class AppController {
  constructor(private readonly httpCustomService: HttpCustomService) {}

  @Post()
  getHello(@Body() body): Promise<any> {
   return this.httpCustomService.sendMessageTemplate(body.to);
  }

  @Post("/text")
  sendText(@Body()body){
    return this.httpCustomService.sendMessageText(body.to,body.message)
  }
  @Post("/emojin")
  sendEmoji(@Body()body){
    return this.httpCustomService.sendMessageEmojin(body.to,body.emojin)
  }

  
}
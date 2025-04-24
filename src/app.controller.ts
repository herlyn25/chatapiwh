import { Body, Controller, Post } from '@nestjs/common';
import { HttpCustomService } from './provider/http/http.custom.service';

@Controller()
export class AppController {
  constructor(private readonly httpCustomService: HttpCustomService) {}

  @Post()
  getHello(@Body() body): Promise<any> {
   return this.httpCustomService.sendMessageWHAPI(body.to);
  }

  
}
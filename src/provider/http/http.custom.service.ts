import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {
    private readonly WEBHOOK_VERIFY_TOKEN:string;
    private readonly GRAPH_API_TOKEN:string;
    constructor (configService: ConfigService, private readonly httpService:HttpService){
        this.WEBHOOK_VERIFY_TOKEN = configService.get<string>('WEBHOOK_VERIFY_TOKEN')!;
        this.GRAPH_API_TOKEN = configService.get<string>('GRAPH_API_TOKEN')!;     
      }  
      
      async sendMessageWHAPI(){
        const url = 'https://graph.facebook.com/v22.0/591224754081915/messages'
        const config:AxiosRequestConfig = {
          headers: {
            Authorization : `Bearer ${this.GRAPH_API_TOKEN}`,
            'Content-Type': 'application/json',
          }
          
        }
        const body = { 
          messaging_product : "whatsapp",
          to: "573015098556", 
          type: "template",
          template: { 
              name: "hello_world",
              language: {
                code:"en_US"
                }
              } 
          }
    
          try{
            const response = await firstValueFrom(
              this.httpService.post(url, body, config),);
              return response.data;
         
          }catch(error){
            console.error('Error al enviar mensaje WhatsApp:', error?.response?.data) 
            return error.response.data
          }        
        }  
}
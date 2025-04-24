import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpCustomService {
    private readonly WEBHOOK_VERIFY_TOKEN:string;
    private readonly GRAPH_API_TOKEN:string;
    private readonly phone_number_id:string;
    private readonly version:string;
    private readonly url: string;

    constructor (configService: ConfigService, private readonly httpService:HttpService){
        this.WEBHOOK_VERIFY_TOKEN = configService.get<string>('WEBHOOK_VERIFY_TOKEN')!;
        this.GRAPH_API_TOKEN = configService.get<string>('GRAPH_API_TOKEN')!; 
        this.phone_number_id = configService.get<string>('phone_number_id')!;  
        this.version = configService.get<string>('version')!;    
        this.url = configService.get<string>('url')!;
      }  
      
      async sendMessageWHAPI(to: string){
        const url_path = `${this.url}/${this.version}/${this.phone_number_id}/messages`
        const config:AxiosRequestConfig = {
          headers: {
            Authorization : `Bearer ${this.GRAPH_API_TOKEN}`,
            'Content-Type': 'application/json',
          }
          
        }
        const body = { 
          messaging_product : "whatsapp",
          to:to, 
          type:"template",
          template: { 
              name: "hello_world",
              language: {
                code:"en_US"
                }
              } 
          }
    
          try{
            const response = await firstValueFrom(
              this.httpService.post(url_path, body, config),);
              return response.data;
         
          }catch(error){
            console.error('Error al enviar mensaje WhatsApp:', error?.response?.data) 
            return error.response.data
          }        
      }  
      async responseMessageWHAPI(){

      }
}
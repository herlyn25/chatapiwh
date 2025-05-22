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
      
      async sendMessageTemplate(to: string){
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
              name: "prueba",
              language: {
                code:"es_CO"
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

      async sendMessageText(to:string, message:string){
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
          type:"text",
          text: { 
              preview_url: false,
              body: message                
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
      async sendImage(to:string, imageUrl:string, message:string []){
        const url_path = `${this.url}/${this.version}/${this.phone_number_id}/messages`
        const config:AxiosRequestConfig = {
          headers: {
            Authorization : `Bearer ${this.GRAPH_API_TOKEN}`,
            'Content-Type': 'application/json',
          }          
        }
        const body = {
          messaging_product: 'whatsapp',
          to: to,
          type: 'template',
          template: {
            name: 'citas_2',
            language: {
              code: 'es_ES',
            },
            components: [
              {
                type: 'header',
                parameters: [
                  {
                    type: 'image',
                    image: {
                      link: imageUrl,
                    },
                  },
                ],
              },
              {
                type: 'body',
                parameters: message.map((text) => ({
                  type: 'text',
                  text,
                })),
              },
            ],
          },
        };    
          try{
            const response = await firstValueFrom(
              this.httpService.post(url_path, body, config),);
              return response.data;
         
          }catch(error){
            console.error('Error al enviar mensaje WhatsApp:', error?.response?.data) 
            return error.response.data
          }      
      }

      async sendMessageEmojin(to:string,emojin:string){
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
          type:"reaction",
          reaction: { 
              message_id: "wamid.HBgMNTczMDI4MDk5ODgyFQIAERgSMUJDMzYzOTVFNjkyQUEzMDQyAA==",
              emoji: emojin                
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

      async createTemplate(): Promise<any>{
        const url_path = `${this.url}/${this.version}/1083960513748341/message_templates`
        const config:AxiosRequestConfig = {
          headers: {
            Authorization : `Bearer ${this.GRAPH_API_TOKEN}`,
            'Content-Type': 'application/json',
          }          
        }
        const template_data = {
          name: "bienvenida_con_imagen",
          category: "UTILITY",
          language: "es_ES",
          components: [
            {
              type: "HEADER",
              format: "IMAGE",
              example: {
                header_handle: ["https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png"]
              }
            },
            {
              type: "BODY",
              text: "Hello me alegro que estes muy bien este es el mejor adhesivo por un valor de 1000",
              example: {
                body_text: [["John Doe", "100000"]]
              }
            }
          ],          
        };

        try{
          const response = await firstValueFrom(
            this.httpService.post(url_path, template_data, config),);
            return response.data;
        
        }catch(error){
          console.error('Error al guardar template', error?.response?.data) 
          return error.response.data
        }  
      }    
}
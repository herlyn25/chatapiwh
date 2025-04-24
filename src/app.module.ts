import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';
import { HttpCustomService } from './provider/http/http.custom.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),ProviderModule],
  controllers: [AppController],
  providers: [AppService, HttpCustomService],
})
export class AppModule {}

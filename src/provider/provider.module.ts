import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './http/http.custom.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpCustomService],
  exports: [HttpModule, HttpCustomService]
})
export class ProviderModule {}

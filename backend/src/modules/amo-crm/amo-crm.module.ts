import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AmoCrmController } from "./amo-crm.controller";
import { AmoCrmApiService } from "./providers/api.service";
import { AmoCrmConfigService } from "./providers/config.service";
import { AmoCrmOauthService } from "./providers/oauth.service";

@Module({
    imports: [HttpModule],
    controllers: [AmoCrmController],
    providers: [
        AmoCrmApiService,
        AmoCrmOauthService,
        AmoCrmConfigService
    ]
})
export class AmoCrmModule{}
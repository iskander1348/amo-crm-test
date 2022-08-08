import { Injectable } from "@nestjs/common"
import { openJSON, writeJSON } from "src/helpers/JSON.file.helper"
import { AmoCrmRefreshToken } from "src/modules/amo-crm/types/brands"
import { AmoCrmConfig } from "src/modules/amo-crm/types/crm-comfig.dto"


@Injectable()
export class AmoCrmConfigService{

    readonly config: AmoCrmConfig = {
        clienId: undefined,
        clientSecret: undefined,
        code: undefined,
        redirectUri: undefined,
        domain: undefined,
        refreshToken: undefined
    }
    // readonly clienId: AmoCrmClienId
    // readonly clientSecret: AmoCrmClientSecret
    // readonly code: AmoCrmCode | undefined
    // readonly redirectUri: AmoCrmRedirectUri
    // readonly domain: AmoCrmDomain
    // readonly refreshToken: AmoCrmRefreshToken | undefined

    constructor(){
        try{
            const settings = openJSON("crmSettings.json")
            this.config = settings as AmoCrmConfig
        }
        catch(error){
            console.log(error)
            const emptySettings: Record<string, string> = {}
            for (const key of Object.keys(this.config))
                emptySettings[key] = ""
            // console.log(emptySettings, this.config)
            if (error.code === "ENOENT") {
                writeJSON("crmSettings.json", emptySettings)
            }
        }
        
        
        if (
            !this.config.clienId || !this.config.clientSecret || !this.config.redirectUri || !this.config.domain || (!this.config.code && !this.config.refreshToken)
        ) throw new Error("Wrong config")
    }

    updateRefreshToken(refreshToken: AmoCrmRefreshToken){
        this.config.refreshToken = refreshToken;
        writeJSON("crmSettings.json", this.config)
    }

    
    
}
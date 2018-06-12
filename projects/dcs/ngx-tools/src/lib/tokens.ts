import { InjectionToken } from '@angular/core';
import { IEnvironment } from '@dcs/ngx-tools/src/lib/interfaces';

export const APP_ENVIRONMENT: InjectionToken<IEnvironment> = new InjectionToken('APP_ENVIRONMENT');
